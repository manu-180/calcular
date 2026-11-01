import { porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// PAYE según los ejemplos de la nota de política OGC 001/2026 de la BRA: el doceavo de la
// desgravación personal y del tramo bajo, redondeados al centavo, y cada parte del impuesto
// redondeada por separado. NIS sobre el bruto hasta el tope del mes; el fondo de resiliencia
// (0,25 %) sobre el bruto entero, sin tope.

export const REQUIERE_EMPLEADO = {
  "bb.income-tax": "escala",
  "bb.personal-allowance": "numero",
  "bb.nis-employee-rate": "numero",
  "bb.rrf-employee-rate": "numero",
  "bb.nis-ceiling-monthly": "numero",
} as const;

export interface ValoresEmpleado {
  "bb.income-tax": readonly FilaEscala[];
  "bb.personal-allowance": number;
  "bb.nis-employee-rate": number;
  "bb.rrf-employee-rate": number;
  "bb.nis-ceiling-monthly": number;
}

export interface Paye {
  desgravacion: number;
  imponible: number;
  bajo: number;
  alto: number;
  total: number;
}

/** PAYE de un período: la desgravación y el tramo bajo se reparten en `periodos` partes iguales. */
export function paye(bruto: number, desgravacionAnual: number, escala: readonly FilaEscala[], periodos: number, redondear: (n: number) => number): Paye {
  const desgravacion = redondear(desgravacionAnual / periodos);
  const tramoBajo = redondear((escala[0].hasta ?? 0) / periodos);
  const imponible = redondear(Math.max(0, bruto - desgravacion));
  const bajo = redondear(porcentaje(Math.min(imponible, tramoBajo), escala[0].tasa));
  const alto = redondear(porcentaje(Math.max(0, imponible - tramoBajo), escala[escala.length - 1].tasa));
  return { desgravacion, imponible, bajo, alto, total: redondear(bajo + alto) };
}

export interface DeduccionesMes {
  nis: number;
  rrf: number;
  paye: Paye;
  total: number;
  neto: number;
}

export function deduccionesMes(bruto: number, v: ValoresEmpleado, redondear: (n: number) => number): DeduccionesMes {
  const nis = redondear(porcentaje(Math.min(bruto, v["bb.nis-ceiling-monthly"]), v["bb.nis-employee-rate"]));
  const rrf = redondear(porcentaje(bruto, v["bb.rrf-employee-rate"]));
  const p = paye(bruto, v["bb.personal-allowance"], v["bb.income-tax"], 12, redondear);
  const total = redondear(nis + rrf + p.total);
  return { nis, rrf, paye: p, total, neto: redondear(bruto - total) };
}
