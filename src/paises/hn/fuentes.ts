import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";
import { esFechaISO, fechaEnZona } from "@/motor/vigencia";

const ZONA = "America/Tegucigalpa";

// La portada de bch.hn arma el indicador del tipo de cambio desde esta lista de SharePoint, que
// responde a un GET anónimo. Sin el Accept con odata=nometadata SharePoint devuelve XML (Atom).
const URL_TIPO_CAMBIO =
  "https://www.bch.hn/_api/web/lists(guid'08a9876c-c6f1-4e73-8d13-0039b0442fab')/items?$select=Fecha,Valor,Observacion&$top=15&$orderby=Fecha%20desc";

// El BCH guarda la fecha como medianoche de Tegucigalpa expresada en UTC (06:00Z).
export function leerTipoCambio(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null || !Array.isArray((json as { value?: unknown }).value)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of (json as { value: unknown[] }).value) {
    const { Fecha, Valor } = (fila ?? {}) as { Fecha?: unknown; Valor?: unknown };
    if (typeof Fecha !== "string" || typeof Valor !== "number" || !Number.isFinite(Valor) || Valor <= 0) return null;
    const instante = new Date(Fecha);
    if (Number.isNaN(instante.getTime())) return null;
    const fecha = fechaEnZona(instante, ZONA);
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Valor });
  }
  if (puntos.length === 0) return null;
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
  return puntos.filter((p, i) => i === 0 || p.fecha !== puntos[i - 1].fecha);
}

function sinEntidades(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

// El acuerdo vigente (SETRASS-233-2026) se anunció en el sitio de la STSS entre el 18/4 y el 7/5/2026.
// Solo interesa lo publicado después: un acuerdo nuevo o el ajuste por la cláusula de salvaguarda.
const ULTIMA_PUBLICACION_SALARIO = "2026-05-07";

export function leerFeedSalario(xml: string): HallazgoNorma[] | null {
  if (!/<rss[\s>]/.test(xml)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const titulo = sinEntidades(/<title>([\s\S]*?)<\/title>/.exec(item)?.[1] ?? "");
    const url = sinEntidades(/<link>([\s\S]*?)<\/link>/.exec(item)?.[1] ?? "");
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(item)?.[1];
    if (!titulo || !url.startsWith("https://") || !pub) continue;
    const instante = new Date(pub);
    if (Number.isNaN(instante.getTime())) continue;
    const fecha = fechaEnZona(instante, ZONA);
    if (fecha <= ULTIMA_PUBLICACION_SALARIO) continue;
    if (!/salario\s+m[ií]nimo|salvaguarda/i.test(titulo)) continue;
    hallazgos.push({ titulo, url, fecha });
  }
  return hallazgos;
}

// El SAR publica la tabla progresiva cada enero en una entrada con la fecha en la ruta
// (/2026/01/actualizacion-de-la-tabla-progresiva-2026/). La de 2026 ya está cargada.
const ULTIMO_ANIO_TABLA = 2026;

export function leerBusquedaSar(json: unknown): HallazgoNorma[] | null {
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const r of json as { title?: unknown; url?: unknown }[]) {
    if (typeof r?.title !== "string" || typeof r.url !== "string") continue;
    const m = /^https:\/\/www\.sar\.gob\.hn\/(\d{4})\/(\d{2})\//.exec(r.url);
    if (!m || Number(m[1]) <= ULTIMO_ANIO_TABLA) continue;
    if (!/tabla\s+progresiva/i.test(r.title)) continue;
    const fecha = `${m[1]}-${m[2]}-01` as FechaISO;
    if (!esFechaISO(fecha)) continue;
    hallazgos.push({ titulo: sinEntidades(r.title), url: r.url, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "hn.tipo-cambio-bch",
    carril: "serie",
    serie: "hn.tipo-cambio",
    metodo: "api-json",
    url: URL_TIPO_CAMBIO,
    banda: { min: 24, max: 30, saltoRelativoMax: 0.03 },
    async traer(http) {
      return leerTipoCambio(await http.json(this.url, { encabezados: { Accept: "application/json;odata=nometadata" } }));
    },
  },
  {
    id: "hn.stss-salario-minimo",
    carril: "norma",
    datos: ["hn.salario-minimo-mensual", "hn.salario-minimo-diario", "hn.salario-minimo-hora"],
    metodo: "api-xml",
    url: "https://www.trabajo.gob.hn/feed/?s=salario+minimo",
    async traer(http) {
      return leerFeedSalario(await http.texto(this.url));
    },
  },
  {
    id: "hn.sar-tabla-progresiva",
    carril: "norma",
    datos: ["hn.isr-tabla", "hn.isr-deduccion-gastos-medicos"],
    metodo: "api-json",
    url: "https://www.sar.gob.hn/wp-json/wp/v2/search?search=tabla%20progresiva&per_page=20",
    async traer(http) {
      return leerBusquedaSar(await http.json(this.url));
    },
  },
];
