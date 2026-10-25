import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_PAYE = {
  "mu.income-tax-bands": "escala",
  "mu.dependent-deduction": "mapa",
  "mu.paye-pay-periods": "numero",
} as const;

export const REQUIERE_CSG = {
  "mu.csg-threshold": "numero",
  "mu.csg-employee-low": "numero",
  "mu.csg-employee-high": "numero",
  "mu.csg-employer-low": "numero",
  "mu.csg-employer-high": "numero",
} as const;

export const REQUIERE_NSF = {
  "mu.nsf-employee": "numero",
  "mu.nsf-employer": "numero",
  "mu.nsf-minimum-wage": "numero",
  "mu.nsf-maximum-wage": "numero",
} as const;

export const DEPENDIENTES = [
  { valor: "0", etiqueta: "None" },
  { valor: "1", etiqueta: "1" },
  { valor: "2", etiqueta: "2" },
  { valor: "3", etiqueta: "3" },
  { valor: "4", etiqueta: "4 or more" },
] as const;

export interface TasasCsg {
  umbral: number;
  empleadoBaja: number;
  empleadoAlta: number;
  empleadorBaja: number;
  empleadorAlta: number;
}

export function tasasCsg(v: { readonly [K in keyof typeof REQUIERE_CSG]: number }): TasasCsg {
  return {
    umbral: v["mu.csg-threshold"],
    empleadoBaja: v["mu.csg-employee-low"],
    empleadoAlta: v["mu.csg-employee-high"],
    empleadorBaja: v["mu.csg-employer-low"],
    empleadorAlta: v["mu.csg-employer-high"],
  };
}

export function topesNsf(v: { readonly [K in keyof typeof REQUIERE_NSF]: number }): TopesNsf {
  return { minimo: v["mu.nsf-minimum-wage"], maximo: v["mu.nsf-maximum-wage"] };
}

// Sección 4 de la Social Contribution and Social Benefits Act: la tasa depende de si el sueldo básico
// del mes supera el límite, y se aplica sobre todo el sueldo (no es marginal).
export function csg(basico: number, t: TasasCsg): { empleado: number; empleador: number; tasaEmpleado: number; tasaEmpleador: number } {
  const alta = basico > t.umbral;
  const tasaEmpleado = alta ? t.empleadoAlta : t.empleadoBaja;
  const tasaEmpleador = alta ? t.empleadorAlta : t.empleadorBaja;
  return { empleado: porcentaje(basico, tasaEmpleado), empleador: porcentaje(basico, tasaEmpleador), tasaEmpleado, tasaEmpleador };
}

export interface TopesNsf {
  minimo: number;
  maximo: number;
}

// El NSF se paga sobre el sueldo básico, pero nunca por debajo del mínimo ni por encima del máximo
// que publica la MRA para cada año.
export function baseNsf(basico: number, t: TopesNsf): number {
  if (basico <= 0) return 0;
  return Math.min(Math.max(basico, t.minimo), t.maximo);
}

export interface Paye {
  anualGravable: number;
  impuestoAnual: number;
  mensual: number;
  marginal: number;
}

// PAYE acumulativo: la MRA reparte el año en 13 períodos (12 meses y el bono de fin de año) y resta
// 1/13 de las deducciones en cada uno. Con un sueldo parejo, el PAYE del mes es el impuesto anual sobre
// 13 sueldos menos las deducciones, dividido por 13. El monto retenido se redondea hacia abajo al rupee.
export function payeMensual(emolumentos: number, deduccionesAnuales: number, bandas: readonly FilaEscala[], periodos: number): Paye {
  const anualGravable = Math.max(0, emolumentos * periodos - Math.max(0, deduccionesAnuales));
  const impuestoAnual = aplicarEscalaMarginal(bandas, anualGravable);
  return {
    anualGravable,
    impuestoAnual,
    mensual: Math.floor(impuestoAnual / periodos),
    marginal: tasaMarginal(bandas, anualGravable),
  };
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}
