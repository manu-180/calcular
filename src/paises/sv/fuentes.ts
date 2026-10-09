import { esFechaISO, fechaEnZona } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, OpcionesHttp, PuntoSerie } from "@/motor/tipos";

const ZONA = "America/El_Salvador";
const URL_MTPS = "https://www.mtps.gob.sv/wp-json/wp/v2/posts?per_page=50&_fields=date,link,title,content";
const URL_ASAMBLEA = "https://www.asamblea.gob.sv/leyes-y-decretos/decretos-por-anios";
const URL_MH = "https://www.mh.gob.sv/feed/";

const TEMAS_MTPS = /salario m[ií]nimo|aguinaldo|quincena|renuncia voluntaria|horas? extra|c[oó]digo de trabajo/i;
// Los anuncios de cambios a veces van al final de una nota con otro título (el del aguinaldo 2026 salió
// en una nota sobre jornadas de trabajo): en el cuerpo se buscan solo frases de cambio normativo.
const CAMBIOS_EN_CUERPO = /reform\w*[^.]{0,120}(aguinaldo|salario m[ií]nimo|c[oó]digo de trabajo|vacaci|indemnizaci)|(aumento|incremento|nuevo)[^.]{0,40}salario m[ií]nimo|quincena (25|veinticinco)/i;
const TEMAS_LEYES = /C[OÓ]DIGO DE TRABAJO|IMPUESTO SOBRE LA RENTA|SEGURO SOCIAL|SISTEMA DE PENSIONES|AGUINALDO|QUINCENA|RENUNCIA VOLUNTARIA|SALARIO M[IÍ]NIMO|TRANSFERENCIA DE BIENES MUEBLES/i;
// La Asamblea exonera de impuestos (IVA incluido) a decenas de asociaciones por año: esos decretos
// nombran la ley del IVA pero no cambian la tasa.
const EXONERACION = /^\s*EXON[EÉ]RASE/i;
const TEMAS_MH = /renta|retenci[oó]n|\bIVA\b|aguinaldo|quincena/i;

const DATOS_LABORALES = [
  "sv.salario-minimo",
  "sv.salario-minimo-diario",
  "sv.aguinaldo-dias",
  "sv.indemnizacion-dias-por-anio",
  "sv.indemnizacion-tope",
  "sv.renuncia-dias-por-anio",
  "sv.renuncia-tope",
  "sv.vacaciones-dias",
  "sv.vacaciones-recargo",
  "sv.recargo-hora-extra",
  "sv.recargo-nocturno",
  "sv.quincena25-porcentaje",
  "sv.quincena25-salario-maximo",
];
const DATOS_TRIBUTARIOS = ["sv.renta-mensual", "sv.renta-quincenal", "sv.deduccion-fija-renta", "sv.limite-deduccion-fija-renta", "sv.iva"];
const DATOS_SEGURIDAD_SOCIAL = ["sv.afp-trabajador", "sv.isss-trabajador", "sv.isss-salario-maximo"];

function decodificar(texto: string): string {
  return texto
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parsearMtps(json: unknown): HallazgoNorma[] | null {
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const p of json as { date?: unknown; link?: unknown; title?: { rendered?: unknown }; content?: { rendered?: unknown } }[]) {
    const fecha = typeof p.date === "string" ? p.date.slice(0, 10) : null;
    const titulo = typeof p.title?.rendered === "string" ? decodificar(p.title.rendered) : null;
    if (!esFechaISO(fecha) || titulo === null || typeof p.link !== "string" || !p.link.startsWith("https://")) return null;
    if (!titulo) continue;
    const cuerpo = typeof p.content?.rendered === "string" ? decodificar(p.content.rendered) : "";
    if (TEMAS_MTPS.test(titulo) || CAMBIOS_EN_CUERPO.test(cuerpo)) hallazgos.push({ titulo: `MTPS: ${titulo}`, url: p.link, fecha });
  }
  return hallazgos;
}

function fechaDeEmision(texto: string): FechaISO | null {
  const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(texto);
  if (!m) return null;
  const f = `${m[3]}-${m[2]}-${m[1]}`;
  return esFechaISO(f) ? f : null;
}

