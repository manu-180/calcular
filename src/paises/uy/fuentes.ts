import { cubre, esFechaISO, fechaEnZona, sumarDias } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, OpcionesHttp, PuntoSerie } from "@/motor/tipos";
import datos from "./datos.json";

const ZONA = "America/Montevideo";
const ARCHIVOS_BCU = "https://www.bcu.gub.uy/_layouts/15/BCU.Cotizaciones/handler/FileHandler.ashx";
const UI = { codigo: "9800", nombre: "UNIDAD INDEXADA" };
const DOLAR = { codigo: "2225", nombre: "DLS. USA BILLETE" };

function hoy(): FechaISO {
  return fechaEnZona(new Date(), ZONA);
}

function fechaBcu(f: FechaISO): string {
  return `${f.slice(8, 10)}/${f.slice(5, 7)}/${f.slice(0, 4)}`;
}

// El servicio oficial del BCU es SOAP (solo POST) y el Http del cron solo hace GET. Esta es la
// descarga de la página de cotizaciones del BCU: mismo dato, y cruzado contra el SOAP el 7/10/2026.
// Grupo 2 es el que trae la UI y el dólar billete; con Grupo 1 devuelve un registro vacío.
// www.bcu.gub.uy no manda el certificado intermedio: tlsTolerante completa la cadena con los
// intermedios de scripts/datos-paises/certs (la verificación sigue entera).
export function urlCotizacionesBcu(moneda: { codigo: string; nombre: string }, desde: FechaISO, hasta: FechaISO): string {
  const pedido = {
    KeyValuePairs: {
      Monedas: [{ Val: moneda.codigo, Text: moneda.nombre }],
      FechaDesde: fechaBcu(desde),
      FechaHasta: fechaBcu(hasta),
      Grupo: "2",
    },
  };
  return `${ARCHIVOS_BCU}?op=downloadcotizacionesxml&KeyValuePairs=${encodeURIComponent(JSON.stringify(pedido))}`;
}

