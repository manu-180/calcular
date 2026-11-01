import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const HNB = "https://api.hnb.hr/tecajn-eur/v3";
const EUROSTAT = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=HR&unit=I25&coicop18=TOTAL&sinceTimePeriod=2000-01";
const STOPE = "https://porezna-uprava.gov.hr/hr/porezne-stope-godisnjeg-poreza-na-dohodak/4764";
const NN = "https://narodne-novine.nn.hr/search.aspx?sortiraj=4&kategorija=1&rpp=200&qtype=1&pretraga=da";

interface RedHnb {
  datum_primjene?: unknown;
  srednji_tecaj?: unknown;
}

// HNB daje decimalni zarez u tekstu («1,117200») i tečaj znači koliko valute vrijedi jedan euro.
async function hnbTecaj(http: Http, valuta: string): Promise<readonly PuntoSerie[] | null> {
  const redovi = await http.json(`${HNB}?valuta=${valuta}`);
  if (!Array.isArray(redovi) || redovi.length === 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of redovi as RedHnb[]) {
    const fecha = String(r.datum_primjene);
    const valor = Number(String(r.srednji_tecaj).replace(",", "."));
    if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
    puntos.push({ fecha, valor });
  }
  return puntos;
}

function detectorTecaj(valuta: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `hr.${valuta.toLowerCase()}-hnb`,
    carril: "serie",
    serie: `hr.${valuta.toLowerCase()}`,
    metodo: "api-json",
    url: `https://api.hnb.hr/tecajn-eur/v3?valuta=${valuta}`,
    banda,
    traer(http) {
      return hnbTecaj(http, valuta);
    },
  };
}

// Eurostat objavljuje harmonizirani indeks u JSON-statu, s vremenom kao indeksom.
async function ipcEurostat(http: Http): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(EUROSTAT)) as {
    value?: Record<string, unknown>;
    dimension?: { time?: { category?: { index?: Record<string, number> } } };
  };
  const index = json?.dimension?.time?.category?.index;
  if (!index || !json.value) return null;
  const puntos: PuntoSerie[] = [];
  for (const [mjesec, poz] of Object.entries(index)) {
    const v = json.value[String(poz)];
    const fecha = `${mjesec}-01`;
    if (typeof v === "number" && esFechaISO(fecha)) puntos.push({ fecha, valor: v });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Porezna uprava stavlja novu tablicu na istu stranicu svake godine, s godinom u nazivu datoteke.
async function novaTablica(http: Http, poznata: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(STOPE);
  const godine = [...html.matchAll(/dohodak%20za%20(20\d{2})/g)].map((m) => Number(m[1]));
  if (!godine.length) return null;
  const najnovija = Math.max(...godine);
  if (najnovija <= poznata) return [];
  const fecha = new Date().toISOString().slice(0, 10) as FechaISO;
  return [{ titulo: `Porezna uprava: tablica stopa poreza na dohodak za ${najnovija}.`, url: STOPE, fecha }];
}

// Pretraga NN-a ne filtrira po naslovu, pa se najnoviji članci čitaju i traže po naslovu. Već poznati
// propisi izuzimaju se po oznaci članka.
async function noviPropisi(http: Http, naslov: RegExp, poznati: readonly string[]): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(NN);
  const veze = [...html.matchAll(/\/clanci\/sluzbeni\/(\d{4})_(\d{2})_(\d+)_(\d+)\.html/g)];
  if (!veze.length) return null;
  const nalazi = new Map<string, HallazgoNorma>();
  for (const m of veze) {
    const oznaka = `${m[1]}_${m[2]}_${m[3]}_${m[4]}`;
    if (poznati.includes(oznaka) || nalazi.has(oznaka)) continue;
    const tekst = html.slice(m.index, m.index + 900).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const t = naslov.exec(tekst);
    if (t) nalazi.set(oznaka, { titulo: t[0], url: `https://narodne-novine.nn.hr${m[0]}`, fecha: `${m[1]}-${m[2]}-01` as FechaISO });
  }
  return [...nalazi.values()];
}

