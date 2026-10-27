import { definirCasos } from "@/motor/calculo";
import calculadora from "./winnings-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K500,000 win",
    origen: { tipo: "recalculado", detalle: "15% of 500,000 = 75,000. You receive 425,000." },
    fecha: "2026-10-27",
    entrada: { premio: 500000 },
    esperado: { impuesto: 75000, neto: 425000 },
  },
  {
    nombre: "K20,000 win is taxed too",
    origen: { tipo: "recalculado", detalle: "The tax-free thresholds are gone: 15% of 20,000 = 3,000." },
    fecha: "2026-10-27",
    entrada: { premio: 20000 },
    esperado: { impuesto: 3000, neto: 17000 },
  },
  {
    nombre: "Zero is rejected",
    origen: { tipo: "recalculado", detalle: "The win has to be above zero." },
    fecha: "2026-10-27",
    entrada: { premio: 0 },
    esperaError: true,
  },
]);
