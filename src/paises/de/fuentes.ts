import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const FEED_BGBL = "https://www.gesetze-im-internet.de/aktuDienst-rss-feed.xml";
const MONATE: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function fechaRss(pub: string): FechaISO | null {
  const m = /(\d{1,2}) (\w{3}) (\d{4})/.exec(pub);
  if (!m || !MONATE[m[2]]) return null;
  const f = `${m[3]}-${MONATE[m[2]]}-${m[1].padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

// Der Aktualitätendienst listet jede im Bundesgesetzblatt Teil I verkündete Vorschrift. Fehlen die
// <item>-Elemente ganz, hat sich das Format geändert: dann null statt einer leeren Liste.
async function bgblTreffer(http: Http, muster: RegExp): Promise<HallazgoNorma[] | null> {
  const xml = await http.texto(FEED_BGBL);
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  if (items.length === 0) return null;
  const treffer: HallazgoNorma[] = [];
  for (const [, item] of items) {
    const beschreibung = /<description>([\s\S]*?)<\/description>/.exec(item)?.[1] ?? "";
    const url = /<link>([\s\S]*?)<\/link>/.exec(item)?.[1]?.trim() ?? "";
    const fecha = fechaRss(/<pubDate>([\s\S]*?)<\/pubDate>/.exec(item)?.[1] ?? "");
    if (!fecha || !url.startsWith("https://") || !muster.test(beschreibung)) continue;
    treffer.push({ titulo: beschreibung.trim(), url, fecha });
  }
  return treffer;
}

const VPI_URL = "https://api.statistiken.bundesbank.de/rest/data/BBDP1/M.DE.N.VPI.C.A00000.I20.A?format=csv&lang=de&lastNObservations=24";

export const detectores: readonly Detector[] = [
  {
    id: "de.vpi-bundesbank",
    carril: "serie",
    serie: "de.vpi",
    metodo: "api-json",
    url: VPI_URL,
    banda: { min: 100, max: 170, saltoRelativoMax: 0.03 },
    async traer(http) {
      const csv = await http.texto(this.url, { encabezados: { Accept: "text/csv" } });
      const puntos: PuntoSerie[] = [];
      for (const linea of csv.split(/\r?\n/)) {
        const m = /^(\d{4})-(\d{2});(\d+),(\d+);/.exec(linea);
        if (!m) continue;
        const fecha = `${m[1]}-${m[2]}-01`;
        if (!esFechaISO(fecha)) return null;
        puntos.push({ fecha, valor: Number(`${m[3]}.${m[4]}`) });
      }
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "de.bgbl-steuern",
    carril: "norma",
    datos: ["de.est-tarif", "de.soli-freigrenze", "de.kinderfreibetrag", "de.kindergeld", "de.arbeitnehmer-pauschbetrag", "de.entfernungspauschale", "de.mwst-regelsatz", "de.mwst-ermaessigt", "de.lohnsteuer-grenzen", "de.sparer-pauschbetrag", "de.kleinunternehmer-grenzen"],
    metodo: "html",
    url: FEED_BGBL,
    async traer(http) {
      return bgblTreffer(http, /Einkommensteuer|Steuerfortentwicklung|Jahressteuergesetz|Umsatzsteuer|Solidarit|Kindergeld|Steueränderung/i);
    },
  },
  {
    id: "de.bgbl-sozialversicherung",
    carril: "norma",
    datos: ["de.bbg-kv", "de.bbg-rv", "de.durchschnittsentgelt", "de.rv-beitragssatz", "de.pv-beitragssatz", "de.av-beitragssatz", "de.kv-allgemein", "de.rentenwert", "de.minijob-kv-pauschale"],
    metodo: "html",
    url: FEED_BGBL,
    async traer(http) {
      return bgblTreffer(http, /Rechengr|Beitragssatz|Rentenwert|Pflegeversicherung|Krankenversicherung|Sozialgesetzbuch|Rentenversicherung/i);
    },
  },
  {
    id: "de.bgbl-arbeit",
    carril: "norma",
    datos: ["de.mindestlohn", "de.uebergangsbereich-obergrenze", "de.elterngeld-betraege", "de.elterngeld-einkommensgrenze", "de.mindesturlaub", "de.kuendigungsfristen"],
    metodo: "html",
    url: FEED_BGBL,
    async traer(http) {
      return bgblTreffer(http, /Mindestlohn|Elterngeld|Urlaub|Kündigung|Geringfügig/i);
    },
  },
];
