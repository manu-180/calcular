import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const DGI = "https://www.dgi.gouv.ci/" as const;

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
];
