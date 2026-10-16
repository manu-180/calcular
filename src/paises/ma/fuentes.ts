import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const LISTE_BO = "https://www.sgg.gov.ma/DesktopModules/MVC/TableListBO/BO/AjaxMethod" as const;

type Bo = { BoNum?: string; BoDate?: string; BoUrl?: string };

// Le point d'accès de la liste des Bulletins officiels en français ne répond qu'avec les en-têtes du
// module DNN de la page (ModuleId 2873, TabId 775) ; sans eux il renvoie une page d'erreur.
async function bulletins(http: Http, url: string, depuis: number): Promise<HallazgoNorma[] | null> {
  const liste = (await http.json(url, { encabezados: { ModuleId: "2873", TabId: "775" } })) as Bo[];
  if (!Array.isArray(liste)) return null;
  const sortie: HallazgoNorma[] = [];
  for (const b of liste.slice(0, 40)) {
    const ms = /\/Date\((\d+)\)\//.exec(b.BoDate ?? "")?.[1];
    if (!ms || !b.BoNum || !b.BoUrl) continue;
    const fecha = new Date(Number(ms)).toISOString().slice(0, 10) as FechaISO;
    if (!esFechaISO(fecha) || Number(ms) < depuis) continue;
    const lien = b.BoUrl.startsWith("http") ? b.BoUrl : `https://www.sgg.gov.ma${b.BoUrl}`;
    sortie.push({ titulo: `Bulletin officiel n° ${b.BoNum} (édition de traduction officielle)`, url: lien, fecha });
  }
  return sortie;
}

export const detectores: readonly Detector[] = [
  {
    id: "ma.sgg-bulletin-officiel",
    carril: "norma",
    datos: [
      "ma.tva-normal",
      "ma.tva-reduit",
      "ma.ir-bareme",
      "ma.frais-professionnels-taux",
      "ma.frais-professionnels-limites",
      "ma.charges-de-famille",
      "ma.is-taux",
      "ma.is-seuil",
      "ma.auto-entrepreneur-taux",
      "ma.auto-entrepreneur-plafonds",
      "ma.droits-enregistrement",
      "ma.droits-enregistrement-minimum",
      "ma.heures-supplementaires",
      "ma.duree-travail",
      "ma.indemnite-licenciement",
      "ma.conges-payes",
    ],
    metodo: "api-json",
    url: LISTE_BO,
    async traer(http) {
      return bulletins(http, this.url, Date.now() - 60 * 86_400_000);
    },
  },
];
