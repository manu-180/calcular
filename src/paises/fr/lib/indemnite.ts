export const REQUIERE_INDEMNITE = {
  "fr.lic-diviseur-1": "numero",
  "fr.lic-diviseur-2": "numero",
  "fr.lic-seuil-annees": "numero",
} as const;

export type ValeursIndemnite = { readonly [K in keyof typeof REQUIERE_INDEMNITE]: number };

export function indemniteLegale(salaireReference: number, anneesCompletes: number, moisEnPlus: number, v: ValeursIndemnite): number {
  const anciennete = anneesCompletes + moisEnPlus / 12;
  const seuil = v["fr.lic-seuil-annees"];
  const avant = Math.min(anciennete, seuil);
  const apres = Math.max(0, anciennete - seuil);
  return (salaireReference * avant) / v["fr.lic-diviseur-1"] + (salaireReference * apres) / v["fr.lic-diviseur-2"];
}

export function salaireDeReference(moyenne12: number, moyenne3: number | null): number {
  return Math.max(moyenne12, moyenne3 ?? 0);
}
