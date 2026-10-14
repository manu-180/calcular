import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BGBL_LISTE = "https://www.oesterreich.gv.at/de/Gesetzliche-Neuerungen/Bundesgesetzblatt";
const VPI_CSV = "https://data.statistik.gv.at/data/OGD_vpi00_VPI_2000_1.csv";

function ohneTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#xa0;/g, " ").replace(/\s+/g, " ").trim();
}

// oesterreich.gv.at listet jedes neue Bundesgesetzblatt als <li>TT.MM.JJJJ – <a>Titel</a><br/>Beschreibung</li>.
// Findet sich kein einziger Eintrag, hat sich das Format geändert: dann null statt einer leeren Liste.
async function bgblTreffer(http: Http, muster: RegExp): Promise<HallazgoNorma[] | null> {
  const html = await http.texto(BGBL_LISTE);
  const eintraege = [...html.matchAll(/<li>\s*(\d{2})\.(\d{2})\.(\d{4})[\s\S]*?href="(\/de\/Gesetzliche-Neuerungen\/Bundesgesetzblatt\/[^"]+)"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)<\/li>/g)];
  if (eintraege.length === 0) return null;
  const treffer: HallazgoNorma[] = [];
  for (const [, t, m, j, pfad, titel, beschreibung] of eintraege) {
    const fecha = `${j}-${m}-${t}`;
    const text = `${ohneTags(titel)} ${ohneTags(beschreibung)}`;
    if (!esFechaISO(fecha) || !muster.test(text)) continue;
    treffer.push({ titulo: ohneTags(titel), url: `https://www.oesterreich.gv.at${pfad}`, fecha });
  }
  return treffer;
}

export const detectores: readonly Detector[] = [
  {
    id: "at.vpi-statistik-austria",
    carril: "serie",
    serie: "at.vpi",
    metodo: "api-json",
    url: VPI_CSV,
    banda: { min: 150, max: 260, saltoRelativoMax: 0.03 },
    async traer(http) {
      const csv = await http.texto(this.url);
      const puntos: PuntoSerie[] = [];
      for (const linea of csv.split(/\r?\n/)) {
        const m = /^VPIZR-(\d{4})(\d{2});VPI-0;(\d+),(\d+);/.exec(linea);
        if (!m) continue;
        const fecha = `${m[1]}-${m[2]}-01`;
        if (!esFechaISO(fecha)) return null;
        puntos.push({ fecha, valor: Number(`${m[3]}.${m[4]}`) });
      }
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "at.bgbl-steuern",
    carril: "norma",
    datos: ["at.est-tarif", "at.verkehrsabsetzbetrag", "at.vab-zuschlag", "at.avab", "at.familienbonus", "at.pendlerpauschale", "at.pendlereuro", "at.sonderzahlung-freigrenze", "at.ueberstunden-steuerfrei", "at.ust", "at.kest", "at.immoest", "at.kleinunternehmer", "at.grunderwerbsteuer", "at.grest-stufentarif", "at.kinderabsetzbetrag", "at.lohnnebenkosten"],
    metodo: "html",
    url: BGBL_LISTE,
    async traer(http) {
      return bgblTreffer(http, /Einkommensteuer|Umsatzsteuer|Budgetbegleit|Abgabenänderung|Grunderwerbsteuer|Familienlastenausgleich|Kommunalsteuer|Steuerreform/i);
    },
  },
  {
    id: "at.bgbl-sozialversicherung",
    carril: "norma",
    datos: ["at.sv-dienstnehmer", "at.sv-dienstgeber", "at.av-staffel", "at.beitragsgrundlage", "at.arbeitslosengeld", "at.alg-werte", "at.familienbeihilfe", "at.geschwisterstaffel", "at.familienbeihilfe-zuschlaege"],
    metodo: "html",
    url: BGBL_LISTE,
    async traer(http) {
      return bgblTreffer(http, /Sozialversicherung|ASVG|Arbeitslosenversicherung|Arbeitsmarktpolitik|Familienbeihilfe|Familienlastenausgleich|Budgetbegleit/i);
    },
  },
  {
    id: "at.bgbl-arbeitsrecht",
    carril: "norma",
    datos: ["at.ueberstundenzuschlag", "at.urlaub", "at.kuendigungsfristen", "at.abfertigung-alt", "at.abfertigung-steuer", "at.grundbuch"],
    metodo: "html",
    url: BGBL_LISTE,
    async traer(http) {
      return bgblTreffer(http, /Arbeitszeit|Urlaub|Angestellten|bürgerliches Gesetzbuch|Arbeitsvertragsrecht|Mitarbeitervorsorge|Gerichtsgebühren|Grundbuch/i);
    },
  },
];
