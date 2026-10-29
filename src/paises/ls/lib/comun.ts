import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";
import { diasEntre } from "@/motor/vigencia";

const FORMATO_MALOTI = new Intl.NumberFormat("en-LS", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function maloti(n: number): string {
  return `M${FORMATO_MALOTI.format(n)}`;
}

// Impuesto anual de un residente: 20 % y 30 % por tramos, menos el crédito no reembolsable.
export function impuestoAnual(bandas: readonly FilaEscala[], credito: number, imponible: number): { antes: number; aPagar: number } {
  const antes = aplicarEscalaMarginal(bandas, Math.max(0, imponible));
  return { antes, aPagar: Math.max(0, antes - credito) };
}

// RSL publica las bandas mensuales como la doceava parte de las anuales (M 6 480 = M 77 760 / 12), así
// que el PAYE de un mes es el impuesto anual de doce meses iguales dividido por 12.
export function payeMensual(bandas: readonly FilaEscala[], credito: number, imponibleMensual: number): number {
  return impuestoAnual(bandas, credito, imponibleMensual * 12).aPagar / 12;
}

export function tasaMarginal(bandas: readonly FilaEscala[], imponible: number): number {
  let tasa = bandas[0]?.tasa ?? 0;
  for (const f of bandas) if (imponible > f.desde) tasa = f.tasa;
  return tasa;
}

// Labour Act 2024, s. 187: el salario por hora es el mensual dividido por 195 (260 para serenos y
// guardias) o el semanal por 45 (60).
export const OPCIONES_PERIODO = [
  { valor: "monthly", etiqueta: "A month" },
  { valor: "weekly", etiqueta: "A week" },
] as const;

export function horaNormal(divisores: Readonly<Record<string, number>>, salario: number, periodo: "monthly" | "weekly", sereno: boolean): number {
  const clave = `${periodo}${sereno ? "-watchman" : ""}`;
  return salario / divisores[clave];
}

export const OPCIONES_SEMANA = [
  { valor: "five-day", etiqueta: "Five days a week" },
  { valor: "six-day", etiqueta: "Six days a week" },
] as const;

// Año fiscal de Lesoto: 1 de abril a 31 de marzo.
export function diasDelAnioFiscal(fecha: FechaISO): number {
  const anio = Number(fecha.slice(0, 4));
  const inicio = Number(fecha.slice(5, 7)) >= 4 ? anio : anio - 1;
  return diasEntre(`${inicio}-04-01` as FechaISO, `${inicio + 1}-04-01` as FechaISO);
}

export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const bisiesto = (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  const ultimo = [31, bisiesto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
  return `${anio}-${String(mes).padStart(2, "0")}-${String(Math.min(d, ultimo)).padStart(2, "0")}` as FechaISO;
}
