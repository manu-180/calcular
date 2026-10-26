import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const LOIS_DE_FINANCES = "https://www.finances.gov.tn/fr/loi_finance" as const;
const LEGISLATION_SOCIALE = "https://www.social.gov.tn/ar/legislations" as const;
const CNSS_NON_SALARIES =
  "https://www.cnss.tn/web/non-salarie/non_sal_asset_services/-/asset_publisher/w1WU/content/non_sal-secteur_-non_agr1_cotisations?convention=false&categorie=1&secteur=1&champAppli=1&servActif=2" as const;

// Les deux ministères publient sur Drupal sans date par document : le dossier de dépôt
// /sites/default/files/AAAA-MM/ sert de date de publication (premier jour du mois).
async function documents(http: Http, url: string, origine: string, etiquette: string, depuis: number): Promise<HallazgoNorma[]> {
  const html = await http.texto(url);
  const vus = new Set<string>();
  const sortie: HallazgoNorma[] = [];
  for (const m of html.matchAll(/href="([^"]*\/sites\/default\/files\/(\d{4})-(\d{2})\/[^"]+\.pdf)"/gi)) {
    const lien = m[1].startsWith("http") ? m[1] : `${origine}${m[1]}`;
    if (vus.has(lien)) continue;
    vus.add(lien);
    const fecha = `${m[2]}-${m[3]}-01` as FechaISO;
    if (!esFechaISO(fecha) || Date.parse(fecha) < depuis) continue;
    const nom = decodeURIComponent(lien.split("/").pop() ?? "").replace(/\.pdf$/i, "");
    sortie.push({ titulo: `${etiquette} : ${nom}`, url: lien, fecha });
  }
  return sortie;
}

const TRIMESTRES: Readonly<Record<string, string>> = { "الأولى": "01", "الثانية": "04", "الثالثة": "07", "الرابعة": "10" };

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
    ],
    metodo: "html",
    url: LOIS_DE_FINANCES,
    async traer(http) {
      return documents(http, this.url, "https://www.finances.gov.tn", "Ministère des Finances", Date.now() - 60 * 86_400_000);
    },
  },
  {
    id: "tn.social-legislation",
    carril: "norma",
    datos: [
      "tn.heures-supplementaires",
      "tn.conges-payes",
      "tn.indemnite-fin-de-service",
      "tn.preavis",
      "tn.periode-essai",
      "tn.licenciement-abusif",
      "tn.conges-maternite",
      "tn.smig-mensuel",
      "tn.smig-horaire",
    ],
    metodo: "html",
    url: LEGISLATION_SOCIALE,
    async traer(http) {
      return documents(http, this.url, "https://www.social.gov.tn", "Ministère des Affaires sociales", Date.now() - 60 * 86_400_000);
    },
  },
  {
    // La fiche annonce le trimestre à partir duquel s'applique le barème des non-salariés
    // (« à partir du Ne trimestre de l'année AAAA ») : un nouveau trimestre signale une révision.
    id: "tn.cnss-bareme-non-salaries",
    carril: "norma",
    datos: [
      "tn.cnss-tns-taux",
      "tn.cnss-tns-assiette",
      "tn.cnss-salarie",
      "tn.cnss-employeur",
      "tn.accidents-travail",
      "tn.allocations-familiales-taux",
      "tn.allocations-familiales-plafond",
    ],
    metodo: "html",
    url: CNSS_NON_SALARIES,
    async traer(http) {
      const html = await http.texto(this.url);
      const m = /ابتداء\s+من\s+الثلاثية\s+(\S+)\s+لسنة\s+(\d{4})/.exec(html);
      if (!m || !TRIMESTRES[m[1]]) return null;
      const fecha = `${m[2]}-${TRIMESTRES[m[1]]}-01` as FechaISO;
      if (!esFechaISO(fecha)) return null;
      if (Date.parse(fecha) < Date.now() - 100 * 86_400_000) return [];
      return [{ titulo: `CNSS : barème des cotisations des non-salariés à partir du trimestre commençant le ${fecha}`, url: this.url, fecha }];
    },
  },
];
