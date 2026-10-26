import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const DGI = "https://www.dgi.gouv.ci/" as const;
const BCEAO = "https://www.bceao.int/" as const;

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

const DATOS_FISCAUX = [
  "ci.its-bareme",
  "ci.its-ricf",
  "ci.its-parts-max",
  "ci.its-abattement-pension",
  "ci.its-abattement-retraite-70-ans",
  "ci.contribution-employeur",
  "ci.taxe-apprentissage",
  "ci.tva-normal",
  "ci.tva-reduit",
  "ci.entreprenant-taxe-communale",
  "ci.entreprenant-taxe-etat",
  "ci.entreprenant-reduction-cga",
  "ci.microentreprises-taux",
  "ci.regimes-seuils",
  "ci.bic-taux",
] as const;

// Le site de la DGI est une application Angular : la liste des documents (dont le dossier de
// l'annexe fiscale de chaque loi de finances) n'existe que dans le bundle main.<empreinte>.js, dont
// le nom change à chaque mise en ligne. On lit donc d'abord la page pour trouver le bundle.
async function annexesFiscales(http: Http, apres: number): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(DGI, { userAgentNavegador: true });
  const bundle = /src="(main\.[0-9a-f]+\.js)"/.exec(page)?.[1];
  if (!bundle) return null;
  const js = await http.texto(`${DGI}${bundle}`, { userAgentNavegador: true });
  const annees = [...js.matchAll(/assets\/documents\/ANNEXE_FISCALE_(\d{4})\//g)].map((m) => Number(m[1]));
  if (annees.length === 0) return null;
  const aujourdhui = new Date().toISOString().slice(0, 10) as FechaISO;
  if (!esFechaISO(aujourdhui)) return null;
  return [...new Set(annees)]
    .filter((a) => a > apres)
    .map((a) => ({
      titulo: `Annexe fiscale à la loi de finances pour ${a}`,
      url: `${DGI}assets/documents/ANNEXE_FISCALE_${a}/`,
      fecha: aujourdhui,
    }));
}

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

async function tauxDirecteurs(http: Http, depuis: FechaISO): Promise<HallazgoNorma[] | null> {
  const page = (await http.texto(BCEAO, { userAgentNavegador: true })).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = /Taux minimum de soumission[^%]*%[^%]*%\s*Effectifs depuis le (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  if (!m) return null;
  const fecha = dateFrancaise(m[1], m[2], m[3]);
  if (!fecha) return null;
  return fecha > depuis ? [{ titulo: "Nouveaux taux directeurs de la BCEAO", url: BCEAO, fecha }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "ci.dgi-annexe-fiscale",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "html",
    url: DGI,
    userAgentNavegador: true,
    traer(http) {
      return annexesFiscales(http, 2026);
    },
  },
  {
    id: "ci.bceao-dollar",
    carril: "serie",
    serie: "ci.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
  {
    id: "ci.bceao-taux-directeurs",
    carril: "norma",
    datos: ["ci.bceao-taux-directeurs", "ci.parite-euro"],
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    traer(http) {
      return tauxDirecteurs(http, "2026-03-16");
    },
  },
];
