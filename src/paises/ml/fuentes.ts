import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BCEAO = "https://www.bceao.int/" as const;
const DGI_MEDIAS = "https://www.dgi.gouv.ml/wp-json/wp/v2/media?per_page=100&mime_type=application/pdf&_fields=date,source_url,title" as const;
const SGG_JO = "https://sgg-mali.ml/fr/journal-officiel/le-journal-officiel.html" as const;

const MOIS: Record<string, string> = {
  janvier: "01", "février": "02", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06",
  juillet: "07", "août": "08", aout: "08", septembre: "09", octobre: "10", novembre: "11", "décembre": "12", decembre: "12",
};

function dateFrancaise(jour: string, mois: string, annee: string): FechaISO | null {
  const m = MOIS[mois.toLowerCase()];
  if (!m) return null;
  const fecha = `${annee}-${m}-${jour.padStart(2, "0")}`;
  return esFechaISO(fecha) ? fecha : null;
}

const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

// La page d'accueil de la BCEAO affiche le tableau « Cours des devises du <jour> <date> » : on y
// prend le dollar US (achat et vente) et on garde la moyenne, comme dans series.json.
async function dollar(http: Http): Promise<PuntoSerie[] | null> {
  const page = (await http.texto(BCEAO, { userAgentNavegador: true })).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const date = /Cours des devises du \S+ (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  const cours = /Dollar us ([\d\s]+,\d+) ([\d\s]+,\d+)/i.exec(page);
  if (!date || !cours) return null;
  const fecha = dateFrancaise(date[1], date[2], date[3]);
  const achat = nombre(cours[1]);
  const vente = nombre(cours[2]);
  if (!fecha || !Number.isFinite(achat) || !Number.isFinite(vente)) return null;
  return [{ fecha, valor: Math.round(((achat + vente) / 2) * 1000) / 1000 }];
}

// La DGI publie sur son site WordPress les annexes fiscales, les lois de finances, les ordonnances
// modifiant le CGI et ses communiqués. L'API des médias liste les PDF avec leur date de mise en ligne.
const MOTS_FISCAUX = /annexe|loi.?de.?finances|ordonnance|cgi|code.?g[ée]n[ée]ral|instruction|circulaire|bar[eè]me/i;

async function documentsDgi(http: Http, depuis: FechaISO): Promise<HallazgoNorma[] | null> {
  const liste = await http.json(DGI_MEDIAS, { userAgentNavegador: true });
  if (!Array.isArray(liste)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of liste as { date?: unknown; source_url?: unknown; title?: { rendered?: unknown } }[]) {
    const fecha = typeof m.date === "string" ? m.date.slice(0, 10) : "";
    const url = typeof m.source_url === "string" ? m.source_url : "";
    const titulo = typeof m.title?.rendered === "string" ? m.title.rendered : url;
    if (!esFechaISO(fecha) || !url.startsWith("https://")) return null;
    if (fecha > depuis && MOTS_FISCAUX.test(`${titulo} ${url}`)) hallazgos.push({ titulo, url, fecha });
  }
  return hallazgos;
}

// Le SGG met en ligne chaque numéro du Journal officiel sous JO/<année>/mali-jo-<année>-<numéro>.pdf.
// On signale les numéros de l'année plus récents que le dernier lu lors de la vérification des données.
async function journauxOfficiels(http: Http, annee: number, dernierLu: number): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(SGG_JO, { userAgentNavegador: true });
  const numeros = [...page.matchAll(new RegExp(`JO/${annee}/mali-jo-${annee}-(\\d+)[^"']*\\.pdf`, "g"))];
  if (numeros.length === 0) return null;
  const aujourdhui = new Date().toISOString().slice(0, 10);
  if (!esFechaISO(aujourdhui)) return null;
  const vus = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const m of numeros) {
    if (Number(m[1]) <= dernierLu || vus.has(m[0])) continue;
    vus.add(m[0]);
    hallazgos.push({ titulo: `Journal officiel du Mali ${annee}, n° ${Number(m[1])}`, url: `https://sgg-mali.ml/${m[0]}`, fecha: aujourdhui });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "ml.bceao-dollar",
    carril: "serie",
    serie: "ml.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
  {
    id: "ml.dgi-documents",
    carril: "norma",
    datos: [
      "ml.its-bareme",
      "ml.its-reduction-famille",
      "ml.its-reduction-points",
      "ml.its-deduction-retraite",
      "ml.tva",
      "ml.taxes-salaires",
      "ml.irf-taux",
      "ml.impot-synthetique-taux",
      "ml.impot-synthetique-seuil",
      "ml.is-taux",
      "ml.minimum-forfaitaire",
      "ml.irvm-taux",
      "ml.retenue-non-residents-taux",
    ],
    metodo: "api-json",
    url: DGI_MEDIAS,
    userAgentNavegador: true,
    traer(http) {
      return documentsDgi(http, "2026-10-27");
    },
  },
  {
    id: "ml.sgg-journal-officiel",
    carril: "norma",
    datos: ["ml.smig", "ml.smig-horaire", "ml.amo-taux", "ml.preavis-mois", "ml.licenciement-taux", "ml.heures-sup-majorations", "ml.conges-jours-par-mois"],
    metodo: "html",
    url: SGG_JO,
    userAgentNavegador: true,
    traer(http) {
      return journauxOfficiels(http, 2026, 23);
    },
  },
];
