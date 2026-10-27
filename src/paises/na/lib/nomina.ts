import { aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const OPCIONES_PERIODO = [
  { valor: "month", etiqueta: "A month" },
  { valor: "year", etiqueta: "A year" },
] as const;

export function impuestoAnual(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  let tasa = 0;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

// La SSC toma el sueldo básico entre un piso y un techo (regulación 1, definición de «basic wage»).
export function baseSsc(basico: number, piso: number, techo: number): number {
  return Math.min(Math.max(basico, piso), techo);
}

// Tabla 1 de la sección 10 del Labour Act: el sueldo mensual se pasa a semanal dividiendo por 4,333.
export function valorHora(mensual: number, semanasMes: number, horasSemana: number): number {
  return mensual / (semanasMes * horasSemana);
}

export function valorDia(mensual: number, semanasMes: number, diasSemana: number): number {
  return mensual / (semanasMes * diasSemana);
}

export function noNegativo(valor: number | null, campo: string, texto: string): void {
  if (valor !== null && valor < 0) throw new ErrorEntrada(texto, campo);
}

const FORMATO = new Intl.NumberFormat("en-NA", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export function nad(n: number): string {
  return `N$${FORMATO.format(n)}`;
}