export function parsearAsamblea(html: string): HallazgoNorma[] | null {
  const tarjetas = [...html.matchAll(/No\. Decreto: <span class="fw-al-bold">(\d+)<\/span>[\s\S]*?data-al-modal-url="(https:\/\/www\.asamblea\.gob\.sv\/leyes-y-decretos\/view\/\d+)[\s\S]*?<p class="card-text">([\s\S]*?)<\/p>[\s\S]*?Fecha de Emisi[oó]n:\s*([\d/]+)/g)];
  if (tarjetas.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, numero, url, descripcion, emision] of tarjetas) {
    const titulo = decodificar(descripcion);
    const fecha = fechaDeEmision(emision);
    if (!fecha || EXONERACION.test(titulo) || !TEMAS_LEYES.test(titulo)) continue;
    hallazgos.push({ titulo: `Asamblea Legislativa, D.L. ${numero}: ${titulo}`.slice(0, 300), url, fecha });
  }
  return hallazgos;
}

export function parsearFeedMh(xml: string): HallazgoNorma[] | null {
  if (!xml.includes("<rss") || !xml.includes("<channel>")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const item of xml.split("<item>").slice(1)) {
    const titulo = decodificar(/<title>([\s\S]*?)<\/title>/.exec(item)?.[1] ?? "");
    const url = /<link>([\s\S]*?)<\/link>/.exec(item)?.[1]?.trim();
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(item)?.[1]?.trim();
    if (!titulo || !url || !pub || !url.startsWith("https://")) continue;
    const instante = new Date(pub);
    if (Number.isNaN(instante.getTime())) continue;
    if (TEMAS_MH.test(titulo)) hallazgos.push({ titulo: `Ministerio de Hacienda: ${titulo}`, url, fecha: fechaEnZona(instante, ZONA) });
  }
  return hallazgos;
}

const URL_IPC = "https://estadisticas.bcr.gob.sv/serie/indice-de-precios-al-consumidor-ipc";
const MESES_CORTOS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function celdas(fila: string): { texto: string; colspan: number }[] {
  return [...fila.matchAll(/<t[hd]([^>]*)>([\s\S]*?)<\/t[hd]>/g)].map(([, atributos, contenido]) => ({
    texto: decodificar(contenido),
    colspan: Number(/colspan="(\d+)"/.exec(atributos)?.[1] ?? 1),
  }));
}

// El cuadro del BCR (Livewire) trae por defecto los últimos 22 meses: una fila de años con colspan,
// una de meses y, debajo, el índice general como primera fila de valores.
export function parsearIpcBcr(html: string): PuntoSerie[] | null {
  const filas = [...html.matchAll(/<tr[\s\S]*?<\/tr>/g)].map((m) => celdas(m[0]));
  const iAnios = filas.findIndex((f) => f.length > 0 && f.every((c) => /^\d{4}$/.test(c.texto)));
  if (iAnios < 0 || iAnios + 2 >= filas.length) return null;
  const anios = filas[iAnios].flatMap((c) => Array<number>(c.colspan).fill(Number(c.texto)));
  const meses = filas[iAnios + 1].map((c) => MESES_CORTOS.indexOf(c.texto) + 1);
  const valores = filas[iAnios + 2].map((c) => Number(c.texto.replace(/,/g, "")));
  if (anios.length !== meses.length || meses.length !== valores.length || meses.some((m) => m === 0)) return null;
  const puntos: PuntoSerie[] = [];
  for (let i = 0; i < meses.length; i++) {
    const fecha = `${anios[i]}-${String(meses[i]).padStart(2, "0")}-01`;
    if (!esFechaISO(fecha) || !Number.isFinite(valores[i]) || valores[i] <= 0) return null;
    puntos.push({ fecha, valor: valores[i] });
  }
  return puntos;
}

async function textoOpcional(http: Http, url: string, opciones?: OpcionesHttp): Promise<string | null> {
  try {
    return await http.texto(url, opciones);
  } catch {
    return null;
  }
}

export const detectores: readonly Detector[] = [
  {
    id: "sv.bcr-ipc",
    carril: "serie",
    serie: "sv.ipc",
    metodo: "html",
    url: URL_IPC,
    // Bandas: el IPC (dic 2009 = 100) subió como máximo 7,8 % interanual (junio 2022) y 3 % en un mes (abril 2011).
    banda: { min: 120, max: 175, saltoRelativoMax: 0.04 },
    async traer(http) {
      const html = await textoOpcional(http, URL_IPC);
      return html ? parsearIpcBcr(html) : null;
    },
  },
  {
    id: "sv.mtps-noticias",
    carril: "norma",
    datos: DATOS_LABORALES,
    metodo: "api-json",
    url: URL_MTPS,
    async traer(http) {
      try {
        return parsearMtps(await http.json(URL_MTPS));
      } catch {
        return null;
      }
    },
  },
  {
    id: "sv.asamblea-decretos",
    carril: "norma",
    datos: [...DATOS_LABORALES, ...DATOS_TRIBUTARIOS, ...DATOS_SEGURIDAD_SOCIAL],
    metodo: "html",
    url: URL_ASAMBLEA,
    // asamblea.gob.sv no manda el intermedio: tlsTolerante lo completa con scripts/datos-paises/certs.
    tlsTolerante: true,
    async traer(http) {
      const anio = fechaEnZona(new Date(), ZONA).slice(0, 4);
      const html = await textoOpcional(http, `${URL_ASAMBLEA}/${anio}/0`, { tlsTolerante: true });
      return html ? parsearAsamblea(html) : null;
    },
  },
  {
    id: "sv.mh-noticias",
    carril: "norma",
    datos: DATOS_TRIBUTARIOS,
    metodo: "api-xml",
    url: URL_MH,
    async traer(http) {
      const xml = await textoOpcional(http, URL_MH);
      return xml ? parsearFeedMh(xml) : null;
    },
  },
];
