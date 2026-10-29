import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type PeriodoPaga = "fortnight" | "month" | "year";

export const PERIODOS: readonly { valor: PeriodoPaga; etiqueta: string }[] = [
  { valor: "fortnight", etiqueta: "Per fortnight" },
  { valor: "month", etiqueta: "Per month" },
  { valor: "year", etiqueta: "Per year" },
];

export const PERIODOS_ANIO: Readonly<Record<PeriodoPaga, number>> = { fortnight: 26, month: 12, year: 1 };

export function wst(n: number): string {
  return `WS$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// IS02 publishes the PAYE table by fortnight; the annual table in IS01 is the one monthly and yearly pay
// is measured against, since IS02 gives no monthly table.
export function impuestoPaye(bruto: number, periodo: PeriodoPaga, fortnightly: readonly FilaEscala[], anual: readonly FilaEscala[]): number {
  if (periodo === "fortnight") return aplicarEscalaMarginal(fortnightly, bruto);
  if (periodo === "month") return aplicarEscalaMarginal(anual, bruto * 12) / 12;
  return aplicarEscalaMarginal(anual, bruto);
}

export function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  let tasa = escala[0]?.tasa ?? 0;
  for (const f of escala) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export const REQUIERE_PAYE = {
  "ws.paye-fortnightly-bands": "escala",
  "ws.income-tax-bands": "escala",
} as const;
