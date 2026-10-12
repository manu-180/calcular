import { esFechaISO, fechaEnZona } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import datos from "./datos.json";
import series from "./series.json";

const ZONA = "America/Guayaquil";
const URL_RO = "https://www.registroficial.gob.ec/feed/";
const URL_SRI_RENTA = "https://www.sri.gob.ec/impuesto-renta";
const URL_IESS_AFILIACION = "https://www.iess.gob.ec/aplicaciones/AfiliacionIESS/";
const URL_INEC_ENERO = (anio: number) => `https://www.ecuadorencifras.gob.ec/documentos/web-inec/Inflacion/${anio}/enero/BOLETIN_TECNICO_IPC_${anio}_01.pdf`;

const TEMAS_RO =
  /salario b[aá]sico|ministerio del trabajo|c[oó]digo del trabajo|impuesto a la renta|impuesto al valor agregado|\bIVA\b|d[eé]cim[oa]|decimotercera|decimocuarta|utilidades|fondos? de reserva|jornada|horas (suplementarias|extraordinarias)|gastos personales|canasta/i;

const ORGANISMOS_RO = /ministerio del trabajo|seguridad social/i;

async function textoOpcional(http: Http, url: string): Promise<string | null> {
  try {
    return await http.texto(url);
  } catch {
    return null;
  }
}

function hoy(): FechaISO {
  return fechaEnZona(new Date(), ZONA);
}