function nn(id: string, datos: readonly string[], naslov: RegExp, poznati: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: "https://narodne-novine.nn.hr/search.aspx?sortiraj=4&kategorija=1&rpp=200&qtype=1&pretraga=da",
    traer(http) {
      return noviPropisi(http, naslov, poznati);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorTecaj("USD", { min: 0.8, max: 1.5, saltoRelativoMax: 0.05 }),
  detectorTecaj("GBP", { min: 0.65, max: 1.05, saltoRelativoMax: 0.05 }),
  detectorTecaj("CHF", { min: 0.75, max: 1.2, saltoRelativoMax: 0.05 }),
  detectorTecaj("BAM", { min: 1.9, max: 2.0, saltoRelativoMax: 0.01 }),
  detectorTecaj("PLN", { min: 3.5, max: 5.5, saltoRelativoMax: 0.05 }),
  detectorTecaj("HUF", { min: 280, max: 480, saltoRelativoMax: 0.06 }),
  detectorTecaj("CZK", { min: 20, max: 30, saltoRelativoMax: 0.05 }),
  {
    id: "hr.ipc-eurostat",
    carril: "serie",
    serie: "hr.ipc",
    metodo: "api-json",
    url: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=HR&unit=I25&coicop18=TOTAL&sinceTimePeriod=2000-01",
    banda: { min: 40, max: 180, saltoRelativoMax: 0.04 },
    traer(http) {
      return ipcEurostat(http);
    },
  },
  {
    id: "hr.stope-dohodak",
    carril: "norma",
    datos: ["hr.stopa-niza", "hr.stopa-visa"],
    metodo: "html",
    url: "https://porezna-uprava.gov.hr/hr/porezne-stope-godisnjeg-poreza-na-dohodak/4764",
    traer(http) {
      return novaTablica(http, 2026);
    },
  },
  nn("hr.nn-minimalna", ["hr.minimalna-placa"], /Uredba o visini minimalne plaće za 20\d{2}\. godinu/, ["2026_10_124_1481"]),
  nn("hr.nn-naredba", ["hr.najniza-osnovica", "hr.najvisa-osnovica", "hr.najvisa-godisnja", "hr.prosjek-naredba", "hr.osnovice-samostalni", "hr.pausal-doprinosi"], /Naredb\w+ o (?:izmjen\w+ )?(?:Naredbe o )?iznosima osnovica za obračun doprinosa[^.]{0,80}/, []),
  nn("hr.nn-porez", ["hr.osobni-odbitak", "hr.koeficijenti-odbitka", "hr.prag-godisnji", "hr.prag-mjesecni", "hr.umanjenje-mladi"], /Zakon o izmjenama[^.]{0,30} Zakona o porezu na dohodak/, []),
  nn("hr.nn-doprinosi", ["hr.mio-i", "hr.mio-ii", "hr.mio-samo-i", "hr.zdravstveno", "hr.umanjenje-iznos", "hr.umanjenje-donja", "hr.umanjenje-gornja"], /Zakon o izmjenama[^.]{0,30} Zakona o doprinosima/, []),
  nn("hr.nn-rad", ["hr.otkazni-rok", "hr.otkazni-dob", "hr.otpremnina-nazivnik", "hr.otpremnina-uvjet", "hr.otpremnina-najvise", "hr.odmor-tjedana", "hr.odmor-maloljetnik", "hr.prekovremeni-tjedno", "hr.prekovremeni-godisnje"], /Zakon o izmjenama[^.]{0,30} Zakona o radu/, []),
  nn("hr.nn-pravilnik", ["hr.prigodne-nagrade", "hr.dar-djetetu", "hr.nagrade-rezultati", "hr.prehrana", "hr.otpremnina-neoporezivo", "hr.otpremnina-mirovina", "hr.otpremnina-ozljeda"], /Pravilnik o izmjenama[^.]{0,30} Pravilnika o porezu na dohodak/, []),
  nn("hr.nn-pausal", ["hr.pausal-ljestvica", "hr.pausal-limit", "hr.pausal-stopa"], /Pravilnik[^.]{0,40} paušalnom oporezivanju djelatnosti[^.]{0,60}/, []),
  nn("hr.nn-pdv", ["hr.pdv"], /Zakon o izmjenama[^.]{0,30} Zakona o porezu na dodanu vrijednost/, []),
  nn("hr.nn-dobit", ["hr.porez-dobit-niza", "hr.porez-dobit-visa", "hr.porez-dobit-prag"], /Zakon o izmjenama[^.]{0,30} Zakona o porezu na dobit/, []),
  nn("hr.nn-promet", ["hr.porez-promet-nekretnina"], /Zakon o izmjenama[^.]{0,30} Zakona o porezu na promet nekretnina/, []),
  nn("hr.nn-zdravstvo", ["hr.bolovanje-stopa", "hr.bolovanje-stopa-nakon", "hr.bolovanje-dijete", "hr.bolovanje-najvise", "hr.bolovanje-najmanje", "hr.bolovanje-poslodavac-dani"], /Zakon o izmjenama[^.]{0,30} Zakona o obveznom zdravstvenom osiguranju/, []),
  nn("hr.nn-rodiljne", ["hr.rodiljna-stopa", "hr.rodiljna-najmanje", "hr.roditeljska-najvise", "hr.roditeljska-preostali"], /Zakon o izmjenama[^.]{0,30} Zakona o rodiljnim i roditeljskim potporama/, []),
];
