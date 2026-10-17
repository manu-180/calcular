import { ErrorEntrada } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

export const CAMPOS_PROMEDIO = [
  {
    id: "salarios12",
    tipo: "moneda",
    etiqueta: "Wages earned in the 12 months before the leave or payment",
    ayuda: "Count every part of your wages: basic pay, commission, allowances and leave pay. Leave out discretionary bonuses.",
    min: 0,
    porDefecto: 216000,
  },
  {
    id: "diasPeriodo",
    tipo: "entero",
    etiqueta: "Days in that period you were employed",
    ayuda: "365 if you've worked there for 12 months or more.",
    min: 1,
    max: 366,
    porDefecto: 365,
  },
  {
    id: "diasExcluidos",
    tipo: "entero",
    etiqueta: "Days in that period with no pay or less than full pay",
    ayuda: "For example unpaid rest days, no-pay leave, sickness days or maternity leave paid at four-fifths.",
    min: 0,
    max: 366,
    porDefecto: 0,
  },
  {
    id: "salariosExcluidos",
    tipo: "moneda",
    etiqueta: "Amount paid for those days",
    min: 0,
    porDefecto: 0,
  },
] as const satisfies readonly Campo[];

export interface EntradaPromedio {
  salarios12: number;
  diasPeriodo: number;
  diasExcluidos: number;
  salariosExcluidos: number;
}

// Employment Ordinance: los días sin sueldo completo y lo cobrado por ellos se sacan antes de
// promediar, para que una licencia no baje el promedio (Concise Guide, apéndice 1).
export function salarioDiarioPromedio(e: EntradaPromedio): number {
  if (e.salarios12 <= 0) throw new ErrorEntrada("Enter the wages you earned in the 12 months.", "salarios12");
  const dias = e.diasPeriodo - e.diasExcluidos;
  if (dias <= 0) throw new ErrorEntrada("The days to leave out have to be fewer than the days you were employed.", "diasExcluidos");
  const salarios = e.salarios12 - e.salariosExcluidos;
  if (salarios <= 0) throw new ErrorEntrada("The amount paid for the days left out has to be less than your total wages.", "salariosExcluidos");
  return salarios / dias;
}

export function salarioMensualPromedio(e: EntradaPromedio): number {
  const dias = e.diasPeriodo - e.diasExcluidos;
  if (dias <= 0) throw new ErrorEntrada("The days to leave out have to be fewer than the days you were employed.", "diasExcluidos");
  const meses = (dias / 365) * 12;
  return (e.salarios12 - e.salariosExcluidos) / meses;
}
