import { aplicarEscalaMarginal, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Arrondi = (n: number) => number;

export const REQ_ITS = {
  "ml.its-bareme": "escala",
  "ml.its-reduction-famille": "mapa",
  "ml.its-enfants-max": "numero",
  "ml.its-reduction-points": "numero",
  "ml.its-deduction-retraite": "numero",
} as const;

export interface ValeursIts {
  "ml.its-bareme": readonly FilaEscala[];
  "ml.its-reduction-famille": Readonly<Record<string, number>>;
  "ml.its-enfants-max": number;
  "ml.its-reduction-points": number;
  "ml.its-deduction-retraite": number;
}

export const OPTIONS_SITUATION = [
  { valor: "celibataire", etiqueta: "Célibataire, divorcé(e) ou veuf (veuve)" },
  { valor: "marie", etiqueta: "Marié(e)" },
] as const;

export interface Famille {
  situation: "celibataire" | "marie";
  enfants: number;
  infirmes: number;
}

// Article 11 du CGI : 10 % pour la personne mariée, 2,5 % par enfant à charge et 10 % par enfant
// majeur infirme, jusqu'au dixième enfant inclus.
export function tauxReductionFamille(f: Famille, v: ValeursIts): number {
  if (f.infirmes > f.enfants) throw new ErrorEntrada("Les enfants infirmes font partie des enfants à charge : leur nombre ne peut pas dépasser le total.", "infirmes");
  const m = v["ml.its-reduction-famille"];
  const max = v["ml.its-enfants-max"];
  const infirmes = Math.min(f.infirmes, max);
  const autres = Math.min(f.enfants - f.infirmes, max - infirmes);
  const taux = (f.situation === "marie" ? m["marie"] : 0) + autres * m["enfant"] + infirmes * m["enfant-infirme"];
  return Math.min(100, taux);
}

export interface ResultatIts {
  baseAnnuelle: number;
  impotBareme: number;
  reductionFamille: number;
  tauxReduction: number;
  reductionPoints: number;
  impotAnnuel: number;
  impotMensuel: number;
}

// Articles 9 à 12-B du CGI. Le barème de l'article 10 s'applique au revenu imposable annuel, puis la
// réduction pour charges de famille sur l'impôt brut. L'article 12-A retire ensuite deux points au
// taux réel (impôt divisé par le revenu imposable) : cela revient à retirer 2 % du revenu imposable,
// sans descendre sous zéro.
export function itsAnnuel(baseAnnuelle: number, f: Famille, v: ValeursIts, r: Arrondi): ResultatIts {
  const impotBareme = r(aplicarEscalaMarginal(v["ml.its-bareme"], baseAnnuelle));
  const tauxReduction = tauxReductionFamille(f, v);
  const reductionFamille = r(porcentaje(impotBareme, tauxReduction));
  const apresFamille = impotBareme - reductionFamille;
  const reductionPoints = r(Math.min(apresFamille, porcentaje(baseAnnuelle, v["ml.its-reduction-points"])));
  const impotAnnuel = r(apresFamille - reductionPoints);
  return { baseAnnuelle, impotBareme, reductionFamille, tauxReduction, reductionPoints, impotAnnuel, impotMensuel: r(impotAnnuel / 12) };
}

// Article 7 du CGI : la retenue pour la retraite se déduit dans la limite de 4 % du salaire brut.
export function retraiteDeductible(brut: number, retenue: number, v: ValeursIts, r: Arrondi): number {
  return r(Math.min(retenue, porcentaje(brut, v["ml.its-deduction-retraite"])));
}
