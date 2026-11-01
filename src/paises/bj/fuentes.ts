import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const API_DGI = "https://apisiteweb.impots.bj/api/documents" as const;
const SGG = "https://sgg.gouv.bj/" as const;
const BCEAO = "https://www.bceao.int/" as const;

const MOIS: Record<string, string> = {
  janvier: "01", "février": "02", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06",
  juillet: "07", "août": "08", aout: "08", septembre: "09", octobre: "10", novembre: "11", "décembre": "12", decembre: "12",
  "janv.": "01", "févr.": "02", "avr.": "04", "juil.": "07", "sept.": "09", "oct.": "10", "nov.": "11", "déc.": "12",
};

function dateFrancaise(jour: string, mois: string, annee: string): FechaISO | null {
  const m = MOIS[mois.toLowerCase()];
  if (!m) return null;
  const fecha = `${annee}-${m}-${jour.padStart(2, "0")}`;
  return esFechaISO(fecha) ? fecha : null;
}

const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
const texte = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&#0?39;/g, "'").replace(/\s+/g, " ");

const DATOS_FISCAUX = [
  "bj.its-bareme",
  "bj.its-redevance-ortb",
  "bj.its-abattement-exceptionnel",
  "bj.vps-taux",
  "bj.tva",
  "bj.tps-taux",
  "bj.tps-minimum",
  "bj.tps-redevance-ortb",
  "bj.is-taux",
  "bj.is-minimum-taux",
  "bj.iba-taux",
  "bj.iba-minimum-taux",
  "bj.impot-minimum-plancher",
  "bj.irf-taux",
  "bj.irf-redevance-ortb",
  "bj.irf-retenue",
  "bj.tpvi-taux",
  "bj.tpvi-minimum",
  "bj.tpvi-plus-value-construction",
  "bj.ircm-taux",
  "bj.aib-taux",
  "bj.tvm-prive",
  "bj.tvm-societes",
  "bj.tvm-public-personnes",
  "bj.tvm-public-marchandises",
  "bj.tvm-trois-roues",
  "bj.avantages-nature-logement",
  "bj.avantages-nature-forfaits",
] as const;

// Le site de la DGI (impots.bj) est une application React qui lit ses documents dans l'API
// apisiteweb.impots.bj. Chaque loi de finances et chaque édition du Code général des impôts y a une
// fiche avec son année : on signale celles qui sont postérieures à l'édition chargée (2026).
async function documentsDgi(http: Http, apres: number): Promise<HallazgoNorma[] | null> {
  const liste = await http.json(API_DGI, { userAgentNavegador: true });
  if (!Array.isArray(liste)) return null;
  const trouves: HallazgoNorma[] = [];
  for (const doc of liste as readonly Record<string, unknown>[]) {
    const titre = typeof doc.libelle === "string" ? doc.libelle : "";
    if (!/loi de finances|code g[ée]n[ée]ral des imp[ôo]ts/i.test(titre)) continue;
    const annee = Number(/(\d{4})\s*$/.exec(titre)?.[1]);
    const fichier = (doc.fichier as { contentUrl?: unknown } | null)?.contentUrl;
    const creation = typeof doc.createdAt === "string" ? doc.createdAt.slice(0, 10) : "";
    if (!(annee > apres) || typeof fichier !== "string" || !esFechaISO(creation)) continue;
    trouves.push({ titulo: titre, url: `https://apisiteweb.impots.bj${encodeURI(fichier)}`, fecha: creation });
  }
  return trouves;
}

// La recherche du SGG liste les décrets « portant relèvement du salaire minimum interprofessionnel
// garanti ». Le dernier chargé est le décret n° 2022-692 du 07 décembre 2022 ; un décret plus
// récent sur le même objet est un nouveau SMIG.
async function decretsSmig(http: Http, depuis: FechaISO): Promise<HallazgoNorma[] | null> {
  const page = texte(await http.texto(`${SGG}recherche/?keywords=salaire+minimum&type=tout`, { userAgentNavegador: true }));
  const decrets = [...page.matchAll(/D[ée]cret N° (\d{4}-\d+) du (\d{1,2}) (\S+) (\d{4}) portant rel[èe]vement du salaire minimum interprofessionnel garanti/gi)];
  if (decrets.length === 0) return null;
  const trouves: HallazgoNorma[] = [];
  for (const m of decrets) {
    const fecha = dateFrancaise(m[2], m[3], m[4]);
    if (fecha && fecha > depuis) trouves.push({ titulo: `Décret n° ${m[1]} portant relèvement du SMIG`, url: `${SGG}doc/decret-${m[1]}/`, fecha });
  }
  return trouves;
}

// La page d'accueil de la BCEAO affiche le tableau « Cours des devises du <jour> <date> » : on y
// prend le dollar US (achat et vente) et on garde la moyenne, comme dans series.json.
async function dollar(http: Http): Promise<PuntoSerie[] | null> {
  const page = texte(await http.texto(BCEAO, { userAgentNavegador: true }));
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
  const page = texte(await http.texto(BCEAO, { userAgentNavegador: true }));
  const m = /Taux minimum de soumission[^%]*%[^%]*%\s*Effectifs depuis le (\d{1,2}) (\S+) (\d{4})/i.exec(page);
  if (!m) return null;
  const fecha = dateFrancaise(m[1], m[2], m[3]);
  if (!fecha) return null;
  return fecha > depuis ? [{ titulo: "Nouveaux taux directeurs de la BCEAO", url: BCEAO, fecha }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "bj.dgi-lois-de-finances",
    carril: "norma",
    datos: DATOS_FISCAUX,
    metodo: "api-json",
    url: API_DGI,
    userAgentNavegador: true,
    traer(http) {
      return documentsDgi(http, 2026);
    },
  },
  {
    id: "bj.sgg-smig",
    carril: "norma",
    datos: ["bj.smig"],
    metodo: "html",
    url: `${SGG}recherche/?keywords=salaire+minimum&type=tout`,
    userAgentNavegador: true,
    traer(http) {
      return decretsSmig(http, "2022-12-07");
    },
  },
  {
    id: "bj.bceao-dollar",
    carril: "serie",
    serie: "bj.usd-xof",
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    banda: { min: 400, max: 800, saltoRelativoMax: 0.05 },
    traer(http) {
      return dollar(http);
    },
  },
  {
    id: "bj.bceao-taux-directeurs",
    carril: "norma",
    datos: ["bj.bceao-taux-directeurs", "bj.parite-euro"],
    metodo: "html",
    url: BCEAO,
    userAgentNavegador: true,
    traer(http) {
      return tauxDirecteurs(http, "2026-03-16");
    },
  },
];
