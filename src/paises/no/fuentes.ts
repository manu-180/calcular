import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const NESTE_AR = "2027";

// Norges Bank publiserer SEK og DKK per 100 enheter (UNIT_MULT = 2): vi deler, så serien er per 1 enhet.
async function kursNorgesBank(http: Http, url: string, kode: string): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(url);
  const linjer = csv.trim().split(/\r?\n/);
  const hode = linjer[0]?.split(";") ?? [];
  const iBase = hode.indexOf("BASE_CUR");
  const iMult = hode.indexOf("UNIT_MULT");
  const iDato = hode.indexOf("TIME_PERIOD");
  const iVerdi = hode.indexOf("OBS_VALUE");
  if (iBase < 0 || iMult < 0 || iDato < 0 || iVerdi < 0) return null;
  const punkter: PuntoSerie[] = [];
  for (const linje of linjer.slice(1)) {
    const k = linje.split(";");
    if (k[iBase] !== kode) return null;
    const verdi = Number(k[iVerdi]);
    const mult = Number(k[iMult]);
    if (!esFechaISO(k[iDato]) || !Number.isFinite(verdi) || !Number.isInteger(mult)) return null;
    punkter.push({ fecha: k[iDato] as FechaISO, valor: Math.round((verdi / 10 ** mult) * 1e6) / 1e6 });
  }
  return punkter.length ? punkter : null;
}

function detectorKurs(kode: string, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `no.${kode.toLowerCase()}-norges-bank`,
    carril: "serie",
    serie: `no.${kode.toLowerCase()}`,
    metodo: "api-json",
    url: `https://data.norges-bank.no/api/data/EXR/B.${kode}.NOK.SP?format=csv&lastNObservations=20&locale=en`,
    banda,
    traer(http) {
      return kursNorgesBank(http, this.url, kode);
    },
  };
}

// SSB tabell 14700 i JSON-stat2: tidsdimensjonen gir månedene (2026M09) og value indeksen i samme rekkefølge.
async function kpiSsb(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { value?: unknown; dimension?: { Tid?: { category?: { index?: unknown } } } };
  const indeks = json?.dimension?.Tid?.category?.index;
  if (!Array.isArray(json?.value) || !indeks || typeof indeks !== "object") return null;
  const maneder = Array.isArray(indeks) ? (indeks as string[]) : Object.keys(indeks as Record<string, number>).sort((a, b) => (indeks as Record<string, number>)[a] - (indeks as Record<string, number>)[b]);
  if (maneder.length !== json.value.length) return null;
  const punkter: PuntoSerie[] = [];
  for (let i = 0; i < maneder.length; i++) {
    const m = /^(\d{4})M(\d{2})$/.exec(maneder[i]);
    const v = (json.value as unknown[])[i];
    if (!m) return null;
    if (v === null) continue;
    const fecha = `${m[1]}-${m[2]}-01`;
    if (!esFechaISO(fecha) || typeof v !== "number" || !Number.isFinite(v)) return null;
    punkter.push({ fecha, valor: v });
  }
  return punkter.length ? punkter : null;
}

// Forsinkelsesrenten følger styringsrenten per 1. januar og 1. juli (forsinkelsesrenteloven § 3): en ny
// styringsrente betyr at satsen kan endres ved neste halvår.
async function styringsrente(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const csv = await http.texto(url);
  const linjer = csv.trim().split(/\r?\n/);
  const hode = linjer[0]?.split(";") ?? [];
  const iDato = hode.indexOf("TIME_PERIOD");
  const iVerdi = hode.indexOf("OBS_VALUE");
  const siste = linjer.at(-1)?.split(";");
  if (iDato < 0 || iVerdi < 0 || !siste) return null;
  const verdi = Number(siste[iVerdi]);
  if (!esFechaISO(siste[iDato]) || !Number.isFinite(verdi)) return null;
  if (verdi === 4.5) return [];
  return [{ titulo: `Ny styringsrente fra Norges Bank: ${verdi} %`, url: "https://www.norges-bank.no/tema/pengepolitikk/Styringsrenten/", fecha: siste[iDato] as FechaISO }];
}

// Skatteetatens satssider har en årsvelger: når neste år dukker opp der, er satsene for det året publisert.
async function nyttArPaSatsside(http: Http, url: string, tema: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!html.includes('"2026"')) return null;
  if (!html.includes(`"${NESTE_AR}"`)) return [];
  return [{ titulo: `Skatteetaten har publisert satser for ${NESTE_AR}: ${tema}`, url, fecha: VERIFICADO }];
}

