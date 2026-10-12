import { definirCasos } from "@/motor/calculo";
import isrSobreUtilidades from "./isr-sobre-utilidades";

export default definirCasos(isrSobreUtilidades, [
  {
    nombre: "Utilidad de Q400,000",
    origen: { tipo: "recalculado", detalle: "Decreto 10-2012 art. 36: (1000000 − 600000) × 25 % = 100000; entre 4 = 25000." },
    fecha: "2026-10-12",
    entrada: { ingresos: 1000000, gastos: 600000 },
    esperado: { renta: 400000, tasa: 25, anual: 100000, trimestral: 25000 },
  },
  {
    nombre: "Pérdida",
    origen: { tipo: "recalculado", detalle: "Gastos mayores que ingresos: renta 0, ISR 0." },
    fecha: "2026-10-12",
    entrada: { ingresos: 100000, gastos: 150000 },
    esperado: { renta: 0, anual: 0 },
  },
]);
