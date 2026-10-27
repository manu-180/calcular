import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const OTR_CGI = "https://otr.tg/index.php/fr/impots/reglementations-fiscales/code-general-des-impots.html" as const;
const OTR_LOIS = "https://otr.tg/index.php/fr/impots/reglementations-fiscales/dernieres-publications/lois-2.html" as const;
const CNSS_COTISATIONS = "https://cnss.tg/employeurs/cotisations-sociales/" as const;
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

function aujourdhui(): FechaISO | null {
  const fecha = new Date().toISOString().slice(0, 10);
  return esFechaISO(fecha) ? fecha : null;
}

const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
const texteBrut = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&#8217;|&rsquo;/g, "’").replace(/\s+/g, " ");

const DATOS_FISCAUX = [
  "tg.irpp-bareme",
  "tg.irpp-abattement",
  "tg.irpp-abattement-plafond",
  "tg.irpp-retraite-plafond",
  "tg.irpp-charge-famille",
  "tg.irpp-charges-max",
  "tg.tva",
  "tg.is-taux",
  "tg.mfp",
  "tg.mfp-minimum",
  "tg.tpu-taux",
  "tg.tpu-minimum",
  "tg.tpu-seuils",
  "tg.plus-value-taux",
  "tg.plus-value-reduction",
  "tg.plus-value-duree",
  "tg.plus-value-forfait-travaux",
  "tg.plus-value-seuil",
  "tg.ircm-taux",
  "tg.tvm-tarifs",
  "tg.tvm-reduction-tpu",
  "tg.taxe-fonciere",
] as const;

// L'OTR publie chaque année un CGI consolidé (« mis à jour <année> »), un Cahier fiscal avec
// l'aperçu des modifications et le texte de la loi de finances. Un millésime plus récent que ceux
// déjà lus signale une loi de finances à relire.
async function publicationsOtr(http: Http): Promise<HallazgoNorma[] | null> {
  const cgi = await http.texto(OTR_CGI, { userAgentNavegador: true });
  const lois = await http.texto(OTR_LOIS, { userAgentNavegador: true });
  const liens = [...`${cgi} ${lois}`.matchAll(/href="([^"]+\/file\.html)"/g)].map((m) => m[1]);
  if (liens.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const vus = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const lien of liens) {
    const cgiAnnee = /code-general-des-impots[^/]*mis-a-jour-(\d{4})/.exec(lien)?.[1];
    const cahier = /cahier-fiscal-(\d{4})/.exec(lien)?.[1];
    const lf = /loi-de-finances-exercice-(\d{4})/.exec(lien)?.[1];
    const titulo =
      cgiAnnee && Number(cgiAnnee) > 2025
        ? `Code général des impôts mis à jour ${cgiAnnee}`
        : cahier && Number(cahier) > 2026
          ? `Cahier fiscal ${cahier}`
          : lf && Number(lf) > 2025
            ? `Loi de finances, exercice ${lf}`
            : null;
    if (!titulo || vus.has(titulo)) continue;
    vus.add(titulo);
    hallazgos.push({ titulo, url: new URL(lien, "https://otr.tg/").toString(), fecha });
  }
  return hallazgos;
}

// La page de la CNSS écrit les taux en toutes lettres : s'ils ne s'y lisent plus tels quels, ils ont
// probablement changé et il faut relire la page.
async function tauxCnss(http: Http): Promise<HallazgoNorma[] | null> {
  const page = texteBrut(await http.texto(CNSS_COTISATIONS, { userAgentNavegador: true }));
  if (!/Les taux de cotisations sociales/i.test(page)) return null;
  const inchanges = /employeur cotise 17,50\s?%/i.test(page) && /travailleur cotise 4\s?%/i.test(page);
  const fecha = aujourdhui();
  if (!fecha) return null;
  return inchanges ? [] : [{ titulo: "Taux des cotisations sociales modifiés sur le site de la CNSS", url: CNSS_COTISATIONS, fecha }];
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

async function tauxDirecteurs(http: Http, depuis: FechaISO): Promise<HallazgoNorma[] | null> {
  const page = texteBrut(await http.texto(BCEAO, { userAgentNavegador: true }));
  const m = /Taux minimum de soumission[^%]*%[^%]*%\s*Effectifs depuis le (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  if (!m) return null;
  const fecha = dateFrancaise(m[1], m[2], m[3]);
  if (!fecha) return null;
  return fecha > depuis ? [{ titulo: "Nouveaux taux directeurs de la BCEAO", url: BCEAO, fecha }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "tg.otr-publications",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "html",
    url: OTR_CGI,
    userAgentNavegador: true,
    traer(http) {
      return publicationsOtr(http);
    },
  },
  {
    id: "tg.cnss-taux",
    carril: "norma",
    datos: ["tg.cnss-taux", "tg.amu-taux", "tg.smig"],
    metodo: "html",
    url: CNSS_COTISATIONS,
    userAgentNavegador: true,
    traer(http) {
      return tauxCnss(http);
    },
  },
  {
    id: "tg.bceao-dollar",
    carril: "serie",
    serie: "tg.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
  {
    id: "tg.bceao-taux-directeurs",
    carril: "norma",
    datos: ["tg.bceao-taux-directeurs", "tg.parite-euro"],
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    traer(http) {
      return tauxDirecteurs(http, "2026-03-16");
    },
  },
];
