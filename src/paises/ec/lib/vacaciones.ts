import type { Tiempo } from "./fechas";

export interface ReglasVacaciones {
  dias: number;
  aniosSinAdicional: number;
  adicionalesMax: number;
}

// Días que da el año de servicio número n (n = 1 es el primer año). Desde el año siguiente a los
// cinco primeros se suma un día por cada año excedente, con tope (Código del Trabajo, art. 69).
export function diasDelAnio(n: number, r: ReglasVacaciones): number {
  return r.dias + Math.min(Math.max(n - r.aniosSinAdicional, 0), r.adicionalesMax);
}

// Proporcional del año de servicio en curso: los meses y días desde el último aniversario.
export function diasProporcionales(t: Tiempo, r: ReglasVacaciones): number {
  return diasDelAnio(t.anios + 1, r) * ((t.meses + t.dias / 30) / 12);
}
