import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BCEAO = "https://www.bceao.int/" as const;
const DGI_LOIS = "https://dgi.bf/lois/" as const;
const CNSS_COTISATIONS = "https://cnssbf.org/cotisations-sociales/" as const;
const SIG_RECHERCHE = "https://gouvernement.gov.bf/wp-json/wp/v2/posts" as const;

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

function aujourdhui(): FechaISO | null {
  const jour = new Date().toISOString().slice(0, 10);
  return esFechaISO(jour) ? jour : null;
}

const texteBrut = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ");
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

const DATOS_FISCAUX = [
  "bf.iuts-bareme",
  "bf.iuts-charges-famille",
  "bf.iuts-abattement",
  "bf.iuts-plafond-pension",
  "bf.iuts-indemnites-taux",
  "bf.iuts-indemnites-plafond",
  "bf.tpa-taux",
  "bf.tpa-abattement-cga",
  "bf.tva-normal",
  "bf.tva-reduit",
  "bf.is-taux",
  "bf.mfp-taux",
  "bf.mfp-minimum",
  "bf.mfp-reduction-cga",
  "bf.bic-bareme",
  "bf.bic-reduction-cga",
  "bf.irf-abattement",
  "bf.irf-bareme",
  "bf.ircm-taux",
] as const;

// La page des lois de la DGI liste chaque loi de finances en PDF. Une loi initiale postérieure à
// 2026, ou une loi rectificative à partir de 2026, peut modifier le code général des impôts.
async function loisDeFinances(http: Http): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(DGI_LOIS, { userAgentNavegador: true });
  const liens = [...page.matchAll(/https:\/\/dgi\.bf\/wp-content\/uploads\/[^"'\s]*LOI-DE-FINANCES-(RECTIFICATIVE-)?(\d{4})[^"'\s]*\.pdf/gi)];
  if (liens.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const vus = new Set<string>();
  const nouveaux: HallazgoNorma[] = [];
  for (const [url, rectificative, annee] of liens) {
    const nouvelle = rectificative ? Number(annee) >= 2026 : Number(annee) > 2026;
    if (!nouvelle || vus.has(url)) continue;
    vus.add(url);
    nouveaux.push({ titulo: `Loi de finances ${rectificative ? "rectificative " : ""}${annee}`, url, fecha });
  }
  return nouveaux;
}

// La CNSS cite sur sa page le décret qui fixe les taux et l'arrêté qui fixe le plafond. Si l'un
// des deux change de numéro, les taux ou le plafond ont pu changer.
async function textesCnss(http: Http): Promise<HallazgoNorma[] | null> {
  const page = texteBrut(await http.texto(CNSS_COTISATIONS, { userAgentNavegador: true }));
  const plafond = /plafond fix\S* \S+ ([\d\s.]+) FCFA par l.arr\S+ n\S*(\d{4}-\d{3})/i.exec(page);
  const decret = /d\S*cret\s+n\S*(\d{4}-\d{4})/i.exec(page);
  if (!plafond || !decret) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const montant = nombre(plafond[1].replace(/\./g, ""));
  const change = plafond[2] !== "2022-067" || decret[1] !== "2023-0129" || montant !== 800000;
  return change ? [{ titulo: `CNSS : décret n° ${decret[1]} et arrêté n° ${plafond[2]} (plafond ${montant} F CFA)`, url: CNSS_COTISATIONS, fecha }] : [];
}

// Le site du gouvernement (WordPress) publie les comptes rendus du Conseil des ministres : une
// revalorisation du SMIG y passe par un décret « fixant les salaires minima ».
async function conseilSmig(http: Http, apres: FechaISO): Promise<HallazgoNorma[] | null> {
  const reponse = await http.json(`${SIG_RECHERCHE}?search=salaires%20minima&after=${apres}T23:59:59&per_page=20&_fields=date,link,title`, {
    userAgentNavegador: true,
  });
  if (!Array.isArray(reponse)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const item of reponse as { date?: unknown; link?: unknown; title?: { rendered?: unknown } }[]) {
    const fecha = typeof item.date === "string" ? item.date.slice(0, 10) : "";
    if (!esFechaISO(fecha) || typeof item.link !== "string") return null;
    const titulo = typeof item.title?.rendered === "string" ? texteBrut(item.title.rendered).trim() : "Conseil des ministres";
    hallazgos.push({ titulo, url: item.link, fecha });
  }
  return hallazgos;
}

// La page d'accueil de la BCEAO affiche le tableau « Cours des devises du <jour> <date> » : on y
// prend le dollar US (achat et vente) et on garde la moyenne, comme dans series.json.
async function dollar(http: Http): Promise<PuntoSerie[] | null> {
  const page = texteBrut(await http.texto(BCEAO, { userAgentNavegador: true }));
  const date = /Cours des devises du \S+ (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  const cours = /Dollar us ([\d\s]+,\d+) ([\d\s]+,\d+)/i.exec(page);
  if (!date || !cours) return null;
  const fecha = dateFrancaise(date[1], date[2], date[3]);
  const achat = nombre(cours[1]);
  const vente = nombre(cours[2]);
  if (!fecha || !Number.isFinite(achat) || !Number.isFinite(vente)) return null;
  return [{ fecha, valor: Math.round(((achat + vente) / 2) * 1000) / 1000 }];
}

export const detectores: readonly Detector[] = [
  {
    id: "bf.bceao-dollar",
    carril: "serie",
    serie: "bf.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
  {
    id: "bf.dgi-lois-de-finances",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "html",
    url: DGI_LOIS,
    userAgentNavegador: true,
    traer(http) {
      return loisDeFinances(http);
    },
  },
  {
    id: "bf.cnss-cotisations",
    carril: "norma",
    datos: ["bf.cnss-taux", "bf.cnss-plafond", "bf.cnss-assurance-volontaire"],
    metodo: "html",
    url: CNSS_COTISATIONS,
    userAgentNavegador: true,
    traer(http) {
      return textesCnss(http);
    },
  },
  {
    id: "bf.sig-smig",
    carril: "norma",
    datos: ["bf.smig", "bf.smig-horaire"],
    metodo: "api-json",
    url: SIG_RECHERCHE,
    userAgentNavegador: true,
    traer(http) {
      return conseilSmig(http, "2026-10-27");
    },
  },
];
