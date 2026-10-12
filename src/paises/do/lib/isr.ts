import { porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// El mínimo exento del art. 296 es el techo de la primera fila de la escala (la exenta): así sigue solo
// cuando la DGII ajusta la escala.
export function minimoExento(escala: readonly FilaEscala[]): number {
  return escala[0].hasta ?? 0;
}

export interface TopesEducativos {
  topeIngreso: number;
  topeExento: number;
  topeDiscapacidad: number;
}

// Ley 179-09, art. 3 (Ley 30-26): hasta el 10 % del ingreso gravado y, además, hasta el 30 % del mínimo
// exento (50 % si los gastos son de una persona con discapacidad). Gana el menor de los topes.
export function deduccionEducativa(gastos: number, ingresoGravado: number, discapacidad: boolean, escala: readonly FilaEscala[], t: TopesEducativos): number {
  const tope = Math.min(porcentaje(ingresoGravado, t.topeIngreso), porcentaje(minimoExento(escala), discapacidad ? t.topeDiscapacidad : t.topeExento));
  return Math.max(0, Math.min(gastos, tope));
}
