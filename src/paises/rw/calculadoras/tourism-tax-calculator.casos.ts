import { definirCasos } from "@/motor/calculo";
import calculadora from "./tourism-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Three nights at RWF 80,000",
    origen: { tipo: "recalculado", detalle: "240,000 × 3% = 7,200." },
    fecha: "2026-10-26",
    entrada: { tarifa: 80000, noches: 3 },
    esperado: { impuesto: 7200, alojamiento: 240000, total: 247200 },
  },
  {
    nombre: "One night at RWF 155,000",
    origen: { tipo: "recalculado", detalle: "155,000 × 3% = 4,650." },
    fecha: "2026-10-26",
    entrada: { tarifa: 155000, noches: 1 },
    esperado: { impuesto: 4650 },
  },
]);
