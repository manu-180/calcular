import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { zbritjaPersonale } from "./paga";

// Neni 22 también rige para la renta del negocio; la tabla está en meses y el artículo la da en años.
export function tatimiBiznesit(fitimi: number, zbritje: Readonly<Record<string, number>>, escala: readonly FilaEscala[]): number {
  const zbritja = zbritjaPersonale(fitimi / 12, zbritje) * 12;
  return aplicarEscalaMarginal(escala, Math.max(0, fitimi - zbritja));
}
