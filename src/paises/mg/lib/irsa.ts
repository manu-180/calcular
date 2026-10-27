import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_IRSA = {
  "mg.irsa-bareme": "escala",
  "mg.irsa-minimum": "numero",
  "mg.irsa-reduction-charge": "numero",
  "mg.irsa-deductions": "mapa",
} as const;

export interface ValeursIrsa {
  readonly "mg.irsa-bareme": readonly FilaEscala[];
  readonly "mg.irsa-minimum": number;
  readonly "mg.irsa-reduction-charge": number;
  readonly "mg.irsa-deductions": Mapa;
}

export interface EntreeIrsa {
  brut: number;
  exonere: number;
  retraite: number;
  sante: number;
  personnesCharge: number;
}

// Articles 01.03.09, 01.03.16 et 01.03.19 du Code des impôts : les cotisations se déduisent dans la
// limite de 10 % (retraite) et 2 % (santé) du brut, la base est arrondie à la centaine inférieure,
// l'impôt suit le barème par tranches, la réduction pour charges de famille ne joue qu'au-dessus du
// premier seuil et l'impôt ne descend jamais sous le minimum.
export function calculerIrsa(e: EntreeIrsa, v: ValeursIrsa, redondear: Arrondi) {
  const bareme = v["mg.irsa-bareme"];
  const ded = v["mg.irsa-deductions"];
  const deductionRetraite = redondear(Math.min(e.retraite, porcentaje(e.brut, ded.retraite)));
  const deductionSante = redondear(Math.min(e.sante, porcentaje(e.brut, ded.sante)));
  const base = Math.max(0, Math.floor((e.brut - e.exonere - deductionRetraite - deductionSante) / 100) * 100);
  const impotBareme = redondear(aplicarEscalaMarginal(bareme, base));
  const seuil = bareme[0].hasta ?? 0;
  const reduction = base > seuil ? e.personnesCharge * v["mg.irsa-reduction-charge"] : 0;
  const irsa = Math.max(v["mg.irsa-minimum"], impotBareme - reduction);
  let tauxMarginal = bareme[0].tasa;
  for (const f of bareme) if (base > f.desde) tauxMarginal = f.tasa;
  return { base, deductionRetraite, deductionSante, impotBareme, reduction: Math.max(0, impotBareme - irsa), irsa, tauxMarginal };
}
