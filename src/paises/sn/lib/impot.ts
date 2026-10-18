import { aplicarEscala, aplicarEscalaMarginal, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_IR = {
  "sn.ir-bareme": "escala",
  "sn.ir-plafond": "numero",
  "sn.ir-abattement": "mapa",
  "sn.ir-reduction-taux": "mapa",
  "sn.ir-reduction-min": "mapa",
  "sn.ir-reduction-max": "mapa",
  "sn.trimf": "escala",
} as const;

export interface ValoresIr {
  "sn.ir-bareme": readonly FilaEscala[];
  "sn.ir-plafond": number;
  "sn.ir-abattement": Readonly<Record<string, number>>;
  "sn.ir-reduction-taux": Readonly<Record<string, number>>;
  "sn.ir-reduction-min": Readonly<Record<string, number>>;
  "sn.ir-reduction-max": Readonly<Record<string, number>>;
  "sn.trimf": readonly FilaEscala[];
}

export const SITUATIONS = [
  { valor: "celibataire", etiqueta: "Célibataire ou divorcé" },
  { valor: "marie", etiqueta: "Marié" },
  { valor: "veuf", etiqueta: "Veuf" },
] as const;

export type Situation = (typeof SITUATIONS)[number]["valor"];

// CGI, article 174 : 1 part (célibataire, divorcé ou veuf sans enfant), 1,5 (marié sans enfant),
// une demi-part par enfant à charge, un veuf avec enfants compte comme un marié, une demi-part de plus
// quand un seul conjoint a des revenus, et jamais plus de 5 parts.
export function nombreDeParts(situation: Situation, enfants: number, conjointSansRevenu: boolean): number {
  if (!Number.isInteger(enfants) || enfants < 0) throw new ErrorEntrada("Indiquez un nombre d'enfants entier, zéro ou plus.", "enfants");
  let parts = situation === "marie" || (situation === "veuf" && enfants > 0) ? 1.5 : 1;
  parts += enfants * 0.5;
  if (situation === "marie" && conjointSansRevenu) parts += 0.5;
  return Math.min(5, parts);
}

export function clePart(parts: number): string {
  return String(parts).replace(".5", "-5");
}

export interface ResultatIr {
  imposable: number;
  impotBrut: number;
  reduction: number;
  impot: number;
  trimf: number;
}

// CGI, articles 173, 174, 182 et 282 : revenu imposable = brut moins l'abattement de 30 % (plafonné),
// arrondi au millier inférieur ; barème progressif ; réduction pour charges de famille selon les parts,
// entre son minimum et son maximum ; l'impôt ne dépasse jamais 43 % du revenu imposable. La TRIMF se lit
// dans le tableau à partir du revenu brut.
export function impotAnnuel(brut: number, parts: number, v: ValoresIr): ResultatIr {
  if (!Number.isFinite(brut) || brut < 0) throw new ErrorEntrada("Inscrivez un montant de zéro ou plus.", "salaire");
  const ab = v["sn.ir-abattement"];
  const abattement = Math.min(porcentaje(brut, ab.taux), ab.plafond);
  const imposable = Math.floor(Math.max(0, brut - abattement) / 1000) * 1000;
  const impotBrut = aplicarEscalaMarginal(v["sn.ir-bareme"], imposable);
  const cle = clePart(parts);
  const taux = v["sn.ir-reduction-taux"][cle] ?? 0;
  const reductionCalculee = porcentaje(impotBrut, taux);
  const reduction = taux === 0 ? 0 : Math.min(impotBrut, Math.max(v["sn.ir-reduction-min"][cle] ?? 0, Math.min(reductionCalculee, v["sn.ir-reduction-max"][cle] ?? 0)));
  const impot = Math.min(impotBrut - reduction, porcentaje(imposable, v["sn.ir-plafond"]));
  return { imposable, impotBrut, reduction, impot: Math.max(0, impot), trimf: aplicarEscala(v["sn.trimf"], Math.max(1, brut)) };
}
