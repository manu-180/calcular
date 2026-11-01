import { ErrorEntrada } from "@/motor/calculo";

export function anciennete(annees: number, mois: number): number {
  if (mois > 11) throw new ErrorEntrada("Indiquez au plus 11 mois en plus des années complètes.", "mois");
  return annees + mois / 12;
}