function limpiar(html: string): string {
  return html
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#8230;/g, "...")
    .replace(/&[a-z#0-9]+;/gi, " ");
}

// El feed del Registro Oficial trae 20 ediciones por página (día y medio). El cron corre a diario y
// lee dos páginas para no perder ediciones de un día con muchos suplementos.
export function parsearFeedRo(xml: string): HallazgoNorma[] | null {
  if (!xml.includes("<rss") || !xml.includes("<item>")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const item of xml.split("<item>").slice(1)) {
    const titulo = /<title>([\s\S]*?)<\/title>/.exec(item)?.[1]?.trim();
    const url = /<link>([\s\S]*?)<\/link>/.exec(item)?.[1]?.trim();
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(item)?.[1]?.trim();
    const cuerpo = /<content:encoded>([\s\S]*?)<\/content:encoded>/.exec(item)?.[1] ?? /<description>([\s\S]*?)<\/description>/.exec(item)?.[1] ?? "";
    if (!titulo || !url || !pub || !url.startsWith("https://") || /^Edici[oó]n Jur[ií]dica/i.test(titulo)) continue;
    const instante = new Date(pub);
    if (Number.isNaN(instante.getTime())) continue;
    const fecha = fechaEnZona(instante, ZONA);
    const lineas = limpiar(cuerpo)
      .split("\n")
      .map((l) => l.replace(/\s+/g, " ").trim())
      .filter((l) => l.length > 0);
    // Cada edición agrupa sus normas bajo el nombre del organismo ("MINISTERIO DEL TRABAJO:"): todo
    // lo que publica el Ministerio del Trabajo o el IESS importa aunque el título no nombre el tema.
    const relevantes: string[] = [];
    let seccion = "";
    for (const l of lineas) {
      if (l.endsWith(":")) {
        seccion = l;
        continue;
      }
      if (/\d/.test(l) && (TEMAS_RO.test(l) || ORGANISMOS_RO.test(seccion))) relevantes.push(l);
    }
    if (relevantes.length === 0) continue;
    hallazgos.push({ titulo: `Registro Oficial, ${titulo.replace(/&#8211;/g, "").trim()}: ${relevantes.join(" | ").slice(0, 300)}`, url, fecha });
  }
  return hallazgos;
}

export function enlaceTablaRenta(html: string): string | null {
  for (const m of html.matchAll(/href="(https:\/\/www\.sri\.gob\.ec\/o\/sri-portlet-biblioteca-alfresco-internet\/descargar\/[0-9a-f-]{36}\/[^"]+)"/g)) {
    const url = m[1];
    if (/Tablas%20de%20c%c3%a1lculo%20de%20Impuesto%20a%20la%20Renta\.pdf$/i.test(url)) return url;
  }
  return null;
}

export function sbuDelIess(html: string): { valor: number; anio: number } | null {
  const m = /base m[ií]nima de aportaci[oó]n es \$\s*([\d.]+,\d{2}|[\d,]+\.\d{2}|\d+)[^.]*?vigente en Ecuador para (\d{4})/i.exec(html.replace(/\s+/g, " "));
  if (!m) return null;
  const crudo = m[1];
  const valor = Number(crudo.includes(",") && /,\d{2}$/.test(crudo) ? crudo.split(".").join("").replace(",", ".") : crudo.replace(/,/g, ""));
  const anio = Number(m[2]);
  if (!Number.isFinite(valor) || valor <= 0 || anio < 2000) return null;
  return { valor, anio };
}

function sbuCargado(anio: number): number | null {
  const sbu = datos.datos.find((d) => d.id === "ec.sbu");
  const tramo = sbu?.tramos.find((t) => t.estado === "verificado" && t.desde.startsWith(`${anio}-`));
  return typeof tramo?.valor === "number" ? tramo.valor : null;
}

function anioDeCanastaCargada(): number {
  const canasta = datos.datos.find((d) => d.id === "ec.canasta-basica-enero");
  const anios = (canasta?.tramos ?? []).filter((t) => t.estado === "verificado").map((t) => Number(t.desde.slice(0, 4)));
  return anios.length ? Math.max(...anios) : 0;
}

const DATOS_LABORALES = [
  "ec.sbu",
  "ec.aporte-personal-iess",
  "ec.fondo-reserva",
  "ec.decimo-cuarto-mes-inicio",
  "ec.desahucio",
  "ec.despido-meses-minimo",
  "ec.despido-meses-maximo",
  "ec.vacaciones-dias",
  "ec.jornada-diaria",
  "ec.recargo-suplementarias",
  "ec.recargo-madrugada",
  "ec.recargo-extraordinarias",
  "ec.utilidades",
  "ec.recargo-nocturno",
  "ec.jornada-semanal",
  "ec.periodo-prueba-dias",
  "ec.maternidad-semanas",
  "ec.lactancia-meses",
  "ec.paternidad-dias",
  "ec.recargo-eventual",
  "ec.despido-ineficaz-meses",
  "ec.desahucio-aviso-dias",
  "ec.jubilacion-patronal-anios",
  "ec.cesantia-personal",
  "ec.jubilacion-coeficientes",
];
const DATOS_TRIBUTARIOS = [
  "ec.iva",
  "ec.impuesto-renta",
  "ec.rebaja-gastos-personales",
  "ec.canastas-por-cargas",
  "ec.canastas-catastroficas",
  "ec.canasta-basica-enero",
  "ec.impuesto-herencias",
  "ec.impuesto-vehicular",
  "ec.isd",
  "ec.isd-exento-tarjetas",
  "ec.retencion-renta",
  "ec.impuesto-renta-sociedades",
  "ec.multa-declaracion",
  "ec.plazo-fijo-exento-dias",
];

const URL_SRI_ISD = "https://www.sri.gob.ec/impuesto-a-la-salida-de-divisas-isd";
const URL_SRI_RETENCIONES = "https://www.sri.gob.ec/retenciones-en-la-fuente";
const URL_SRI_VEHICULOS = "https://www.sri.gob.ec/impuestos-vehiculares";

function textoPlano(html: string): string {
  return limpiar(html).replace(/\s+/g, " ");
}

function numeroEc(crudo: string): number {
  return Number(crudo.replace(/\./g, "").replace(",", "."));
}

function valorCargado(id: string, fecha: FechaISO): unknown {
  const dato = datos.datos.find((d) => d.id === id);
  const tramo = dato?.tramos.find((t) => t.estado === "verificado" && t.desde <= fecha && (!("hasta" in t) || !t.hasta || t.hasta >= fecha));
  return tramo?.valor;
}

export function enlacePorNombre(html: string, nombre: RegExp): string | null {
  for (const m of html.matchAll(/href="(https:\/\/www\.sri\.gob\.ec\/o\/sri-portlet-biblioteca-alfresco-internet\/descargar\/[0-9a-f-]{36}\/[^"]+)"/g)) {
    if (nombre.test(m[1])) return m[1];
  }
  return null;
}

