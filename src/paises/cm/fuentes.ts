import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const DGI_TEXTES = "https://www.impots.cm/fr/documents/39" as const;
const SPM_SMIG = "https://www.spm.gov.cm/site/?q=fr/search/node/SMIG" as const;

const DATOS_FISCAUX = [
  "cm.irpp-bareme",
  "cm.irpp-frais-professionnels",
  "cm.irpp-plafond-frais",
  "cm.irpp-abattement",
  "cm.irpp-seuil-retenue",
  "cm.cac",
  "cm.cnps-pension",
  "cm.cnps-prestations-familiales",
  "cm.cnps-accidents-travail",
  "cm.cnps-plafond",
  "cm.cfc-taux",
  "cm.fne-taux",
  "cm.rav-bareme",
  "cm.tdl-bareme",
  "cm.tva",
  "cm.is-taux",
  "cm.is-seuil-pme",
  "cm.minimum-perception",
  "cm.igs-bareme",
  "cm.igs-reduction-cga",
  "cm.igs-seuils",
  "cm.avantages-nature",
  "cm.rcm-taux",
  "cm.taxe-fonciere",
] as const;

function aujourdhui(): FechaISO | null {
  const d = new Date().toISOString().slice(0, 10);
  return esFechaISO(d) ? d : null;
}

// La page « Textes » de la DGI liste le Code général des impôts de chaque année sous la forme
// « CODE GENERAL DES IMPOTS <année> ». Une édition plus récente que celle chargée est un signal.
async function nouveauCode(http: Http, apres: number): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(DGI_TEXTES, { userAgentNavegador: true });
  const liens = [...page.matchAll(/href="(\/sites\/default\/files\/documents\/CODE(?:%20| )GENERAL(?:%20| )DES(?:%20| )IMPOTS(?:%20| )(\d{4})[^"]*\.pdf)"/gi)];
  if (liens.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  return liens
    .filter((m) => Number(m[2]) > apres)
    .map((m) => ({ titulo: `Code général des impôts ${m[2]}`, url: `https://www.impots.cm${m[1]}`, fecha }));
}

const CONNUS = new Set(["20142217", "202300338", "20240168"]);

// La recherche du site des Services du Premier ministre renvoie les pages des décrets sur le SMIG ;
// leur adresse contient le numéro du décret (année puis numéro d'ordre, par exemple 20240168pm).
async function nouveauSmig(http: Http): Promise<HallazgoNorma[] | null> {
  const page = await http.texto(SPM_SMIG, { userAgentNavegador: true });
  const liens = [...page.matchAll(/href="(https:\/\/www\.spm\.gov\.cm\/site\/\?q=fr\/content\/[^"]*?n%C2%B0-?(\d{4})(\d{3,5})pm[^"]*salaire-minim[^"]*)"/gi)];
  if (liens.length === 0) return null;
  const fecha = aujourdhui();
  if (!fecha) return null;
  const vus = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const m of liens) {
    const numero = m[2] + m[3];
    if (CONNUS.has(numero) || vus.has(numero)) continue;
    vus.add(numero);
    hallazgos.push({ titulo: `Décret n° ${m[2]}/${m[3]}/PM sur le salaire minimum`, url: m[1], fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "cm.dgi-code-general-des-impots",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "html",
    url: DGI_TEXTES,
    userAgentNavegador: true,
    traer(http) {
      return nouveauCode(http, 2026);
    },
  },
  {
    id: "cm.spm-smig",
    carril: "norma",
    datos: ["cm.smig"],
    metodo: "html",
    url: SPM_SMIG,
    userAgentNavegador: true,
    traer(http) {
      return nouveauSmig(http);
    },
  },
];
