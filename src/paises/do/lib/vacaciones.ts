import { enMapa } from "@/motor/calculo";
import type { Antiguedad } from "./fechas";

// Art. 180: «más de cinco meses», 6 días; ... «más de once meses», 12 días. Con 6 meses justos se pasó
// de cinco pero no de seis, así que corresponden 6 días. Se aplica a la fracción desde el último
// aniversario (o desde el ingreso, en el primer año).
export function diasVacacionesProporcionales(a: Antiguedad, escala: Readonly<Record<string, number>>): number {
  const pasados = a.dias > 0 ? a.meses : a.meses - 1;
  if (pasados < 5) return 0;
  return enMapa(escala, String(Math.min(pasados, 11)));
}
