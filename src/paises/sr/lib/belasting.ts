import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface RegelsLoonbelasting {
  vrijeSom: number;
  aftrekPercentage: number;
  aftrekMax: number;
  tarief: readonly FilaEscala[];
}

export interface Loonbelasting {
  aftrek: number;
  zuiverLoon: number;
  belastbaarLoon: number;
  belasting: number;
}

// De Wet Loonbelasting rekent met jaarbedragen; een maand is een twaalfde jaar (artikel 13 lid 3:
// 364 dagen per jaar en 30 1/3 dag per maand). Pensioenpremie die de werknemer betaalt hoort niet
// tot het loon (artikel 10 lid 1 sub f) en gaat er dus vooraf af.
export function loonbelastingPerJaar(loonPerJaar: number, regels: RegelsLoonbelasting): Loonbelasting {
  const loon = Math.max(0, loonPerJaar);
  const aftrek = Math.min(porcentaje(loon, regels.aftrekPercentage), regels.aftrekMax);
  const zuiverLoon = loon - aftrek;
  const belastbaarLoon = Math.max(0, zuiverLoon - regels.vrijeSom);
  return { aftrek, zuiverLoon, belastbaarLoon, belasting: aplicarEscalaMarginal(regels.tarief, belastbaarLoon) };
}

export interface Nettoloon {
  loonbelasting: number;
  aovPremie: number;
  netto: number;
  zuiverLoon: number;
  belastbaarLoon: number;
}

// Maandbedragen zonder afronding; de calculadora rondt af waar ze toont.
export function nettoloonPerMaand(bruto: number, pensioenpremie: number, zestigPlus: boolean, regels: RegelsLoonbelasting, aovPercentage: number): Nettoloon {
  const lb = loonbelastingPerJaar((bruto - pensioenpremie) * 12, regels);
  const loonbelasting = lb.belasting / 12;
  const aovPremie = zestigPlus ? 0 : porcentaje(lb.zuiverLoon / 12, aovPercentage);
  return { loonbelasting, aovPremie, netto: bruto - pensioenpremie - loonbelasting - aovPremie, zuiverLoon: lb.zuiverLoon / 12, belastbaarLoon: lb.belastbaarLoon / 12 };
}

export function marginaalTarief(tarief: readonly FilaEscala[], bedrag: number): number {
  if (bedrag <= 0) return 0;
  for (const f of tarief) if (f.hasta === null || bedrag <= f.hasta) return f.tasa;
  return tarief[tarief.length - 1]?.tasa ?? 0;
}
