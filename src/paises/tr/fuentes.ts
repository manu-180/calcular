import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const KURLAR = "https://www.tcmb.gov.tr/kurlar/today.xml";
const TUFE_API = "https://appg.tcmb.gov.tr/KIMENFH/enflasyon/hesapla";
const CSGB_ASGARI = "https://www.csgb.gov.tr/poco-pages/asgari-ucret/";
const CSGB_KIDEM = "https://www.csgb.gov.tr/%C4%B1statistikler/calisma-hayati-%C4%B1statistikleri/kidem-tazminati-tavan-miktari/";
const GIB_CDN = "https://cdn.gib.gov.tr/api/gibportal-file/file";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function hoyIstanbul(): FechaISO {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()) as FechaISO;
}

// today.xml trae el boletín del último día hábil; la fecha va en el atributo Date (MM/DD/YYYY).
// Sin el atributo o sin la moneda, el formato cambió: null.
async function kurTcmb(http: Http, kod: string): Promise<PuntoSerie[] | null> {
  const xml = await http.texto(KURLAR, { userAgentNavegador: true });
  const f = /<Tarih_Date[^>]*\bDate="(\d{2})\/(\d{2})\/(\d{4})"/.exec(xml);
  const bloque = new RegExp(`<Currency[^>]*Kod="${kod}"[\\s\\S]*?<ForexBuying>([\\d.]+)</ForexBuying>`).exec(xml);
  if (!f || !bloque) return null;
  const fecha = `${f[3]}-${f[1]}-${f[2]}`;
  const valor = Number(bloque[1]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

// El servicio del enflasyon hesaplayıcı de la TCMB devuelve el índice TÜFE (2003=100 encadenado)
// del mes final de un período. Se piden los últimos meses uno por uno; un mes todavía no publicado
// responde con error y se salta. Sin ningún mes válido, null.
async function tufeTcmb(http: Http): Promise<PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const [y, m] = hoyIstanbul().split("-").map(Number);
  const puntos: PuntoSerie[] = [];
  for (let atras = 4; atras >= 0; atras--) {
    const d = new Date(Date.UTC(y, m - 1 - atras, 1));
    const anio = d.getUTCFullYear();
    const mes = d.getUTCMonth() + 1;
    try {
      const r = (await http.postJson(TUFE_API, { baslangicYil: "2003", baslangicAy: "1", bitisYil: String(anio), bitisAy: String(mes), malSepeti: "100" })) as { sonYilTufe?: string };
      const valor = Number(String(r?.sonYilTufe ?? "").replace(/,/g, ""));
      const fecha = `${anio}-${String(mes).padStart(2, "0")}-01`;
      if (Number.isFinite(valor) && valor > 0 && esFechaISO(fecha)) puntos.push({ fecha, valor });
    } catch {
      continue;
    }
  }
  return puntos.length ? puntos : null;
}

// La página del Ministerio titula cada tabla con su período («01/01/2026 - 31/12/2026», «Temmuz
// 2026»). Un período que empieza después del último que tenemos cargado es una norma nueva; los
// viejos del archivo histórico se ignoran.
async function donemCsgb(http: Http, url: string, patron: RegExp, inicio: (x: string) => string | null, cargadoHasta: FechaISO, titulo: string): Promise<HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const encontrados = [...html.matchAll(patron)].map((x) => x[1]);
  if (encontrados.length === 0) return null;
  const nuevos = [...new Set(encontrados)].filter((x) => (inicio(x) ?? "") > cargadoHasta);
  return nuevos.map((x) => ({ titulo: `${titulo}: ${x}`, url, fecha: hoyIstanbul() }));
}

