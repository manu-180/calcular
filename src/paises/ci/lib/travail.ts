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

// Décret n° 2017-210, article 4 : chaque année de présence vaut un pourcentage du salaire global
// mensuel moyen, différent selon la tranche d'ancienneté, et les fractions d'année comptent au
// mois. L'échelle cumulative en années le fait directement.
export function indemniteAnciennete(salaire: number, ans: number, bareme: readonly FilaEscala[], r: Arrondi): Indemnite {
  const pourcentage = Math.round(aplicarEscalaMarginal(bareme, ans) * 10000) / 100;
  return { pourcentage, indemnite: r((salaire * pourcentage) / 100) };
}
