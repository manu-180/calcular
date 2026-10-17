import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface Paye {
  rentRelief: number;
  deducciones: number;
  gravable: number;
  impuesto: number;
  exento: boolean;
}

// Section 58 y section 162(t): quien cobra el salario mínimo nacional o menos no paga impuesto
// sobre ese empleo, aunque la escala daría cero igual por debajo de N800.000.
export function paye(
  bruto: number,
  deducciones: number,
  alquiler: number,
  bandas: readonly FilaEscala[],
  tasaRent: number,
  topeRent: number,
  minimoAnual: number,
): Paye {
  const rentRelief = Math.min((Math.max(0, alquiler) * tasaRent) / 100, topeRent);
  const total = Math.max(0, deducciones) + rentRelief;
  const gravable = Math.max(0, bruto - total);
  const exento = bruto <= minimoAnual;
  return { rentRelief, deducciones: total, gravable, impuesto: exento ? 0 : aplicarEscalaMarginal(bandas, gravable), exento };
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export function naira(n: number): string {
  return `₦${n.toLocaleString("en-NG", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
