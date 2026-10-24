import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 300,000 a month with EOBI",
    origen: { tipo: "recalculado", detalle: "Tax 416,000 / 12 = 34,666.67; EOBI 1% of 40,700 = 407. Net 300,000 − 34,666.67 − 407 = 264,926.33." },
    fecha: "2026-10-17",
    entrada: { mensual: 300000, eobi: true, otros: 0 },
    esperado: { neto: 264926.33, impuesto: 34666.67, eobi: 407 },
  },
  {
    nombre: "Rs. 50,000 without EOBI",
    origen: { tipo: "recalculado", detalle: "600,000 a year is tax free; net 50,000." },
    fecha: "2026-10-17",
    entrada: { mensual: 50000, eobi: false, otros: 0 },
    esperado: { neto: 50000, impuesto: 0 },
  },
]);
