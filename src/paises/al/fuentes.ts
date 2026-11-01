import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BSH = "https://www.bankofalbania.org/Tregjet/Kursi_zyrtar_i_kembimit/" as const;
const TATIME_LIGJE = "https://tatime.gov.al/legjislacioni/ligje/" as const;

function pastro(html: string): string {
  return html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

// La página trae primero la tabla de monedas principales, con «Përditesimi i fundit: 30.10.2026 12:12:09»
// encima: se lee solo ese primer bloque, porque abajo se repiten los promedios de compra y venta.
export function lexoKursin(html: string, kodi: string): readonly PuntoSerie[] | null {
  const t = pastro(html);
  const d = /Përditesimi i fundit:\s*(\d{2})\.(\d{2})\.(\d{4})/.exec(t);
  if (!d) return null;
  const fecha = `${d[3]}-${d[2]}-${d[1]}`;
  if (!esFechaISO(fecha)) return null;
  const pjesa = t.slice(d.index);
  const m = new RegExp(`\\b${kodi}\\s+(\\d{2,3}\\.\\d{2})\\b`).exec(pjesa);
  if (!m) return null;
  return [{ fecha: fecha as FechaISO, valor: Number(m[1]) }];
}

function detectorKursi(kodi: string, banda: DetectorSerie["banda"]): Detector {
  const k = kodi.toLowerCase();
  return {
    id: `al.${k}-bsh`,
    carril: "serie",
    serie: `al.${k}`,
    metodo: "html",
    url: BSH,
    banda,
    async traer(http: Http) {
      return lexoKursin(await http.texto(BSH), kodi);
    },
  };
}

// Tatime lista las leyes como PDF subidos por mes: la carpeta /AAAA/MM/ da la fecha y el nombre del
// archivo dice qué ley es. Un PDF nuevo de las que vigilamos es un hallazgo, nunca un cambio automático.
export function lexoLigjet(html: string, shenja: RegExp): readonly HallazgoNorma[] | null {
  const hallazgos = new Map<string, HallazgoNorma>();
  for (const m of html.matchAll(/href="([^"]*\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"]+\.pdf))"/g)) {
    if (!shenja.test(m[4])) continue;
    const fecha = `${m[2]}-${m[3]}-01`;
    if (!esFechaISO(fecha)) continue;
    const url = m[1].startsWith("http") ? m[1] : `https://tatime.gov.al${m[1]}`;
    hallazgos.set(url, { titulo: decodeURIComponent(m[4]).replace(/[-_]/g, " ").replace(/\.pdf$/, ""), url, fecha: fecha as FechaISO });
  }
  return html.includes("wp-content/uploads") ? [...hallazgos.values()] : null;
}

function detectorLigji(id: string, shenja: RegExp, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: TATIME_LIGJE,
    async traer(http: Http) {
      return lexoLigjet(await http.texto(TATIME_LIGJE), shenja);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKursi("EUR", { min: 75, max: 125, saltoRelativoMax: 0.05 }),
  detectorKursi("USD", { min: 60, max: 125, saltoRelativoMax: 0.06 }),
  detectorLigji("al.tatime-ligji-29-2023", /29-2023/, [
    "al.tatim-punesim",
    "al.zbritje-personale",
    "al.kompensim-femije",
    "al.zbritje-arsim",
    "al.kufi-arsim",
    "al.tatim-korporate",
    "al.kufi-zero",
    "al.tatim-biznes",
    "al.regjim-vecante",
    "al.kufi-regjim",
    "al.tatim-dividend",
    "al.tatim-investim",
    "al.tatim-dhurate",
    "al.perjashtim-dhurate",
  ]),
  detectorLigji("al.tatime-ligji-92-2014", /92-2014/, ["al.tvsh"]),
  detectorLigji("al.tatime-ligji-9632", /9632/, ["al.taksa-ndertese"]),
];
