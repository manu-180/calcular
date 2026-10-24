import { enMapa } from "@/motor/calculo";

// Skattereduktion för underskott av kapital: en högre procentsats upp till gränsen och en lägre över.
export function reduktionUnderskott(underskott: number, regler: Readonly<Record<string, number>>): number {
  if (underskott <= 0) return 0;
  const grans = enMapa(regler, "grans");
  const upp = Math.min(underskott, grans);
  const over = Math.max(0, underskott - grans);
  return Math.floor((upp * enMapa(regler, "sats")) / 100 + (over * enMapa(regler, "over")) / 100 + 1e-9);
}
