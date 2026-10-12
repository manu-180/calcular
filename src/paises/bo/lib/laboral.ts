import { enMapa } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { anioDe, fecha, mayor, mesesYDiasInclusive, type Tiempo } from "./fechas";

// El Ministerio de Trabajo divide el sueldo por 30 para el día (vacación, duodécimas) aunque el mes
// tenga 28 o 31 días.
export const DIAS_DEL_MES = 30;

// D.S. 17288: "de 1 a 5 años, 15 días; de 5 a 10 años, 20 días; de 10 años adelante, 30 días".
// Se mira el año de servicio que se está cumpliendo: el 5.º todavía da 15 y el 6.º ya da 20.
export function claveVacaciones(anioDeServicio: number): string {
  if (anioDeServicio <= 5) return "hasta-5";
  if (anioDeServicio <= 10) return "hasta-10";
  return "mas-10";
}

export function diasDeVacacion(mapa: Readonly<Record<string, number>>, anioDeServicio: number): number {
  return enMapa(mapa, claveVacaciones(anioDeServicio));
}

// Un sueldo por año, duodécimas por mes y 1/360 por día (D.S. 110). Cada parte se redondea por
// separado, como en los ejemplos de la guía del Ministerio de Trabajo (180,33 + 18,03).
export function montoPorTiempo(sueldo: number, t: Tiempo, redondear: (n: number) => number): number {
  return redondear(redondear(sueldo * t.anios) + redondear((sueldo / 12) * t.meses) + redondear((sueldo / 360) * t.dias));
}

export function montoDuodecimas(sueldo: number, d: Pick<Tiempo, "meses" | "dias">, redondear: (n: number) => number): number {
  return montoPorTiempo(sueldo, { anios: 0, meses: d.meses, dias: d.dias }, redondear);
}

// Vacación por fracción: la escala del año en curso dividida 12 por mes y 360 por día.
export function diasProporcionales(diasDelAnio: number, t: Pick<Tiempo, "meses" | "dias">): number {
  return (diasDelAnio / 12) * t.meses + (diasDelAnio / 360) * t.dias;
}

export interface Duodecimas {
  meses: number;
  dias: number;
  alcanzaMinimo: boolean;
}

// El aguinaldo se cuenta dentro de la gestión (enero a diciembre) y exige un mínimo de meses seguidos
// en esa gestión (instructivo anual del Ministerio de Trabajo).
export function duodecimasDeGestion(ingreso: FechaISO, hasta: FechaISO, mesesMinimos: number): Duodecimas {
  const inicio = mayor(ingreso, fecha(anioDe(hasta), 1, 1));
  const { meses, dias } = mesesYDiasInclusive(inicio, hasta);
  return { meses, dias, alcanzaMinimo: meses >= mesesMinimos };
}