export interface IsdLeido {
  tarifa: number;
  exentoTarjetas: number;
}

// La página del ISD lista la tarifa general de cada año y el monto exento con tarjeta para un trienio.
export function parsearIsd(html: string, anio: number): IsdLeido | null {
  const texto = textoPlano(html);
  const bloque = new RegExp(`A[ñn]o ${anio}: Tarifa general: (\\d+(?:[.,]\\d+)?) ?%`).exec(texto);
  const exento = /el valor exento es de USD ([\d.]+,\d{2})/.exec(texto);
  if (!bloque || !exento) return null;
  const tarifa = Number(bloque[1].replace(",", "."));
  const exentoTarjetas = numeroEc(exento[1]);
  if (!Number.isFinite(tarifa) || !Number.isFinite(exentoTarjetas)) return null;
  return { tarifa, exentoTarjetas };
}

// Primeras y últimas filas de la tabla del impuesto vehicular: hasta 4.000 al 0,5 % y desde 24.001 con 620 fijos al 6 %.
export function parsearTablaVehicular(html: string): { primeraTasa: number; ultimaCuota: number; ultimaTasa: number } | null {
  const texto = textoPlano(html);
  const primera = / 0 4\.000 0 (\d+(?:[.,]\d+)?) /.exec(texto);
  const ultima = /24\.001 En a?delante (\d+) (\d+(?:[.,]\d+)?)/.exec(texto);
  if (!primera || !ultima) return null;
  return { primeraTasa: Number(primera[1].replace(",", ".")), ultimaCuota: Number(ultima[1]), ultimaTasa: Number(ultima[2].replace(",", ".")) };
}

const URL_INEC_IPC = "https://www.ecuadorencifras.gob.ec/indice-de-precios-al-consumidor/";
const MESES_INEC: Readonly<Record<string, number>> = { ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6, jul: 7, ago: 8, sep: 9, sept: 9, oct: 10, nov: 11, dic: 12 };

export interface ResumenIpcInec {
  mes: FechaISO;
  mensual: number;
  anual: number;
  acumulada: number;
}

export function parsearResumenInec(html: string): ResumenIpcInec | null {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const m = /Resumen (\p{L}{3,4})\.?-(\d{4})[^]{0,400}?Variaci.n mensual (-?\d+,\d+) Variaci.n anual (-?\d+,\d+) Variaci.n acumulada (-?\d+,\d+)/u.exec(texto);
  const numMes = m ? MESES_INEC[m[1].toLowerCase()] : undefined;
  if (!m || !numMes) return null;
  const mes = `${m[2]}-${String(numMes).padStart(2, "0")}-01`;
  if (!esFechaISO(mes)) return null;
  const n = (x: string) => Number(x.replace(",", "."));
  return { mes, mensual: n(m[3]), anual: n(m[4]), acumulada: n(m[5]) };
}

