import { porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// NIS por clase de ingresos (planilla del NIBTT): el aporte es un monto fijo por semana según la clase.
// Con sueldo mensual la clase sale de la columna mensual y se paga un aporte por cada lunes del mes.
// PAYE según el IRD: desgravación personal y, dentro de un tope común con los planes de pensión,
// el 70 % del NIS del empleado; 25 % hasta el tramo alto y 30 % por encima.

export const REQUIERE_NIS = {
  "tt.nis-employee-weekly": "escala",
  "tt.nis-employer-weekly": "escala",
  "tt.nis-employee-monthly": "escala",
  "tt.nis-employer-monthly": "escala",
} as const;

export const REQUIERE_PAYE = {
  "tt.personal-allowance": "numero",
  "tt.income-tax-rate": "numero",
  "tt.income-tax-higher-rate": "numero",
  "tt.income-tax-higher-band": "numero",
  "tt.nis-deductible-share": "numero",
  "tt.pension-nis-deduction-cap": "numero",
} as const;

export const REQUIERE_SURCHARGE = {
  "tt.health-surcharge-high": "numero",
  "tt.health-surcharge-low": "numero",
  "tt.health-surcharge-threshold-monthly": "numero",
  "tt.health-surcharge-threshold-weekly": "numero",
} as const;

export interface ValoresPaye {
  "tt.personal-allowance": number;
  "tt.income-tax-rate": number;
  "tt.income-tax-higher-rate": number;
  "tt.income-tax-higher-band": number;
  "tt.nis-deductible-share": number;
  "tt.pension-nis-deduction-cap": number;
}

export interface ValoresSurcharge {
  "tt.health-surcharge-high": number;
  "tt.health-surcharge-low": number;
  "tt.health-surcharge-threshold-monthly": number;
  "tt.health-surcharge-threshold-weekly": number;
}

export const SEMANAS_POR_ANIO = 52;

export type LunesDelMes = "4" | "5" | "promedio";

export const OPCIONES_LUNES = [
  { valor: "4" as const, etiqueta: "4 Mondays" },
  { valor: "5" as const, etiqueta: "5 Mondays" },
  { valor: "promedio" as const, etiqueta: "Average month (52 weeks over 12 months)" },
];

export function semanasDelMes(lunes: LunesDelMes): number {
  return lunes === "promedio" ? SEMANAS_POR_ANIO / 12 : Number(lunes);
}

/** Clase de NIS (1 a 16) para un ingreso; 0 si está por debajo de la primera clase. */
export function claseNis(escala: readonly FilaEscala[], ingreso: number): number {
  let clase = 0;
  escala.forEach((f, i) => {
    if (ingreso >= f.desde) clase = i + 1;
  });
  return clase;
}

/** Aporte semanal de la clase que corresponde al ingreso. */
export function aporteSemanal(escala: readonly FilaEscala[], ingreso: number): number {
  const clase = claseNis(escala, ingreso);
  return clase === 0 ? 0 : (escala[clase - 1].cuotaFija ?? 0);
}

/** Health Surcharge por semana según el sueldo del período. */
export function surchargeSemanal(pago: number, mensual: boolean, v: ValoresSurcharge): number {
  const umbral = mensual ? v["tt.health-surcharge-threshold-monthly"] : v["tt.health-surcharge-threshold-weekly"];
  return pago > umbral ? v["tt.health-surcharge-high"] : v["tt.health-surcharge-low"];
}

export interface ImpuestoAnual {
  deduccionNisPension: number;
  imponible: number;
  impuestoBajo: number;
  impuestoAlto: number;
  impuesto: number;
}

/** Impuesto a la renta del año sobre el ingreso, con la desgravación personal y el tope de NIS y pensión. */
export function impuestoAnual(ingreso: number, nisAnual: number, pensionAnual: number, otras: number, v: ValoresPaye): ImpuestoAnual {
  const deduccionNisPension = Math.min(v["tt.pension-nis-deduction-cap"], porcentaje(nisAnual, v["tt.nis-deductible-share"]) + pensionAnual);
  const imponible = Math.max(0, ingreso - v["tt.personal-allowance"] - deduccionNisPension - otras);
  const tramo = v["tt.income-tax-higher-band"];
  const impuestoBajo = porcentaje(Math.min(imponible, tramo), v["tt.income-tax-rate"]);
  const impuestoAlto = porcentaje(Math.max(0, imponible - tramo), v["tt.income-tax-higher-rate"]);
  return { deduccionNisPension, imponible, impuestoBajo, impuestoAlto, impuesto: impuestoBajo + impuestoAlto };
}

export type ValoresNomina = ValoresPaye & ValoresSurcharge & { "tt.nis-employee-monthly": readonly FilaEscala[] };

export interface NominaMensual {
  clase: number;
  nisSemana: number;
  surchargeSemana: number;
  nis: number;
  surcharge: number;
  paye: number;
  pension: number;
  total: number;
  neto: number;
  anual: ImpuestoAnual;
}

/** Descuentos de un sueldo mensual: NIS y Health Surcharge por lunes del mes, PAYE como un doceavo del impuesto del año. */
export function nominaMensual(
  bruto: number,
  lunes: LunesDelMes,
  pension: number,
  mayor60: boolean,
  v: ValoresNomina,
  redondear: (n: number) => number,
): NominaMensual {
  const semanas = semanasDelMes(lunes);
  const escala = v["tt.nis-employee-monthly"];
  const nisSemana = aporteSemanal(escala, bruto);
  const surchargeSemana = mayor60 ? 0 : surchargeSemanal(bruto, true, v);
  const nis = redondear(nisSemana * semanas);
  const surcharge = redondear(surchargeSemana * semanas);
  const anual = impuestoAnual(bruto * 12, nisSemana * SEMANAS_POR_ANIO, pension * 12, 0, v);
  const paye = redondear(anual.impuesto / 12);
  const total = redondear(nis + surcharge + paye + pension);
  return { clase: claseNis(escala, bruto), nisSemana, surchargeSemana, nis, surcharge, paye, pension: redondear(pension), total, neto: redondear(bruto - total), anual };
}
