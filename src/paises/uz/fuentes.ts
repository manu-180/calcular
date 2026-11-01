import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

const CPI_URL = "https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_1286.json";

// stat.uz publica el índice de cada mes contra el mes anterior. Se encadena desde diciembre de 2020 =
// 100, igual que series.json, para que el punto nuevo sea comparable con los que ya están.
async function cpiStat(http: Http): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(CPI_URL)) as unknown;
  if (!Array.isArray(json)) return null;
  const data = (json[0] as { data?: unknown } | undefined)?.data;
  if (!Array.isArray(data)) return null;
  const fila = (data as Record<string, unknown>[]).find((f) => f.Code === "1");
  if (!fila) return null;
  const meses = Object.keys(fila)
    .filter((k) => /^\d{4}-M\d{2}$/.test(k))
    .sort();
  if (meses[0] !== "2021-M01") return null;
  const puntos: PuntoSerie[] = [{ fecha: "2020-12-01", valor: 100 }];
  let indice = 100;
  for (const k of meses) {
    const m = fila[k];
    if (typeof m !== "number" || !Number.isFinite(m) || m < 90 || m > 110) return null;
    indice = (indice * m) / 100;
    const fecha = `${k.slice(0, 4)}-${k.slice(6, 8)}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Math.round(indice * 10000) / 10000 });
  }
  return puntos;
}

// Buscador de lex.uz: cada resultado trae «DD.MM.AAAA yildagi PF-n-son» o «OʻRQ-n-son» junto al
// enlace al documento. Se informan los posteriores a la última verificación.
async function lexQidiruv(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/lex\.uz|\/uz\/docs\//.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  const vistos = new Set<string>();
  const re = /\/uz\/docs\/(-?\d+)\?query[^>]*>([\s\S]*?)<\/a>[\s\S]{0,600}?(\d{2})\.(\d{2})\.(\d{4}) yildagi/g;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    const fecha = `${m[5]}-${m[4]}-${m[3]}`;
    if (!esFechaISO(fecha) || fecha <= VERIFICADO || vistos.has(m[1])) continue;
    vistos.add(m[1]);
    const titulo = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    hallazgos.push({ titulo: titulo || `lex.uz ${m[1]}`, url: `https://lex.uz/uz/docs/${m[1]}`, fecha });
  }
  return hallazgos;
}

function lex(soz: string): `https://${string}` {
  return `https://lex.uz/uz/search/nat?query=${encodeURIComponent(soz)}`;
}

export const detectores: readonly Detector[] = [
  {
    id: "uz.cpi-stat",
    carril: "serie",
    serie: "uz.cpi",
    metodo: "api-json",
    url: CPI_URL,
    banda: { min: 150, max: 260, saltoRelativoMax: 0.04 },
    traer(http) {
      return cpiStat(http);
    },
  },
  {
    id: "uz.lex-ish-haqi-farmoni",
    carril: "norma",
    datos: ["uz.mhtekm", "uz.bhm"],
    metodo: "html",
    url: lex("Ish haqi, pensiyalar, stipendiyalar va nafaqalar miqdorini oshirish"),
    traer(http) {
      return lexQidiruv(http, this.url);
    },
  },
  {
    id: "uz.lex-soliq-kodeksi",
    carril: "norma",
    datos: ["uz.jshds", "uz.ijtimoiy-soliq", "uz.qqs", "uz.aylanma-soligi", "uz.aylanma-chegarasi", "uz.mol-mulk-soligi", "uz.mol-mulk-eng-kam-baza", "uz.yer-soligi"],
    metodo: "html",
    url: lex("Soliq kodeksiga oʻzgartirish"),
    traer(http) {
      return lexQidiruv(http, this.url);
    },
  },
  {
    id: "uz.lex-mehnat-kodeksi",
    carril: "norma",
    datos: ["uz.ishdan-boshatish-nafaqasi", "uz.ogohlantirish-oy", "uz.ogohlantirish-kun", "uz.ortiqcha-ish", "uz.tatil-kunlari", "uz.ish-kunlari-ortacha"],
    metodo: "html",
    url: lex("Mehnat kodeksiga oʻzgartirish"),
    traer(http) {
      return lexQidiruv(http, this.url);
    },
  },
  {
    id: "uz.lex-ijtimoiy-sugurta",
    carril: "norma",
    datos: ["uz.kasallik-staj-koeffitsiyenti", "uz.kasallik-imtiyoz", "uz.kasallik-kamaytirish", "uz.homiladorlik-staj-koeffitsiyenti", "uz.homiladorlik-kunlari", "uz.nafaqa-ish-haqi-chegarasi"],
    metodo: "html",
    url: lex("vaqtincha mehnatga layoqatsizlik nafaqasi"),
    traer(http) {
      return lexQidiruv(http, this.url);
    },
  },
];