export function parsearCotizacionesBcu(xml: string, codigo: string): PuntoSerie[] | null {
  if (!xml.includes("<datoscotizaciones")) return null;
  const puntos: PuntoSerie[] = [];
  for (const bloque of xml.matchAll(/<datoscotizaciones\.dato[^>]*>([\s\S]*?)<\/datoscotizaciones\.dato>/g)) {
    const fecha = /<Fecha>(\d{4}-\d{2}-\d{2})<\/Fecha>/.exec(bloque[1])?.[1];
    const moneda = /<Moneda>(\d+)<\/Moneda>/.exec(bloque[1])?.[1];
    const tcv = /<TCV>([\d.]+)<\/TCV>/.exec(bloque[1])?.[1];
    if (!fecha || moneda !== codigo || !tcv || !esFechaISO(fecha)) continue;
    const valor = Number(tcv);
    if (Number.isFinite(valor) && valor > 0) puntos.push({ fecha, valor });
  }
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

async function textoOpcional(http: Http, url: string, opciones?: OpcionesHttp): Promise<string | null> {
  try {
    return await http.texto(url, opciones);
  } catch {
    return null;
  }
}

async function traerCotizacion(http: Http, moneda: { codigo: string; nombre: string }, desde: FechaISO, hasta: FechaISO): Promise<PuntoSerie[] | null> {
  const xml = await textoOpcional(http, urlCotizacionesBcu(moneda, desde, hasta), { tlsTolerante: true });
  if (!xml) return null;
  const puntos = parsearCotizacionesBcu(xml, moneda.codigo);
  return puntos && puntos.length > 0 ? puntos : null;
}

const URL_IMPO = (anio: number, numero: number) => `https://www.impo.com.uy/bases/decretos/${numero}-${anio}`;
const TEMAS_IMPO =
  /SALARIO MINIMO NACIONAL|BASE DE PRESTACIONES Y CONTRIBUCIONES|RENTAS DE LAS PERSONAS FISICAS|IRPF|FONASA|FONDO NACIONAL DE SALUD|VALOR AGREGADO|AGUINALDO|SUELDO ANUAL COMPLEMENTARIO|LICENCIA ANUAL|SALARIO VACACIONAL|HORAS EXTRA|DESPIDO|RECONVERSION LABORAL|APORTES? JUBILATORI|TOPES? DE APORTACION/;

export interface NormaImpo {
  nombre: string;
  fecha: FechaISO;
}

// IMPO devuelve el JSON en latin-1 y con saltos de línea crudos dentro de los textos; si la norma no
// existe, devuelve una página HTML con código 200. Los nombres de norma vienen en mayúsculas sin tildes.
export function parsearNormaImpo(texto: string): NormaImpo | null {
  if (!texto.trimStart().startsWith("{")) return null;
  try {
    const json = JSON.parse(texto.replace(/[\u0000-\u001f]/g, " ")) as { nombreNorma?: unknown; fechaPublicacion?: unknown };
    const m = typeof json.fechaPublicacion === "string" ? /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(json.fechaPublicacion.trim()) : null;
    const fecha = m ? `${m[3]}-${m[2]}-${m[1]}` : null;
    if (typeof json.nombreNorma !== "string" || !esFechaISO(fecha)) return null;
    return { nombre: json.nombreNorma.replace(/\s+/g, " ").trim(), fecha };
  } catch {
    return null;
  }
}

async function normaImpo(http: Http, anio: number, numero: number): Promise<NormaImpo | null> {
  const texto = await textoOpcional(http, `${URL_IMPO(anio, numero)}?json=true`);
  return texto ? parsearNormaImpo(texto) : null;
}

async function ultimoDecreto(http: Http, anio: number): Promise<number> {
  let bajo = 0;
  let alto = 1500;
  while (alto - bajo > 1) {
    const medio = Math.floor((bajo + alto) / 2);
    if (await normaImpo(http, anio, medio)) bajo = medio;
    else alto = medio;
  }
  return bajo;
}

// Revisa los últimos decretos del año (y del anterior en el primer trimestre: el decreto del salario
// mínimo de enero lleva número del año que termina, como el 319/025).
async function buscarDecretos(http: Http, cuantos: number): Promise<HallazgoNorma[] | null> {
  const fechaHoy = hoy();
  const anio = Number(fechaHoy.slice(0, 4));
  const anios = Number(fechaHoy.slice(5, 7)) <= 3 ? [anio - 1, anio] : [anio];
  const hallazgos: HallazgoNorma[] = [];
  let leidos = 0;
  for (const a of anios) {
    const ultimo = await ultimoDecreto(http, a);
    for (let n = ultimo; n > Math.max(0, ultimo - cuantos); n -= 5) {
      const lote = [n, n - 1, n - 2, n - 3, n - 4].filter((x) => x > Math.max(0, ultimo - cuantos));
      const normas = await Promise.all(lote.map((x) => normaImpo(http, a, x)));
      normas.forEach((norma, i) => {
        if (!norma) return;
        leidos++;
        if (TEMAS_IMPO.test(norma.nombre)) hallazgos.push({ titulo: `Decreto ${lote[i]}/${String(a).slice(1)}: ${norma.nombre}`, url: URL_IMPO(a, lote[i]), fecha: norma.fecha });
      });
    }
  }
  return leidos > 0 ? hallazgos : null;
}

const URL_VALORES_BPS = "https://www.bps.gub.uy/bps/valores.jsp?contentid=5478";

function numeroUruguayo(texto: string): number | null {
  const limpio = texto.trim();
  if (!/^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/.test(limpio)) return null;
  return Number(limpio.split(".").join("").replace(",", "."));
}

// Último valor de una fila de la tabla "Valores actuales" del BPS (la columna del mes en curso).
export function valorBps(html: string, etiqueta: RegExp): number | null {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const m = etiqueta.exec(texto);
  if (!m) return null;
  const celdas = /^(?:\s*\|?\s*\$ [\d.,]+)+/.exec(texto.slice(m.index + m[0].length));
  if (!celdas) return null;
  const montos = [...celdas[0].matchAll(/\$ ([\d.,]+)/g)].map((x) => numeroUruguayo(x[1]));
  return montos.pop() ?? null;
}

function valorEnDatos(id: string, fecha: FechaISO): number | null {
  const dato = datos.datos.find((d) => d.id === id);
  const tramo = dato?.tramos.find((t) => cubre(t as { desde: FechaISO; hasta?: FechaISO }, fecha));
  return typeof tramo?.valor === "number" ? tramo.valor : null;
}

const VIGILADOS_BPS = [
  { id: "uy.bpc", nombre: "BPC", etiqueta: /Base de Prestaciones y Contribuciones \(BPC\) \(1\)/ },
  { id: "uy.smn", nombre: "salario mínimo nacional", etiqueta: /Salario m[ií]nimo nacional \(1\)/ },
  { id: "uy.tope-aportes", nombre: "tope C de aportación (Ley 16.713)", etiqueta: /Topes Art\. 7. y 8. \(Ley 16713\) - C \(1\)/ },
];

export const detectores: readonly Detector[] = [
  {
    id: "uy.ui-bcu",
    carril: "serie",
    serie: "uy.ui",
    metodo: "api-xml",
    url: ARCHIVOS_BCU,
    tlsTolerante: true,
    // La UI se publica con un mes de adelanto, así que el último punto guardado está en el futuro y el
    // cron compara contra él: el salto admite unas seis semanas de inflación alta, no solo un día.
    banda: { min: 5.5, max: 9, saltoRelativoMax: 0.02 },
    traer: (http) => {
      const h = hoy();
      return traerCotizacion(http, UI, sumarDias(h, -3), sumarDias(h, 40));
    },
  },
  {
    id: "uy.dolar-bcu",
    carril: "serie",
    serie: "uy.dolar",
    metodo: "api-xml",
    url: ARCHIVOS_BCU,
    tlsTolerante: true,
    banda: { min: 30, max: 60, saltoRelativoMax: 0.05 },
    traer: (http) => {
      const h = hoy();
      return traerCotizacion(http, DOLAR, sumarDias(h, -15), sumarDias(h, -1));
    },
  },
  {
    id: "uy.impo-decretos",
    carril: "norma",
    datos: ["uy.smn", "uy.bpc", "uy.irpf-escala", "uy.fonasa-hasta", "uy.fonasa-mas", "uy.frl", "uy.aporte-jubilatorio", "uy.iva-basica", "uy.iva-minima"],
    metodo: "api-json",
    url: "https://www.impo.com.uy/bases/decretos",
    traer: (http) => buscarDecretos(http, 30),
  },
  {
    id: "uy.bps-valores",
    carril: "norma",
    datos: ["uy.bpc", "uy.smn", "uy.tope-aportes"],
    metodo: "html",
    url: URL_VALORES_BPS,
    async traer(http) {
      const html = await textoOpcional(http, URL_VALORES_BPS);
      if (!html) return null;
      const fecha = hoy();
      const hallazgos: HallazgoNorma[] = [];
      for (const v of VIGILADOS_BPS) {
        const publicado = valorBps(html, v.etiqueta);
        if (publicado === null) return null;
        const cargado = valorEnDatos(v.id, fecha);
        if (cargado !== publicado) hallazgos.push({ titulo: `El BPS publica ${v.nombre} de $ ${publicado} y en datos.json hay ${cargado ?? "nada vigente"}`, url: URL_VALORES_BPS, fecha });
      }
      return hallazgos;
    },
  },
];
