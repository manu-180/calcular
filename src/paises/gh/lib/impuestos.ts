import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const FORMATO = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function cedis(n: number): string {
  return `GH₵${FORMATO.format(n)}`;
}

export function impuestoAnual(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  if (gravable <= 0) return escala[0].tasa;
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}
