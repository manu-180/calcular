import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const LOIS_DE_FINANCES = "https://www.finances.gov.tn/fr/loi_finance" as const;

// La page des lois de finances ne donne pas de date par document : le dossier de dépôt
// /sites/default/files/AAAA-MM/ sert de date de publication (premier jour du mois).
async function documents(http: Http, url: string, depuis: number): Promise<HallazgoNorma[]> {
  const html = await http.texto(url);
  const vus = new Set<string>();
  const sortie: HallazgoNorma[] = [];
  for (const m of html.matchAll(/href="([^"]*\/sites\/default\/files\/(\d{4})-(\d{2})\/[^"]+\.pdf)"/gi)) {
    const lien = m[1].startsWith("http") ? m[1] : `https://www.finances.gov.tn${m[1]}`;
    if (vus.has(lien)) continue;
    vus.add(lien);
    const fecha = `${m[2]}-${m[3]}-01` as FechaISO;
    if (!esFechaISO(fecha) || Date.parse(fecha) < depuis) continue;
    const nom = decodeURIComponent(lien.split("/").pop() ?? "").replace(/\.pdf$/i, "");
    sortie.push({ titulo: `Ministère des Finances : ${nom}`, url: lien, fecha });
  }
  return sortie;
}

export const detectores: readonly Detector[] = [
  {
    id: "tn.finances-lois-de-finances",
    carril: "norma",
    datos: [
      "tn.tva-normal",
      "tn.tva-intermediaire",
      "tn.tva-reduit",
      "tn.irpp-bareme",
      "tn.frais-professionnels-taux",
      "tn.frais-professionnels-plafond",
      "tn.abattement-pensions",
      "tn.deductions-famille",
      "tn.enfants-deduction-max",
      "tn.css-majoration",
      "tn.css-seuil-exoneration",
      "tn.is-taux",
      "tn.css-is-points",
      "tn.css-is-minimum",
      "tn.cnss-salarie",
      "tn.cnss-employeur",
      "tn.accidents-travail",
      "tn.heures-supplementaires",
      "tn.conges-payes",
    ],
    metodo: "html",
    url: LOIS_DE_FINANCES,
    async traer(http) {
      return documents(http, this.url, Date.now() - 60 * 86_400_000);
    },
  },
];
