import { esFechaISO, fechaEnZona } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";
import datos from "./datos.json";

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
];
const DATOS_TRIBUTARIOS = ["ec.iva", "ec.impuesto-renta", "ec.rebaja-gastos-personales", "ec.canastas-por-cargas", "ec.canastas-catastroficas", "ec.canasta-basica-enero"];

export const detectores: readonly Detector[] = [
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
