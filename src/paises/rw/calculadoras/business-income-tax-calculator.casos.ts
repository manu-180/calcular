import { definirCasos } from "@/motor/calculo";
import calculadora from "./business-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Company with RWF 50,000,000 profit",
    origen: { tipo: "recalculado", detalle: "28% × 50,000,000 = 14,000,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "company", beneficio: 50000000 },
    esperado: { impuesto: 14000000, despues: 36000000 },
  },
  {
    nombre: "Sole trader with RWF 5,000,000 profit",
    origen: {
      tipo: "recalculado",
      detalle: "Annual bands: (1,200,000 − 720,000) × 10% + (2,400,000 − 1,200,000) × 20% + (5,000,000 − 2,400,000) × 30% = 48,000 + 240,000 + 780,000 = 1,068,000.",
    },
    fecha: "2026-10-26",
    entrada: { tipo: "individual", beneficio: 5000000 },
    esperado: { impuesto: 1068000 },
  },
]);
