import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const SNB_LIK = "https://data.snb.ch/api/cube/plkopr/data/csv/de";
const SNB_ZINS = "https://data.snb.ch/api/cube/snbgwdzid/data/csv/de";
const SPARQL = "https://fedlex.data.admin.ch/sparqlendpoint";
const BWO = "https://www.bwo.admin.ch/de/referenzzinssatz";

// Die CSV-Würfel der SNB haben Zeilen "Datum";"Reihe";"Wert". Fehlt die Kopfzeile, hat sich das
// Format geändert: dann null statt einer leeren Liste.
async function snbReihe(http: Http, url: string, reihe: string, monatlich: boolean): Promise<PuntoSerie[] | null> {
  const csv = await http.texto(url);
  if (!csv.includes('"Date";"D0";"Value"')) return null;
  const puntos: PuntoSerie[] = [];
  for (const linea of csv.split(/\r?\n/)) {
    const m = /^"(\d{4}-\d{2}(?:-\d{2})?)";"([^"]+)";"(-?\d+(?:\.\d+)?)"$/.exec(linea);
    if (!m || m[2] !== reihe) continue;
    const fecha = monatlich ? `${m[1]}-01` : m[1];
    if (!esFechaISO(fecha)) return null;
    // series.json führt den LIK mit einer Dezimale wie die Mitteilungen des BFS; sonst springt die Reihe.
    puntos.push({ fecha, valor: monatlich ? Math.round(Number(m[3]) * 10) / 10 : Number(m[3]) });
  }
  return puntos.length ? puntos.slice(-60) : null;
}

// Neue konsolidierte Fassungen eines Erlasses auf Fedlex. Jede Fassung mit Anwendungsdatum nach
// dem letzten geprüften Stand ist ein Hinweis, die Werte neu zu lesen.
const ERLASSE: readonly { eli: string; name: string; geprueft: FechaISO }[] = [
  { eli: "cc/63/837_843_843", name: "AHVG", geprueft: "2027-01-01" },
  { eli: "cc/1983/797_797_797", name: "BVG", geprueft: "2027-09-26" },
  { eli: "cc/1984/543_543_543", name: "BVV 2", geprueft: "2026-08-01" },
  { eli: "cc/1991/1184_1184_1184", name: "DBG", geprueft: "2027-01-01" },
  { eli: "cc/2009/615", name: "MWSTG", geprueft: "2025-03-31" },
  { eli: "cc/1982/2184_2184_2184", name: "AVIG", geprueft: "2026-01-01" },
  { eli: "cc/1983/38_38_38", name: "UVV", geprueft: "2027-01-01" },
  { eli: "cc/1952/1021_1046_1050", name: "EOG", geprueft: "2027-07-01" },
  { eli: "cc/2008/51", name: "FamZG", geprueft: "2026-01-01" },
];

function abfrage(eli: string): string {
  const q = `PREFIX jolux: <http://data.legilux.public.lu/resource/ontology/jolux#>
SELECT ?date WHERE { ?c jolux:isMemberOf <https://fedlex.data.admin.ch/eli/${eli}> . ?c jolux:dateApplicability ?date . } ORDER BY DESC(?date) LIMIT 3`;
  return `${SPARQL}?query=${encodeURIComponent(q)}`;
}

// Fedlex führt auch Fassungen für Übergangsbestimmungen mit Daten Jahrzehnte voraus. Nur was innert
// rund eines Jahres gilt, ist ein Hinweis zum Nachlesen; der Rest wäre Lärm im Entwurfs-PR.
function horizont(): string {
  return new Date(Date.now() + 400 * 86400000).toISOString().slice(0, 10);
}

async function neueFassungen(http: Http, namen: readonly string[]): Promise<HallazgoNorma[] | null> {
  const treffer: HallazgoNorma[] = [];
  const bis = horizont();
  for (const e of ERLASSE.filter((x) => namen.includes(x.name))) {
    const json = (await http.json(abfrage(e.eli), { encabezados: { Accept: "application/sparql-results+json" } })) as {
      results?: { bindings?: { date?: { value?: string } }[] };
    };
    const filas = json?.results?.bindings;
    if (!Array.isArray(filas)) return null;
    for (const f of filas) {
      const fecha = f.date?.value?.slice(0, 10) ?? "";
      if (esFechaISO(fecha) && fecha > e.geprueft && fecha <= bis) treffer.push({ titulo: `${e.name}: neue Fassung ab ${fecha}`, url: `https://www.fedlex.admin.ch/eli/${e.eli}/de`, fecha });
    }
  }
  return treffer;
}

export const detectores: readonly Detector[] = [
  {
    id: "ch.lik-snb",
    carril: "serie",
    serie: "ch.lik",
    metodo: "api-json",
    url: SNB_LIK,
    banda: { min: 90, max: 115, saltoRelativoMax: 0.02 },
    async traer(http) {
      return snbReihe(http, this.url, "LD2010100", true);
    },
  },
  {
    id: "ch.leitzins-snb",
    carril: "serie",
    serie: "ch.leitzins",
    metodo: "api-json",
    url: SNB_ZINS,
    banda: { min: -1.5, max: 3, saltoRelativoMax: 10 },
    async traer(http) {
      return snbReihe(http, this.url, "LZ", false);
    },
  },
  {
    id: "ch.saron-snb",
    carril: "serie",
    serie: "ch.saron",
    metodo: "api-json",
    url: SNB_ZINS,
    banda: { min: -1.5, max: 3, saltoRelativoMax: 10 },
    async traer(http) {
      return snbReihe(http, this.url, "SARON", false);
    },
  },
  {
    id: "ch.fedlex-sozialversicherung",
    carril: "norma",
    datos: [
      "ch.ahv-minimalrente", "ch.bvg-eintrittsschwelle", "ch.bvg-koordinationsabzug", "ch.bvg-obere-grenze", "ch.bvg-min-koordinierter-lohn",
      "ch.bvg-mindestzins", "ch.bvg-umwandlungssatz", "ch.alv-beitragssatz", "ch.hoechster-versicherter-verdienst", "ch.alv-schwelle-volles-taggeld",
      "ch.eo-hoechstbetrag-taggeld", "ch.kinderzulage", "ch.ausbildungszulage",
    ],
    metodo: "api-json",
    url: SPARQL,
    async traer(http) {
      return neueFassungen(http, ["AHVG", "BVG", "BVV 2", "AVIG", "UVV", "EOG", "FamZG"]);
    },
  },
  {
    id: "ch.fedlex-steuern",
    carril: "norma",
    datos: ["ch.dbst-tarif-alleinstehend", "ch.dbst-tarif-verheiratet", "ch.dbst-kinderermaessigung", "ch.mwst-normalsatz", "ch.mwst-reduziert", "ch.mwst-beherbergung"],
    metodo: "api-json",
    url: SPARQL,
    async traer(http) {
      return neueFassungen(http, ["DBG", "MWSTG"]);
    },
  },
  {
    id: "ch.bwo-referenzzinssatz",
    carril: "norma",
    datos: ["ch.referenzzinssatz"],
    metodo: "html",
    url: BWO,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const m = /Referenzzinssatz[^%]{0,200}?(\d,\d{1,2})\s*%/i.exec(html.replace(/<[^>]+>/g, " "));
      if (!m) return null;
      if (m[1] === "1,25") return [];
      return [{ titulo: `Referenzzinssatz neu ${m[1]} %`, url: this.url, fecha: new Date().toISOString().slice(0, 10) as FechaISO }];
    },
  },
];
