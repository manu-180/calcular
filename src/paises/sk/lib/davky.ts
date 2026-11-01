import { nahor4 } from "./zaokruhlenie";

// Denný vymeriavací základ: rozhodujúce obdobie je spravidla predchádzajúci rok (365 dní); se pide la mzda
// mensual y se anualiza. Se redondea a cuatro decimales hacia arriba con el tope del año en que nace el derecho.
export function dennyZaklad(mzda: number, maxDvz: number): number {
  return Math.min(nahor4((mzda * 12) / 365), maxDvz);
}