function mesRelativo(mes: FechaISO, n: number): string {
  const total = Number(mes.slice(0, 4)) * 12 + Number(mes.slice(5, 7)) - 1 + n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01`;
}

// La página del INEC solo publica las variaciones del último mes (con dos decimales), no el índice;
// el índice sale de las planillas, que vienen en ZIP y el Http del cron solo lee texto. Se reconstruye
// con la variación anual sobre el índice de 12 meses antes (error de redondeo que no se acumula) y se
// controla con la mensual y la acumulada. Si no cierran, no se devuelve nada.
async function traerIpc(http: Http): Promise<PuntoSerie[] | null> {
  const html = await textoOpcional(http, URL_INEC_IPC);
  const r = html ? parsearResumenInec(html) : null;
  if (!r) return null;
  const cargados = new Map(series.series.find((x) => x.id === "ec.ipc")?.puntos.map(([f, v]) => [String(f), Number(v)] as const) ?? []);
  const base = cargados.get(mesRelativo(r.mes, -12));
  if (base === undefined) return null;
  const valor = Math.round(base * (1 + r.anual / 100) * 1e8) / 1e8;
  const cierra = (referencia: number | undefined, variacion: number) =>
    referencia === undefined || Math.abs((valor / referencia - 1) * 100 - variacion) <= 0.006;
  if (!cierra(cargados.get(mesRelativo(r.mes, -1)), r.mensual)) return null;
  if (!cierra(cargados.get(`${Number(r.mes.slice(0, 4)) - 1}-12-01`), r.acumulada)) return null;
  const guardado = cargados.get(r.mes);
  if (guardado !== undefined) return Math.abs(guardado - valor) <= guardado * 0.0001 ? [] : null;
  return [{ fecha: r.mes, valor }];
}

export const detectores: readonly Detector[] = [
  {
    id: "ec.sri-isd",
    carril: "norma",
    datos: ["ec.isd", "ec.isd-exento-tarjetas"],
    metodo: "html",
    url: URL_SRI_ISD,
    async traer(http) {
      const html = await textoOpcional(http, URL_SRI_ISD);
      const fecha = hoy();
      const leido = html ? parsearIsd(html, Number(fecha.slice(0, 4))) : null;
      if (!leido) return null;
      if (leido.tarifa === valorCargado("ec.isd", fecha) && leido.exentoTarjetas === valorCargado("ec.isd-exento-tarjetas", fecha)) return [];
      return [{ titulo: `SRI: ISD con tarifa general de ${leido.tarifa} % y USD ${leido.exentoTarjetas} exentos con tarjeta`, url: `${URL_SRI_ISD}#isd-${leido.tarifa}-${leido.exentoTarjetas}`, fecha }];
    },
  },
  {
    id: "ec.sri-tabla-herencias",
    carril: "norma",
    datos: ["ec.impuesto-herencias"],
    metodo: "html",
    url: URL_SRI_RENTA,
    async traer(http) {
      const html = await textoOpcional(http, URL_SRI_RENTA);
      if (!html) return null;
      const url = enlacePorNombre(html, /Herencias%20y%20Legados\.pdf$/i);
      if (!url) return null;
      // Igual que la tabla de renta: el SRI cambia el identificador del PDF cuando publica la tabla nueva.
      return [{ titulo: "SRI: tablas del impuesto a la renta sobre herencias, legados y donaciones (PDF publicado)", url, fecha: hoy() }];
    },
  },
  {
    id: "ec.sri-retenciones",
    carril: "norma",
    datos: ["ec.retencion-renta"],
    metodo: "html",
    url: URL_SRI_RETENCIONES,
    async traer(http) {
      const html = await textoOpcional(http, URL_SRI_RETENCIONES);
      if (!html) return null;
      const url = enlacePorNombre(html, /Porcentajes%20de%20retencion%20Impuesto%20a%20la%20Renta\.xls$/i);
      if (!url) return null;
      return [{ titulo: "SRI: porcentajes de retención en la fuente del impuesto a la renta (XLS publicado)", url, fecha: hoy() }];
    },
  },
  {
    id: "ec.sri-vehiculos",
    carril: "norma",
    datos: ["ec.impuesto-vehicular"],
    metodo: "html",
    url: URL_SRI_VEHICULOS,
    async traer(http) {
      const html = await textoOpcional(http, URL_SRI_VEHICULOS);
      const t = html ? parsearTablaVehicular(html) : null;
      if (!t) return null;
      const escala = valorCargado("ec.impuesto-vehicular", hoy()) as { tasa: number; cuotaFija?: number }[] | undefined;
      const ultima = escala?.[escala.length - 1];
      if (escala && escala[0].tasa === t.primeraTasa && ultima?.tasa === t.ultimaTasa && ultima?.cuotaFija === t.ultimaCuota) return [];
      return [{ titulo: `SRI: tabla del impuesto vehicular distinta a la cargada (primer tramo ${t.primeraTasa} %, último ${t.ultimaCuota} + ${t.ultimaTasa} %)`, url: `${URL_SRI_VEHICULOS}#tabla-${t.primeraTasa}-${t.ultimaCuota}-${t.ultimaTasa}`, fecha: hoy() }];
    },
  },
  {
    id: "ec.ipc-inec",
    carril: "serie",
    serie: "ec.ipc",
    metodo: "html",
    url: URL_INEC_IPC,
    banda: { min: 80, max: 150, saltoRelativoMax: 0.03 },
    traer: traerIpc,
  },
  {
    id: "ec.registro-oficial",
    carril: "norma",
    datos: [...DATOS_LABORALES, ...DATOS_TRIBUTARIOS],
    metodo: "api-xml",
    url: URL_RO,
    async traer(http) {
      const paginas = await Promise.all([textoOpcional(http, URL_RO), textoOpcional(http, `${URL_RO}?paged=2`)]);
      if (!paginas[0]) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const xml of paginas) {
        if (!xml) continue;
        const h = parsearFeedRo(xml);
        if (h === null) return null;
        hallazgos.push(...h.filter((x) => !hallazgos.some((y) => y.url === x.url)));
      }
      return hallazgos;
    },
  },
  {
    id: "ec.sri-tabla-renta",
    carril: "norma",
    datos: ["ec.impuesto-renta"],
    metodo: "html",
    url: URL_SRI_RENTA,
    async traer(http) {
      const html = await textoOpcional(http, URL_SRI_RENTA);
      if (!html) return null;
      const url = enlaceTablaRenta(html);
      if (!url) return null;
      // El SRI reemplaza el PDF (y cambia su identificador) cuando publica la tabla nueva: un
      // enlace que el cron no vio antes es la señal para revisar la tabla.
      return [{ titulo: "SRI: tablas de cálculo del impuesto a la renta (PDF publicado en sri.gob.ec)", url, fecha: hoy() }];
    },
  },
  {
    id: "ec.iess-sbu",
    carril: "norma",
    datos: ["ec.sbu"],
    metodo: "html",
    url: URL_IESS_AFILIACION,
    async traer(http) {
      const html = await textoOpcional(http, URL_IESS_AFILIACION);
      if (!html) return null;
      const sbu = sbuDelIess(html);
      if (!sbu) return null;
      if (sbuCargado(sbu.anio) === sbu.valor) return [];
      return [{ titulo: `IESS: salario básico unificado ${sbu.anio} de $${sbu.valor}`, url: `${URL_IESS_AFILIACION}#sbu-${sbu.anio}-${sbu.valor}`, fecha: hoy() }];
    },
  },
  {
    id: "ec.inec-canasta-enero",
    carril: "norma",
    datos: ["ec.canasta-basica-enero"],
    metodo: "pdf",
    url: "https://www.ecuadorencifras.gob.ec/indice-de-precios-al-consumidor/",
    async traer(http) {
      const anio = anioDeCanastaCargada() + 1;
      const fecha = hoy();
      if (!esFechaISO(fecha) || Number(fecha.slice(0, 4)) < anio) return [];
      const url = URL_INEC_ENERO(anio);
      const pdf = await textoOpcional(http, url);
      if (!pdf) return [];
      return [{ titulo: `INEC: boletín del IPC de enero de ${anio} (canasta para la rebaja por gastos personales)`, url, fecha }];
    },
  },
];
