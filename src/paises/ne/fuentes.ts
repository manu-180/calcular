import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const LOIS_FINANCES = "https://finances.gouv.ne/index.php/lois-de-finances" as const;
const BCEAO = "https://www.bceao.int/" as const;

const MOIS: Record<string, string> = {
  janvier: "01", "février": "02", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06",
  juillet: "07", "août": "08", aout: "08", septembre: "09", octobre: "10", novembre: "11", "décembre": "12", decembre: "12",
};

const texte = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#160;|&nbsp;/g, " ").replace(/\s+/g, " ");
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

function aujourdhui(): FechaISO | null {
  const fecha = new Date().toISOString().slice(0, 10);
  return esFechaISO(fecha) ? fecha : null;
}

// Ordonnances déjà lues : 2025-44 (loi de finances 2026) et 2026-45 (première rectification, un scan sans
// texte que nous n'avons pas pu lire). Toute autre ordonnance de la rubrique peut changer le barème de l'ITS
// ou les taxes créées en 2026.
const LUES = new Set(["2025-44", "2026-45"]);

async function ordonnancesNouvelles(http: Http): Promise<HallazgoNorma[] | null> {
  const page = texte(await http.texto(LOIS_FINANCES, { userAgentNavegador: true }));
  const trouvees = [...page.matchAll(/Ordonnance n\s?°\s?(\d{4}-\d+)/gi)].map((m) => m[1]);
  if (trouvees.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const nouvelles = [...new Set(trouvees)].filter((n) => !LUES.has(n) && Number(n.slice(0, 4)) >= 2026);
  return nouvelles.map((n) => ({ titulo: `Ordonnance n° ${n} dans la rubrique Lois de finances du ministère`, url: LOIS_FINANCES, fecha }));
}

// La page d'accueil de la BCEAO affiche « Cours des devises du <jour> <date> » : on garde la moyenne
// de l'achat et de la vente du dollar, comme dans series.json.
async function dollar(http: Http): Promise<PuntoSerie[] | null> {
  const page = texte(await http.texto(BCEAO, { userAgentNavegador: true }));
  const date = /Cours des devises du \S+ (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  const cours = /Dollar us ([\d\s]+,\d+) ([\d\s]+,\d+)/i.exec(page);
  if (!date || !cours) return null;
  const mois = MOIS[date[2].toLowerCase()];
  if (!mois) return null;
  const fecha = `${date[3]}-${mois}-${date[1].padStart(2, "0")}`;
  const achat = nombre(cours[1]);
  const vente = nombre(cours[2]);
  if (!esFechaISO(fecha) || !Number.isFinite(achat) || !Number.isFinite(vente)) return null;
  return [{ fecha, valor: Math.round(((achat + vente) / 2) * 1000) / 1000 }];
}

export const detectores: readonly Detector[] = [
  {
    id: "ne.finances-ordonnances",
    carril: "norma",
    datos: ["ne.its-bareme", "ne.tdta-taux", "ne.tdta-taux-eleve", "ne.tdta-seuil", "ne.numeraire-taux", "ne.numeraire-seuil", "ne.jeux-taux", "ne.commande-droit", "ne.commande-bon-seuil", "ne.foncier-taux", "ne.foncier-fixes", "ne.tva"],
    metodo: "html",
    url: LOIS_FINANCES,
    userAgentNavegador: true,
    traer(http) {
      return ordonnancesNouvelles(http);
    },
  },
  {
    id: "ne.bceao-dollar",
    carril: "serie",
    serie: "ne.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
];
