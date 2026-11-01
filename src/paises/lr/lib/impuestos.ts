import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const FORMATO = new Intl.NumberFormat("en-LR", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function lrd(n: number): string {
  return `L$${FORMATO.format(n)}`;
}

export function usd(n: number): string {
  return `US$${FORMATO.format(n)}`;
}

export function impuestoAnual(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

// Fila de una escala cuyo valor no es un porcentaje (semanas por antigüedad, por ejemplo).
export function filaDe(escala: readonly FilaEscala[], valor: number): number {
  let r = escala[0].tasa;
  for (const f of escala) if (valor >= f.desde) r = f.tasa;
  return r;
}
