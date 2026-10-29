import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type Periodo = "week" | "fortnight" | "month" | "year";

export const PERIODOS_POR_ANIO: Readonly<Record<Periodo, number>> = { week: 52, fortnight: 26, month: 12, year: 1 };

export const OPCIONES_PERIODO = [
  { valor: "week", etiqueta: "Week" },
  { valor: "fortnight", etiqueta: "Fortnight" },
  { valor: "month", etiqueta: "Month" },
  { valor: "year", etiqueta: "Year" },
] as const;

export function fjd(n: number): string {
  return `FJ$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// El impuesto de la tabla de FRCS es por tramos sobre el ingreso gravable anual. Una persona con sueldo
// fijo paga cada periodo la parte proporcional (Regulation 6 del Income Tax (Withholding Tax) Regulations 2013).
export function impuestoAnual(escala: readonly FilaEscala[], anual: number, redondear: (n: number) => number): number {
  return redondear(aplicarEscalaMarginal(escala, anual));
}

export function tasaMarginal(escala: readonly FilaEscala[], anual: number): number {
  let tasa = escala[0].tasa;
  for (const f of escala) if (anual > f.desde) tasa = f.tasa;
  return tasa;
}
