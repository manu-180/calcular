import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 5,000,000 gratuity",
    origen: { tipo: "recalculado", detalle: "First Schedule, paragraph 1(2)(b)(iii): 0% up to Rs. 10,000,000." },
    fecha: "2026-10-26",
    entrada: { gratificacion: 5000000, pension: 0, etf: 0, compensacion: 0 },
    esperado: { impuesto: 0, retenido: 0, neto: 5000000 },
  },
  {
    nombre: "Rs. 12,000,000 gratuity and Rs. 3,000,000 ETF",
    origen: { tipo: "recalculado", detalle: "15,000,000 in all. 6% × (15,000,000 − 10,000,000) = 300,000. Table 3 retention: 12% × 10,000,000 = 1,200,000." },
    fecha: "2026-10-26",
    entrada: { gratificacion: 12000000, pension: 0, etf: 3000000, compensacion: 0 },
    esperado: { impuesto: 300000, retenido: 1200000, total: 15000000, neto: 14700000, tasaEfectiva: 2 },
  },
  {
    nombre: "Rs. 25,000,000 in terminal benefits",
    origen: { tipo: "recalculado", detalle: "600,000 + 12% × 5,000,000 = 1,200,000." },
    fecha: "2026-10-26",
    entrada: { gratificacion: 15000000, pension: 10000000, etf: 0, compensacion: 0 },
    esperado: { impuesto: 1200000 },
  },
]);
