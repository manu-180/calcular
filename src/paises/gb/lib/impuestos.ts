import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const OPCIONES_REGION_TEXTO = {
  "england-wales-ni": "England, Wales or Northern Ireland",
  scotland: "Scotland",
} as const;

// HMRC quita £1 de Personal Allowance por cada £2 completos por encima del límite.
export function personalAllowance(ingreso: number, allowance: number, limite: number): number {
  if (ingreso <= limite) return allowance;
  return Math.max(0, allowance - Math.floor((ingreso - limite) / 2));
}

export interface ImpuestoRenta {
  allowance: number;
  gravable: number;
  impuesto: number;
}

export function impuestoRenta(ingreso: number, escala: readonly FilaEscala[], allowance: number, limite: number): ImpuestoRenta {
  const pa = personalAllowance(ingreso, allowance, limite);
  const gravable = Math.max(0, ingreso - pa);
  return { allowance: pa, gravable, impuesto: aplicarEscalaMarginal(escala, gravable) };
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  if (gravable <= 0) return 0;
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

export interface UmbralesNi {
  umbral: number;
  limite: number;
  tasa: number;
  tasaAlta: number;
}

export function niPorTramos(base: number, u: UmbralesNi): number {
  const principal = Math.max(0, Math.min(base, u.limite) - u.umbral) * (u.tasa / 100);
  const alta = Math.max(0, base - u.limite) * (u.tasaAlta / 100);
  return principal + alta;
}

export function sobreUmbral(base: number, umbral: number, tasa: number): number {
  return Math.max(0, base - umbral) * (tasa / 100);
}

export function libras(n: number): string {
  return `£${n.toLocaleString("en-GB", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
