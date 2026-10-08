import { esFechaISO, fechaEnZona, sumarDias } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const ZONA = "America/Santiago";
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const URL_UF = (anio: number) => `https://www.sii.cl/valores_y_fechas/uf/uf${anio}.htm`;
const URL_UTM = (anio: number) => `https://www.sii.cl/valores_y_fechas/utm/utm${anio}.htm`;

// Las series se cruzan con mindicador.cl (agregador, no oficial): el SII manda, y si en algún día que
// publican los dos el valor no coincide, el detector no devuelve nada y la serie no se toca.
const CRUCE_UF = "https://mindicador.cl/api/uf";
const CRUCE_UTM = "https://mindicador.cl/api/utm";
const MIN_COINCIDENCIAS = 5;

function numeroChileno(texto: string): number | null {
  const limpio = texto.trim();
  if (!/^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/.test(limpio)) return null;
  return Number(limpio.split(".").join("").replace(",", "."));
}

function fecha(anio: number, mes: number, dia: number): FechaISO | null {
  const f = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

export function parsearUfSii(html: string, anio: number): PuntoSerie[] {
  const puntos: PuntoSerie[] = [];
  MESES.forEach((nombre, i) => {
    const inicio = html.indexOf(`id='mes_${nombre}'`);
    if (inicio < 0) return;
    const fin = html.indexOf("</table>", inicio);
    const bloque = html.slice(inicio, fin < 0 ? undefined : fin);
    for (const m of bloque.matchAll(/<strong>(\d{1,2})<\/strong><\/th>\s*<td[^>]*>([^<]*)<\/td>/g)) {
      const valor = numeroChileno(m[2]);
      const f = fecha(anio, i + 1, Number(m[1]));
      if (valor !== null && f) puntos.push({ fecha: f, valor });
    }
  });
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

export function parsearUtmSii(html: string, anio: number): PuntoSerie[] {
  const puntos: PuntoSerie[] = [];
  MESES.forEach((nombre, i) => {
    const etiqueta = nombre[0].toUpperCase() + nombre.slice(1);
    const m = new RegExp(`<th>${etiqueta}</th>\\s*<td>([^<]*)</td>`).exec(html);
    const valor = m ? numeroChileno(m[1]) : null;
    const f = fecha(anio, i + 1, 1);
    if (valor !== null && f) puntos.push({ fecha: f, valor });
  });
  return puntos;
}

export function parsearMindicador(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null || !Array.isArray((json as { serie?: unknown }).serie)) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of (json as { serie: unknown[] }).serie) {
    const { fecha: f, valor } = (p ?? {}) as { fecha?: unknown; valor?: unknown };
    if (typeof f !== "string" || typeof valor !== "number") return null;
    const instante = new Date(f);
    if (Number.isNaN(instante.getTime())) return null;
    puntos.push({ fecha: fechaEnZona(instante, ZONA), valor });
  }
  return puntos;
}

export function cruzar(oficial: readonly PuntoSerie[], cruce: readonly PuntoSerie[]): { coinciden: number; difieren: string[] } {
  const mapa = new Map(oficial.map((p) => [p.fecha, p.valor]));
  let coinciden = 0;
  const difieren: string[] = [];
  for (const p of cruce) {
    const v = mapa.get(p.fecha);
    if (v === undefined) continue;
    if (Math.abs(v - p.valor) < 0.005) coinciden++;
    else difieren.push(`${p.fecha}: SII ${v}, mindicador ${p.valor}`);
  }
  return { coinciden, difieren };
}

async function textoOpcional(http: Http, url: string): Promise<string | null> {
  try {
    return await http.texto(url);
  } catch {
    return null;
  }
}

// El cron compara cada punto nuevo contra el último guardado (salto máximo de la banda): por eso se
// devuelven solo los puntos recientes y no el año entero.
async function traerSerieCruzada(
  http: Http,
  urlDe: (anio: number) => string,
  parsear: (html: string, anio: number) => PuntoSerie[],
  urlCruce: string,
  diasAtras: number,
): Promise<PuntoSerie[] | null> {
  const hoy = fechaEnZona(new Date(), ZONA);
  const anio = Number(hoy.slice(0, 4));
  const html = await textoOpcional(http, urlDe(anio));
  if (!html) return null;
  const oficiales = parsear(html, anio);
  if (hoy.slice(5, 7) === "12") {
    const siguiente = await textoOpcional(http, urlDe(anio + 1));
    if (siguiente) oficiales.push(...parsear(siguiente, anio + 1));
  }
  if (oficiales.length === 0) return null;
  const cruce = parsearMindicador(await http.json(urlCruce).catch(() => null));
  if (!cruce) return null;
  const { coinciden, difieren } = cruzar(oficiales, cruce);
  if (difieren.length > 0 || coinciden < Math.min(MIN_COINCIDENCIAS, cruce.length)) return null;
  const desde = sumarDias(hoy, -diasAtras);
  return oficiales.filter((p) => p.fecha >= desde);
}

const RE_NORMA = /<NORMA idNorma='(\d+)'[^>]*>[\s\S]*?<FECHA_PUBLICACION>([\d-]+)<\/FECHA_PUBLICACION>[\s\S]*?<TITULO>([\s\S]*?)<\/TITULO>/g;
const TEMAS = /ingreso m[ií]nimo|asignaci[oó]n familiar|jornada|horas extraordinarias|feriado|indemnizaci[oó]n|gratificaci[oó]n|c[oó]digo del trabajo|impuesto|honorarios|tope imponible|cotizaci[oó]n|seguro de cesant[ií]a|sistema de pensiones|unidad de fomento/i;

export function parsearNormasBcn(xml: string): HallazgoNorma[] | null {
  if (!xml.includes("<NORMAS")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of xml.matchAll(RE_NORMA)) {
    const titulo = m[3].replace(/\s+/g, " ").trim();
    if (!esFechaISO(m[2]) || !TEMAS.test(titulo)) continue;
    hallazgos.push({ titulo, url: `https://www.bcn.cl/leychile/navegar?idNorma=${m[1]}`, fecha: m[2] });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "cl.uf-sii",
    carril: "serie",
    serie: "cl.uf",
    metodo: "html",
    url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm",
    banda: { min: 38000, max: 50000, saltoRelativoMax: 0.005 },
    traer: (http) => traerSerieCruzada(http, URL_UF, parsearUfSii, CRUCE_UF, 10),
  },
  {
    id: "cl.utm-sii",
    carril: "serie",
    serie: "cl.utm",
    metodo: "html",
    url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm",
    banda: { min: 65000, max: 85000, saltoRelativoMax: 0.03 },
    traer: (http) => traerSerieCruzada(http, URL_UTM, parsearUtmSii, CRUCE_UTM, 70),
  },
  {
    id: "cl.bcn-normas",
    carril: "norma",
    datos: [
      "cl.imm",
      "cl.imm-menores-mayores",
      "cl.imm-no-remuneracional",
      "cl.jornada-maxima",
      "cl.retencion-honorarios",
      "cl.tope-imponible",
      "cl.tope-imponible-cesantia",
      "cl.impuesto-unico",
      "cl.iva",
    ],
    metodo: "api-xml",
    url: "https://www.leychile.cl/Consulta/obtxml?opt=3&cantidad=100",
    async traer(http) {
      const xml = await textoOpcional(http, this.url);
      return xml ? parsearNormasBcn(xml) : null;
    },
  },
];
