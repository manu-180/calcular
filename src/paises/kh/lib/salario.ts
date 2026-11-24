import { aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQ_SALARIO = {
  "kh.tos-brackets": "escala",
  "kh.dependent-allowance": "numero",
} as const;

// Base mensual de un residente: el sueldo menos la rebaja por hijos a cargo y un cónyuge que no trabaja
// (anukret 48, art. 3). Nunca baja de cero.
export function baseResidente(salario: number, dependientes: number, rebaja: number): number {
  return Math.max(0, salario - dependientes * rebaja);
}

export function impuestoResidente(escala: readonly FilaEscala[], base: number): number {
  return aplicarEscalaMarginal(escala, base);
}

export function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  const fila = escala.find((f) => f.hasta === null || base <= f.hasta);
  return fila?.tasa ?? 0;
}

export function salarioDiario(salario: number, dias: number): number {
  if (dias <= 0) throw new ErrorEntrada("សូមបញ្ចូលចំនួនថ្ងៃធ្វើការក្នុងមួយខែ។", "diasMes");
  return salario / dias;
}

const MESES = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

export function mesAnio(fecha: string): string {
  return [MESES[Number(fecha.slice(5, 7)) - 1], fecha.slice(0, 4)].join(" ");
}