function inicioDonem(x: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(x);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

function inicioAy(x: string): string | null {
  const [ad, yil] = x.split(" ");
  const i = AYLAR.indexOf(ad);
  return i < 0 ? null : `${yil}-${String(i + 1).padStart(2, "0")}-01`;
}

// GİB publica cada año un PDF con el mismo nombre y el año siguiente. Si el del próximo año ya
// existe (no devuelve el error JSON del CDN), hay valores nuevos para cargar.
async function pdfGibSiguiente(http: Http, ruta: (anio: number) => string, titulo: string): Promise<HallazgoNorma[] | null> {
  const anio = Number(hoyIstanbul().slice(0, 4)) + 1;
  const url = `${GIB_CDN}/${ruta(anio)}`;
  try {
    const cuerpo = await http.texto(url, { userAgentNavegador: true });
    if (!cuerpo.startsWith("%PDF")) return [];
    return [{ titulo: `${titulo} ${anio}`, url, fecha: hoyIstanbul() }];
  } catch {
    return [];
  }
}

function serieKur(kod: string, banda: { min: number; max: number }): Detector {
  return {
    id: `tr.${kod.toLowerCase()}-tcmb`,
    carril: "serie",
    serie: `tr.${kod.toLowerCase()}`,
    metodo: "api-xml",
    url: KURLAR,
    userAgentNavegador: true,
    banda: { ...banda, saltoRelativoMax: 0.08 },
    traer(http) {
      return kurTcmb(http, kod);
    },
  };
}

export const detectores: readonly Detector[] = [
  serieKur("USD", { min: 30, max: 120 }),
  serieKur("EUR", { min: 30, max: 140 }),
  serieKur("GBP", { min: 35, max: 160 }),
  {
    id: "tr.tufe-tcmb",
    carril: "serie",
    serie: "tr.tufe",
    metodo: "api-json",
    url: TUFE_API,
    banda: { min: 3000, max: 15000, saltoRelativoMax: 0.12 },
    traer(http) {
      return tufeTcmb(http);
    },
  },
  {
    id: "tr.csgb-asgari-ucret",
    carril: "norma",
    datos: ["tr.asgari-ucret", "tr.pek-sinirlari"],
    metodo: "html",
    url: CSGB_ASGARI,
    userAgentNavegador: true,
    traer(http) {
      return donemCsgb(http, CSGB_ASGARI, /(\d{2}\/\d{2}\/20\d{2} - \d{2}\/\d{2}\/20\d{2})/g, inicioDonem, "2026-01-01", "Yeni asgari ücret dönemi");
    },
  },
  {
    id: "tr.csgb-kidem-tavani",
    carril: "norma",
    datos: ["tr.kidem-tavan"],
    metodo: "html",
    url: CSGB_KIDEM,
    userAgentNavegador: true,
    traer(http) {
      const meses = AYLAR.join("|");
      return donemCsgb(http, CSGB_KIDEM, new RegExp(`Kıdem Tazminatı\\s*(?:<[^>]*>\\s*)*\\(((?:${meses}) 20\\d{2})\\)`, "g"), inicioAy, "2026-07-01", "Yeni kıdem tazminatı tavanı");
    },
  },
  {
    id: "tr.gib-gelir-vergisi-tarifesi",
    carril: "norma",
    datos: ["tr.gv-tarife-ucret", "tr.gv-tarife"],
    metodo: "pdf",
    url: `${GIB_CDN}/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf`,
    traer(http) {
      return pdfGibSiguiente(http, (a) => `getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-${a}.pdf`, "Gelir vergisi tarifesi");
    },
  },
  {
    id: "tr.gib-gecici-67",
    carril: "norma",
    datos: ["tr.mevduat-stopaj", "tr.gvk94"],
    metodo: "pdf",
    url: `${GIB_CDN}/getFile?objectKey=DUYURU%2FUNIVERSAL%2F2026%2F2026_Gecici67.pdf`,
    traer(http) {
      return pdfGibSiguiente(http, (a) => `getFile?objectKey=DUYURU%2FUNIVERSAL%2F${a}%2F${a}_Gecici67.pdf`, "GVK geçici 67 rehberi");
    },
  },
  {
    id: "tr.gib-ucret-rehberi",
    carril: "norma",
    datos: ["tr.damga-ust-sinir", "tr.damga-oranlari", "tr.asgari-ucret"],
    metodo: "pdf",
    url: `${GIB_CDN}/getFile?objectKey=MEVZUAT_TEBLIGLER%2FUNIVERSAL%2F2025%2F488_Teblig71.pdf`,
    traer(http) {
      return pdfGibSiguiente(http, (a) => `getFile?objectKey=DUYURU%2FUNIVERSAL%2F${a}%2F${a}_Ucret_Geliri.pdf`, "Ücret geliri vergi rehberi");
    },
  },
];
