import { definirCasos } from "@/motor/calculo";
import gananciaDeCapital from "./ganancia-de-capital";

export default definirCasos(gananciaDeCapital, [
  {
    nombre: "Venta de un terreno con ganancia",
    origen: { tipo: "recalculado", detalle: "Ley del ISR art. 10: impuesto único del 10 %. 2500000 − 1800000 = 700000; × 10 % = 70000." },
    fecha: "2026-10-12",
    entrada: { venta: 2500000, costo: 1800000 },
    esperado: { ganancia: 700000, tasa: 10, impuesto: 70000, neto: 2430000 },
  },
  {
    nombre: "Venta con pérdida",
    origen: { tipo: "recalculado", detalle: "Sin ganancia no hay impuesto." },
    fecha: "2026-10-12",
    entrada: { venta: 900000, costo: 1000000 },
    esperado: { ganancia: 0, impuesto: 0 },
  },
]);
