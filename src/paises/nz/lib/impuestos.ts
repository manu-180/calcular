import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export function impuestoRenta(ingreso: number, escala: readonly FilaEscala[]): number {
  return aplicarEscalaMarginal(escala, Math.max(0, ingreso));
}

export function tasaMarginal(escala: readonly FilaEscala[], ingreso: number): number {
  if (ingreso <= 0) return escala[0].tasa;
  let tasa = escala[0].tasa;
  for (const f of escala) if (ingreso > f.desde) tasa = f.tasa;
  return tasa;
}

// Para las tablas de "monto de umbral" (ESCT, códigos secundarios) la tasa entera depende de en qué
// tramo cae el monto: no se reparte por tramos como el impuesto a la renta. Los límites de IRD son
// inclusivos arriba ($18,720 es 10.5 %, $18,721 ya es 17.5 %).
export function filaPorMonto(escala: readonly FilaEscala[], monto: number): FilaEscala {
  for (const f of escala) if (f.hasta === null || monto <= f.hasta) return f;
  return escala[escala.length - 1];
}

export function accEarnersLevy(ingreso: number, tasa: number, tope: number): number {
  return (Math.min(Math.max(0, ingreso), tope) * tasa) / 100;
}

export interface UmbralesIetc {
  anual: number;
  minimo: number;
  inicioReduccion: number;
  maximo: number;
  tasaReduccion: number;
}

// IRD: $10 por semana entre $24,000 y $66,000; de $66,001 a $70,000 baja 13 centavos por dólar.
export function ietc(ingreso: number, u: UmbralesIetc): number {
  if (ingreso < u.minimo || ingreso > u.maximo) return 0;
  if (ingreso <= u.inicioReduccion) return u.anual;
  return Math.max(0, u.anual - ((ingreso - u.inicioReduccion) * u.tasaReduccion) / 100);
}

export function sobreUmbral(base: number, umbral: number, tasa: number): number {
  return (Math.max(0, base - umbral) * tasa) / 100;
}

export const PERIODOS = { year: 1, month: 12, fortnight: 26, week: 52 } as const;
export type Periodo = keyof typeof PERIODOS;

export function dolares(n: number): string {
  return `$${n.toLocaleString("en-NZ", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
