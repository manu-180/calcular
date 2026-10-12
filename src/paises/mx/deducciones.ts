import { porcentaje } from "@/motor/calculo";

// LISR art. 151, último párrafo: el total de deducciones personales no pasa de lo menor entre cinco UMA
// anuales y el 15 % de los ingresos (exentos incluidos).
export function topeDeducciones(ingresos: number, umaMensual: number, topeUma: number, topePorcentaje: number): number {
  return Math.min(topeUma * umaMensual * 12, porcentaje(ingresos, topePorcentaje));
}

export const REQUIERE_DEDUCCIONES = {
  "mx.tarifa-isr-anual": "escala",
  "mx.uma-mensual": "numero",
  "mx.tope-deducciones-uma": "numero",
  "mx.tope-deducciones-porcentaje": "numero",
} as const;
