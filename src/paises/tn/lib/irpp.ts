import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_IRPP = {
  "tn.irpp-bareme": "escala",
  "tn.deductions-famille": "mapa",
  "tn.enfants-deduction-max": "numero",
  "tn.css-majoration": "numero",
  "tn.css-seuil-exoneration": "numero",
} as const;

export const REQ_SALAIRE = {
  ...REQ_IRPP,
  "tn.frais-professionnels-taux": "numero",
  "tn.frais-professionnels-plafond": "numero",
  "tn.cnss-salarie": "numero",
} as const;

export interface ValeursIrpp {
  readonly "tn.irpp-bareme": readonly FilaEscala[];
  readonly "tn.deductions-famille": Mapa;
  readonly "tn.enfants-deduction-max": number;
  readonly "tn.css-majoration": number;
  readonly "tn.css-seuil-exoneration": number;
}

export interface ValeursSalaire extends ValeursIrpp {
  readonly "tn.frais-professionnels-taux": number;
  readonly "tn.frais-professionnels-plafond": number;
  readonly "tn.cnss-salarie": number;
}

export interface Famille {
  chef: boolean;
  enfants: number;
  etudiants: number;
  infirmes: number;
}

export const CHAMPS_FAMILLE = [
  { id: "chef", tipo: "si-no", etiqueta: "Vous êtes chef de famille", porDefecto: false, ayuda: "L'époux, ou l'épouse lorsqu'elle justifie que le mari n'a pas de revenus." },
  { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge de moins de 20 ans", min: 0, max: 15, porDefecto: 0 },
  { id: "etudiants", tipo: "entero", etiqueta: "Dont étudiants de moins de 25 ans sans bourse", min: 0, max: 15, porDefecto: 0, ayuda: "Comptez-les ici et non dans la ligne précédente." },
  { id: "infirmes", tipo: "entero", etiqueta: "Enfants infirmes à charge", min: 0, max: 15, porDefecto: 0 },
] as const;

// Article 40 du code : la déduction de base et celle des étudiants ne valent que pour les quatre
// premiers enfants ; les étudiants passent d'abord, la déduction pour enfant infirme vaut quel que soit le rang.
export function deductionsFamille(f: Famille, v: ValeursIrpp): number {
  const d = v["tn.deductions-famille"];
  const max = v["tn.enfants-deduction-max"];
  const etudiants = Math.min(f.etudiants, max);
  const enfants = Math.min(f.enfants, max - etudiants);
  return (f.chef ? d["chef-de-famille"] : 0) + enfants * d["par-enfant"] + etudiants * d["enfant-etudiant"] + f.infirmes * d["enfant-infirme"];
}

// Contribution sociale de solidarité (article 53 de la LF 2018) : l'impôt recalculé avec chaque taux
// du barème majoré, moins l'impôt normal, ce qui revient à la majoration appliquée à toute la base,
// tranche à 0 % comprise. L'exonération ne vise que les revenus de l'article 25 (salaires et pensions).
export function irppEtCss(base: number, salaireOuPension: boolean, v: ValeursIrpp, r: Arrondi) {
  const irpp = r(aplicarEscalaMarginal(v["tn.irpp-bareme"], base));
  const exonere = salaireOuPension && base <= v["tn.css-seuil-exoneration"];
  const css = exonere ? 0 : r(porcentaje(base, v["tn.css-majoration"]));
  return { irpp, css };
}

export function salaire(brutMensuel: number, f: Famille, v: ValeursSalaire, r: Arrondi) {
  const brutAnnuel = r(brutMensuel * 12);
  const cnss = r(porcentaje(brutAnnuel, v["tn.cnss-salarie"]));
  const reliquat = r(brutAnnuel - cnss);
  const frais = Math.min(r(porcentaje(reliquat, v["tn.frais-professionnels-taux"])), v["tn.frais-professionnels-plafond"]);
  const revenuNet = r(reliquat - frais);
  const deductions = Math.min(revenuNet, deductionsFamille(f, v));
  const base = r(revenuNet - deductions);
  const { irpp, css } = irppEtCss(base, true, v, r);
  return {
    brutAnnuel,
    cnss,
    frais,
    revenuNet,
    deductions,
    base,
    irpp,
    css,
    cnssMensuel: r(cnss / 12),
    irppMensuel: r(irpp / 12),
    cssMensuel: r(css / 12),
  };
}
