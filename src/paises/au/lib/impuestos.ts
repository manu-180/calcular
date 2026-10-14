import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface Lito {
  maximo: number;
  umbral1: number;
  umbral2: number;
  base2: number;
  tope: number;
  tasa1: number;
  tasa2: number;
}

export function leerLito(montos: Readonly<Record<string, number>>, tasas: Readonly<Record<string, number>>): Lito {
  return {
    maximo: montos.maximo,
    umbral1: montos["umbral-1"],
    umbral2: montos["umbral-2"],
    base2: montos["base-2"],
    tope: montos.tope,
    tasa1: tasas["tasa-1"],
    tasa2: tasas["tasa-2"],
  };
}

export function lito(ingreso: number, l: Lito): number {
  if (ingreso <= l.umbral1) return l.maximo;
  if (ingreso <= l.umbral2) return l.maximo - ((ingreso - l.umbral1) * l.tasa1) / 100;
  if (ingreso <= l.tope) return Math.max(0, l.base2 - ((ingreso - l.umbral2) * l.tasa2) / 100);
  return 0;
}

export interface Medicare {
  tasa: number;
  umbral: number;
  limite: number;
  tasaReduccion: number;
}

// Ley del Medicare levy, s 7: sin levy hasta el umbral; entre el umbral y el phase-in limit el levy
// no puede pasar del 10 % del excedente sobre el umbral.
export function medicare(ingreso: number, m: Medicare): number {
  if (ingreso <= m.umbral) return 0;
  const pleno = (ingreso * m.tasa) / 100;
  if (ingreso > m.limite) return pleno;
  return Math.min(pleno, ((ingreso - m.umbral) * m.tasaReduccion) / 100);
}

export function tasaMarginal(escala: readonly FilaEscala[], ingreso: number): number {
  let tasa = 0;
  for (const f of escala) if (ingreso > f.desde) tasa = f.tasa;
  return tasa;
}

export interface Renta {
  bruto: number;
  offset: number;
  impuesto: number;
  medicare: number;
  total: number;
  marginal: number;
}

// El LITO es no reembolsable: baja el impuesto hasta cero, nunca el Medicare levy.
export function rentaResidente(ingreso: number, escala: readonly FilaEscala[], l: Lito, m: Medicare, conMedicare = true): Renta {
  const base = Math.max(0, ingreso);
  const bruto = aplicarEscalaMarginal(escala, base);
  const offset = Math.min(bruto, lito(base, l));
  const impuesto = bruto - offset;
  const levy = conMedicare ? medicare(base, m) : 0;
  return { bruto, offset, impuesto, medicare: levy, total: impuesto + levy, marginal: tasaMarginal(escala, base) };
}

export interface UmbralesHelp {
  umbral: number;
  tramo2: number;
  cuota2: number;
  tope: number;
  tasa1: number;
  tasa2: number;
  tasaTotal: number;
}

export function leerHelp(montos: Readonly<Record<string, number>>, tasas: Readonly<Record<string, number>>): UmbralesHelp {
  return {
    umbral: montos.umbral,
    tramo2: montos["tramo-2"],
    cuota2: montos["cuota-2"],
    tope: montos.tope,
    tasa1: tasas["tasa-1"],
    tasa2: tasas["tasa-2"],
    tasaTotal: tasas["tasa-total"],
  };
}

// Desde 2025-26 el repago es marginal hasta el tope; por encima es un porcentaje del ingreso total.
export function repagoHelp(ingreso: number, h: UmbralesHelp): number {
  if (ingreso <= h.umbral) return 0;
  if (ingreso <= h.tramo2) return ((ingreso - h.umbral) * h.tasa1) / 100;
  if (ingreso <= h.tope) return h.cuota2 + ((ingreso - h.tramo2) * h.tasa2) / 100;
  return (ingreso * h.tasaTotal) / 100;
}

export function dolares(n: number): string {
  return `$${n.toLocaleString("en-AU", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
