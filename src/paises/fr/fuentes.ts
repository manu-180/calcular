import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const ACTUALITES = "https://www.service-public.gouv.fr/particuliers/actualites";

const MOIS: Record<string, string> = {
  janvier: "01", "février": "02", mars: "03", avril: "04", mai: "05", juin: "06",
  juillet: "07", "août": "08", septembre: "09", octobre: "10", novembre: "11", "décembre": "12",
};

function dateFrancaise(texte: string): FechaISO | null {
  const m = /(\d{1,2})(?:er)?\s+([a-zéû]+)\s+(\d{4})/i.exec(texte);
  if (!m) return null;
  const mois = MOIS[m[2].toLowerCase()];
  if (!mois) return null;
  const fecha = `${m[3]}-${mois}-${m[1].padStart(2, "0")}`;
  return esFechaISO(fecha) ? fecha : null;
}

// La page des actualités de Service-Public.fr est rendue côté serveur : chaque carte a un lien
// /particuliers/actualites/A<numéro> suivi de « Publié le <date> ». Si cette forme disparaît, on
// renvoie null pour signaler une source cassée plutôt qu'une liste vide trompeuse.
async function actualites(http: Http, filtre: RegExp): Promise<HallazgoNorma[] | null> {
  const html = await http.texto(ACTUALITES, { userAgentNavegador: true });
  const re = /href="(https:\/\/www\.service-public\.gouv\.fr\/particuliers\/actualites\/A\d+)"[^>]*>([^<]+)<\/a>[\s\S]{0,400}?Publi\S+ le ([^<]+)</g;
  const hallazgos: HallazgoNorma[] = [];
  let vus = 0;
  for (const m of html.matchAll(re)) {
    vus++;
    const titulo = m[2].replace(/\s+/g, " ").trim();
    const fecha = dateFrancaise(m[3]);
    if (fecha && filtre.test(titulo)) hallazgos.push({ titulo, url: m[1], fecha });
  }
  return vus === 0 ? null : hallazgos;
}

function veille(id: string, datos: readonly string[], filtre: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: ACTUALITES,
    userAgentNavegador: true,
    traer(http) {
      return actualites(http, filtre);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "fr.ipc-insee",
    carril: "serie",
    serie: "fr.ipc",
    metodo: "api-xml",
    url: "https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/011814630?lastNObservations=13",
    banda: { min: 90, max: 130, saltoRelativoMax: 0.03 },
    async traer(http) {
      const xml = await http.texto(this.url);
      const puntos: PuntoSerie[] = [];
      for (const m of xml.matchAll(/<Obs\b[^>]*>/g)) {
        const periode = /TIME_PERIOD="(\d{4}-\d{2})"/.exec(m[0])?.[1];
        const valeur = Number(/OBS_VALUE="([0-9.]+)"/.exec(m[0])?.[1]);
        const fecha = `${periode}-01`;
        if (!periode || !esFechaISO(fecha) || !Number.isFinite(valeur)) return null;
        puntos.push({ fecha, valor: valeur });
      }
      if (puntos.length === 0) return null;
      return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    },
  },
  veille("fr.veille-smic", ["fr.smic-horaire", "fr.smic-mensuel", "fr.ij-maximum"], /smic|salaire minimum/i),
  veille(
    "fr.veille-impot-revenu",
    [
      "fr.bareme-ir", "fr.plafond-demi-part", "fr.plafond-parent-isole", "fr.decote-forfait-seul", "fr.decote-forfait-couple",
      "fr.decote-seuil-seul", "fr.decote-seuil-couple", "fr.abattement-frais-min", "fr.abattement-frais-max", "fr.pas-grille-metropole",
      "fr.bk-jusqua-5000", "fr.bk-5001-20000-coef", "fr.bk-5001-20000-fixe", "fr.bk-plus-20000",
    ],
    /imp[ôo]t sur le revenu|pr[ée]l[èe]vement [àa] la source|bar[èe]me kilom[ée]trique|loi de finances/i,
  ),
  veille(
    "fr.veille-cotisations",
    [
      "fr.pmss", "fr.pass", "fr.vieillesse-plafonnee", "fr.vieillesse-deplafonnee", "fr.csg-deductible", "fr.csg-non-deductible",
      "fr.crds", "fr.agirc-arrco-t1", "fr.agirc-arrco-t2", "fr.ceg-t1", "fr.ceg-t2", "fr.cet", "fr.apec", "fr.micro-cotisations",
    ],
    /cotisation|plafond de la s[ée]curit[ée] sociale|CSG|Agirc|micro-entrepreneur|auto-entrepreneur/i,
  ),
  veille("fr.veille-epargne", ["fr.livret-a-taux", "fr.livret-a-plafond"], /livret A|[ée]pargne r[ée]glement[ée]e/i),
  veille(
    "fr.veille-prestations",
    ["fr.af-montant-1", "fr.af-montant-2", "fr.af-montant-3", "fr.af-plafond-1", "fr.af-plafond-2", "fr.are-partie-fixe", "fr.are-minimum"],
    /allocations? familiales?|prestations familiales|allocation ch[ôo]mage|assurance ch[ôo]mage|France Travail/i,
  ),
  veille(
    "fr.veille-travail",
    ["fr.hs-reduction-salariale", "fr.hs-exoneration-ir", "fr.cp-jours-par-mois", "fr.lic-diviseur-1", "fr.preavis-2-ans", "fr.cdd-indemnite-fin"],
    /heures suppl[ée]mentaires|cong[ée]s pay[ée]s|licenciement|rupture conventionnelle|pr[ée]avis|CDD/i,
  ),
  veille("fr.veille-tva", ["fr.tva-normal", "fr.tva-intermediaire", "fr.tva-reduit", "fr.tva-particulier"], /TVA/),
  veille(
    "fr.veille-successions",
    ["fr.droits-ligne-directe", "fr.abattement-ligne-directe", "fr.abattement-don-petit-enfant", "fr.abattement-don-epoux"],
    /succession|donation|h[ée]ritage/i,
  ),
];
