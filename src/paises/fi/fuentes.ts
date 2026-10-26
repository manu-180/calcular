import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const KHI = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/khi/11xs.px";

// Tilastokeskuksen PxWeb vastaa dataan vain POST-kyselyyn. Pyydetään kokonaisindeksin pisteluku
// 2000=100, jolla series.json on tehty; json-stat2 tuo kuukaudet järjestyksessä indeksin mukaan.
async function khi(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const kysely = { query: [{ code: "contentscode", selection: { filter: "item", values: ["ip_0_2000"] } }], response: { format: "json-stat2" } };
  const r = (await http.postJson(url, kysely)) as { dimension?: { timeperiod_m?: { category?: { index?: Record<string, number> } } }; value?: (number | null)[] };
  const indeksi = r.dimension?.timeperiod_m?.category?.index;
  const arvot = r.value;
  if (!indeksi || !Array.isArray(arvot)) return null;
  const pisteet: PuntoSerie[] = [];
  for (const [kk, i] of Object.entries(indeksi)) {
    const m = /^(\d{4})M(\d{2})$/.exec(kk);
    const arvo = arvot[i];
    const fecha = m ? `${m[1]}-${m[2]}-01` : "";
    if (!m || typeof arvo !== "number" || !esFechaISO(fecha)) continue;
    pisteet.push({ fecha, valor: arvo });
  }
  pisteet.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return pisteet.length ? pisteet : null;
}

// Verohallinto päivittää samaan päätössivuun seuraavan vuoden version. Uusi vuosi otsikossa tarkoittaa
// uusia lukuja: kuntien veroprosentit, ennakonpidätyksen perusteet tai matkakorvaukset.
async function veroPaatos(http: Http, url: string, tunnettu: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const otsikko = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const vuosi = Number(/(?:vuonna|vuodelle) (\d{4})/.exec(otsikko ?? "")?.[1]);
  if (!otsikko || !vuosi) return null;
  if (vuosi <= tunnettu) return [];
  const p = /Antop(?:ä|&auml;)iv(?:ä|&auml;)[\s\S]{0,200}?(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(html);
  const fecha = p ? `${p[3]}-${p[2].padStart(2, "0")}-${p[1].padStart(2, "0")}` : `${vuosi - 1}-12-01`;
  return esFechaISO(fecha) ? [{ titulo: otsikko, url, fecha: fecha as FechaISO }] : null;
}

// Suomen Pankki julkaisee viitekoron puolivuosittain tiedotteena, jonka osoite kertoo kauden.
async function viitekorko(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const osumat = [...html.matchAll(/releases\/\d{4}\/reference-rate-and-penalty-interest-rates-for-1-(january|july)--(?:30-june|31-december)-(\d{4})\//g)];
  if (!osumat.length) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of osumat) {
    const fecha = `${m[2]}-${m[1] === "january" ? "01" : "07"}-01`;
    if (!esFechaISO(fecha) || fecha <= "2026-07-01" || hallazgos.some((h) => h.fecha === fecha)) continue;
    hallazgos.push({ titulo: `Viitekorko ja viivästyskorot ${fecha} alkaen`, url: `https://www.suomenpankki.fi/en/news-and-topical/press-releases-and-news/${m[0]}`, fecha });
  }
  return hallazgos;
}

// Eläketurvakeskus julkaisee seuraavan vuoden TyEL-maksut sivulla tyoelakemaksut-vuonna-<vuosi>.
async function tyelMaksut(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const vuodet = [...html.matchAll(/ajankohtaista\/tyoelakemaksut-vuonna-(\d{4})\//g)].map((m) => Number(m[1]));
  if (!vuodet.length) return null;
  return [...new Set(vuodet)]
    .filter((v) => v > 2026)
    .map((v) => ({ titulo: `Työeläkemaksut vuonna ${v}`, url: `https://www.etk.fi/ajankohtaista/tyoelakemaksut-vuonna-${v}/`, fecha: `${v}-01-01` as FechaISO }));
}

const PAATOKSET = "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/";

export const detectores: readonly Detector[] = [
  {
    id: "fi.khi-tilastokeskus",
    carril: "serie",
    serie: "fi.khi",
    metodo: "api-json",
    url: KHI,
    banda: { min: 140, max: 200, saltoRelativoMax: 0.03 },
    traer(http) {
      return khi(http, this.url);
    },
  },
  {
    id: "fi.vero-kuntien-veroprosentit",
    carril: "norma",
    datos: ["fi.kunnallisvero", "fi.kirkollisvero-evl", "fi.kirkollisvero-ort"],
    metodo: "html",
    url: `${PAATOKSET}47465/`,
    traer(http) {
      return veroPaatos(http, this.url, 2026);
    },
  },
  {
    id: "fi.vero-ennakonpidatyksen-perusteet",
    carril: "norma",
    datos: [
      "fi.palkansaajan-maksut",
      "fi.paivarahamaksun-tuloraja",
      "fi.tulonhankkimisvahennys",
      "fi.perusvahennys",
      "fi.perusvahennys-pienennys",
      "fi.tyotulovahennys",
      "fi.tyotulovahennys-prosentit",
      "fi.yle-vero",
      "fi.yle-veron-tuloraja",
      "fi.yle-veron-enimmaismaara",
      "fi.paaomatulovero",
      "fi.valtion-tuloveroasteikko",
    ],
    metodo: "html",
    url: `${PAATOKSET}47363/`,
    traer(http) {
      return veroPaatos(http, this.url, 2026);
    },
  },
  {
    id: "fi.vero-matkakustannukset",
    carril: "norma",
    datos: ["fi.kilometrikorvaus", "fi.paivarahat"],
    metodo: "html",
    url: `${PAATOKSET}47405/`,
    traer(http) {
      return veroPaatos(http, this.url, 2027);
    },
  },
  {
    id: "fi.suomenpankki-viitekorko",
    carril: "norma",
    datos: ["fi.viitekorko"],
    metodo: "html",
    url: "https://www.suomenpankki.fi/en/news-and-topical/press-releases-and-news/",
    traer(http) {
      return viitekorko(http, this.url);
    },
  },
  {
    id: "fi.etk-tyel-maksut",
    carril: "norma",
    datos: ["fi.tyel-tyonantaja", "fi.palkansaajan-maksut"],
    metodo: "html",
    url: "https://www.etk.fi/ajankohtaista/",
    traer(http) {
      return tyelMaksut(http, this.url);
    },
  },
];