async function nyttGrunnbelop(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  // Nav bruker hardt mellomrom (U+00A0) mellom ordene og i beløpet.
  const m = /Grunnbeløpet\s\(G\)\sper\s1\.\smai\s(\d{4})\ser\s(\d{3}\s\d{3})\skroner/u.exec(html);
  if (!m) return null;
  if (m[1] <= "2026") return [];
  return [{ titulo: `Nytt grunnbeløp fra 1. mai ${m[1]}: ${m[2].trim()} kroner`, url, fecha: `${m[1]}-05-01` as FechaISO }];
}

async function nyeSatserNav(http: Http, url: string, kjent: string, tema: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = /Fra 1\. (\p{L}+) (\d{4}) er det disse satsene/u.exec(html);
  if (!m) return null;
  if (`${m[1]} ${m[2]}` === kjent) return [];
  return [{ titulo: `Nav har nye satser for ${tema} fra 1. ${m[1]} ${m[2]}`, url, fecha: VERIFICADO }];
}

function satsside(id: string, sti: string, tema: string, datos: readonly string[]): Detector {
  return {
    id: `no.skatteetaten-${id}`,
    carril: "norma",
    datos,
    metodo: "html",
    url: `https://www.skatteetaten.no/satser/${sti}/`,
    traer(http) {
      return nyttArPaSatsside(http, this.url, tema);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKurs("EUR", { min: 9, max: 14, saltoRelativoMax: 0.05 }),
  detectorKurs("USD", { min: 7.5, max: 13, saltoRelativoMax: 0.06 }),
  detectorKurs("SEK", { min: 0.75, max: 1.25, saltoRelativoMax: 0.05 }),
  detectorKurs("DKK", { min: 1.2, max: 1.9, saltoRelativoMax: 0.05 }),
  detectorKurs("GBP", { min: 10.5, max: 16, saltoRelativoMax: 0.06 }),
  {
    id: "no.kpi-ssb",
    carril: "serie",
    serie: "no.kpi",
    metodo: "api-json",
    url: "https://data.ssb.no/api/pxwebapi/v2/tables/14700/data?lang=no&valueCodes%5BVareTjenesteGrp%5D=00&valueCodes%5BContentsCode%5D=KpiIndMnd&valueCodes%5BTid%5D=*&outputFormat=json-stat2",
    banda: { min: 40, max: 130, saltoRelativoMax: 0.03 },
    traer(http) {
      return kpiSsb(http, this.url);
    },
  },
  {
    id: "no.styringsrente-norges-bank",
    carril: "norma",
    datos: ["no.forsinkelsesrente"],
    metodo: "api-json",
    url: "https://data.norges-bank.no/api/data/IR/B.KPRA.SD.R?format=csv&lastNObservations=1&locale=en",
    traer(http) {
      return styringsrente(http, this.url);
    },
  },
  satsside("trinnskatt", "trinnskatt", "trinnskatt", ["no.trinnskatt"]),
  satsside("trygdeavgift", "trygdeavgift", "trygdeavgift", ["no.trygdeavgift", "no.trygdeavgift-nedre-grense", "no.trygdeavgift-opptrapping"]),
  satsside("minstefradrag", "minstefradrag", "minstefradrag", ["no.minstefradrag-sats", "no.minstefradrag-maks"]),
  satsside("personfradrag", "personfradrag", "personfradrag", ["no.personfradrag", "no.skatt-alminnelig-inntekt", "no.skatt-alminnelig-tiltakssonen", "no.fradrag-tiltakssonen"]),
  satsside("arbeidsgiveravgift", "arbeidsgiveravgift", "arbeidsgiveravgift", ["no.arbeidsgiveravgift", "no.fribelop-sone-1a"]),
  satsside("formuesskatt", "formuesskatt", "formuesskatt", ["no.formuesskatt-kommune", "no.formuesskatt-stat", "no.formue-bunnfradrag", "no.formue-trinn2", "no.formue-verdsettelse", "no.formue-primaerbolig-grense", "no.oppjusteringsfaktor"]),
  {
    id: "no.nav-grunnbelop",
    carril: "norma",
    datos: ["no.grunnbelop"],
    metodo: "html",
    url: "https://www.nav.no/grunnbelopet",
    traer(http) {
      return nyttGrunnbelop(http, this.url);
    },
  },
  {
    id: "no.nav-barnetrygd",
    carril: "norma",
    datos: ["no.barnetrygd", "no.barnetrygd-tillegg"],
    metodo: "html",
    url: "https://www.nav.no/barnetrygd",
    traer(http) {
      return nyeSatserNav(http, this.url, "februar 2026", "barnetrygd");
    },
  },
];
