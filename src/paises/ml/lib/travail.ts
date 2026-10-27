import { aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Arrondi = (n: number) => number;

export function anciennete(annees: number, mois: number): number {
  if (mois > 11) throw new ErrorEntrada("Indiquez au plus 11 mois en plus des années complètes.", "mois");
  return annees + mois / 12;
}

export interface Indemnite {
  pourcentage: number;
  indemnite: number;
}

// Code du travail, article L.53 : 20 % du salaire mensuel moyen par année pour les cinq premières,
// 25 % de la 6e à la 10e, 30 % au-delà, fractions d'année comprises. L'échelle cumulative en années
// le donne directement. Les articles L.54 et L.55 reprennent les mêmes bases.
export function indemniteParAnnee(salaire: number, ans: number, bareme: readonly FilaEscala[], r: Arrondi): Indemnite {
  const pourcentage = Math.round(aplicarEscalaMarginal(bareme, ans) * 10000) / 100;
  return { pourcentage, indemnite: r((salaire * pourcentage) / 100) };
}
