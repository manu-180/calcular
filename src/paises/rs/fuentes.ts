import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const NBS = "https://webappcenter.nbs.rs/ExchangeRateWebApp/ExchangeRate/CurrentMiddleRate";
const IPC = "https://opendata.stat.gov.rs/data/WcfJsonRestService.Service1.svc/dataset/03011101IND01/1/json";
const PURS_ZAKONI = "https://www.purs.gov.rs/pravna-lica/pregled-propisa/zakoni.html";

// NBS objavljuje samo današnju listu u HTML-u: datum u zaglavlju («... НА ДАН 30.10.2026.») i red tabele
// po valuti, sa oznakom u prvoj koloni, šifrom, zemljom, jedinicom i kursom u poslednjoj.
async function nbsKurs(http: Http, valuta: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(NBS);
  const d = /(\d{2})\.(\d{2})\.(\d{4})\./.exec(html);
  if (!d) return null;
  const fecha = `${d[3]}-${d[2]}-${d[1]}`;
  if (!esFechaISO(fecha)) return null;
  const celije = [...html.matchAll(/<td[^>]*>\s*([^<]*?)\s*<\/td>/g)].map((m) => m[1]);
  const i = celije.indexOf(valuta);
  if (i < 0) return null;
  const jedinica = Number(celije[i + 3]);
  const kurs = Number((celije[i + 4] ?? "").replace(",", "."));
  if (!jedinica || !Number.isFinite(kurs) || kurs <= 0) return null;
  return [{ fecha, valor: kurs / jedinica }];
}

function detectorKurs(valuta: string, banda: DetectorSerie["banda"]): Detector {
  const k = valuta.toLowerCase();
  return {
    id: `rs.${k}-nbs`,
    carril: "serie",
    serie: `rs.${k}`,
    metodo: "html",
    url: NBS,
    banda,
    traer(http) {
      return nbsKurs(http, valuta);
    },
  };
}

interface RedIpc {
  IDCOICOP2018?: unknown;
  god?: unknown;
  mes?: unknown;
  vrednost?: unknown;
}

// Otvoreni podaci RZS: svi COICOP razredi od 2011, a ukupan indeks je razred «0».
async function rzsIpc(http: Http): Promise<readonly PuntoSerie[] | null> {
  const redovi = await http.json(IPC);
  if (!Array.isArray(redovi)) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of redovi as RedIpc[]) {
    if (r.IDCOICOP2018 !== "0" || typeof r.vrednost !== "number") continue;
    const fecha = `${String(r.god)}-${String(r.mes)}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: r.vrednost });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Poreska uprava pri svakoj izmeni zakona dodaje novu stranicu sa većim brojem u adresi. Veći broj od
// poznatog znači novi tekst. Datum izmene stranica ne daje, pa se beleži dan otkrivanja.
async function noviZakon(http: Http, putanja: string, naziv: string, poznat: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(PURS_ZAKONI);
  const re = new RegExp(`/zakoni/(\\d+)/${putanja}\\.html`, "g");
  const brojevi = [...html.matchAll(re)].map((m) => Number(m[1]));
  if (!brojevi.length) return null;
  const najveci = Math.max(...brojevi);
  if (najveci <= poznat) return [];
  const fecha = new Date().toISOString().slice(0, 10) as FechaISO;
  return [{ titulo: `${naziv}: nov tekst na sajtu Poreske uprave`, url: `https://www.purs.gov.rs/pravna-lica/pregled-propisa/zakoni/${najveci}/${putanja}.html`, fecha }];
}

function purs(id: string, putanja: string, naziv: string, poznat: number, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: PURS_ZAKONI,
    traer(http) {
      return noviZakon(http, putanja, naziv, poznat);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKurs("EUR", { min: 105, max: 130, saltoRelativoMax: 0.03 }),
  detectorKurs("USD", { min: 80, max: 130, saltoRelativoMax: 0.06 }),
  detectorKurs("CHF", { min: 100, max: 160, saltoRelativoMax: 0.06 }),
  detectorKurs("GBP", { min: 110, max: 170, saltoRelativoMax: 0.06 }),
  {
    id: "rs.ipc-rzs",
    carril: "serie",
    serie: "rs.ipc",
    metodo: "api-json",
    url: IPC,
    banda: { min: 95, max: 130, saltoRelativoMax: 0.03 },
    traer(http) {
      return rzsIpc(http);
    },
  },
  purs("rs.purs-zpdg", "zakon-o-porezu-na-dohodak-gradjana", "Zakon o porezu na dohodak građana", 9941, [
    "rs.porez-na-zarade",
    "rs.neoporezivi-iznos",
    "rs.porez-samostalna-delatnost",
    "rs.pausal-limit-prometa",
  ]),
  purs("rs.purs-doprinosi", "zakon-o-doprinosima-za-obavezno-socijalno-osiguranje", "Zakon o doprinosima za obavezno socijalno osiguranje", 9461, [
    "rs.pio-zaposleni",
    "rs.pio-poslodavac",
    "rs.zdravstvo",
    "rs.nezaposlenost",
    "rs.pio-samostalni",
    "rs.zdravstvo-samostalni",
    "rs.najniza-osnovica",
    "rs.najvisa-osnovica",
  ]),
];
