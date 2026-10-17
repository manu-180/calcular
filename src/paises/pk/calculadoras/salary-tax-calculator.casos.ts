import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000 a month",
    origen: { tipo: "recalculado", detalle: "1,200,000 a year: 1% of 600,000 = 6,000; 500 a month." },
    fecha: "2026-10-17",
    entrada: { mensual: 100000, extra: 0 },
    esperado: { impuesto: 6000, mensualImpuesto: 500, marginal: 1 },
  },
  {
    nombre: "Rs. 300,000 a month",
    origen: { tipo: "recalculado", detalle: "3,600,000: 316,000 + 25% of 400,000 = 416,000; 34,666.67 a month." },
    fecha: "2026-10-17",
    entrada: { mensual: 300000, extra: 0 },
    esperado: { impuesto: 416000, mensualImpuesto: 34666.67, marginal: 25 },
  },
  {
    nombre: "Rs. 1 million a month",
    origen: { tipo: "recalculado", detalle: "12,000,000: 1,424,000 + 35% of 5,000,000 = 3,174,000." },
    fecha: "2026-10-17",
    entrada: { mensual: 1000000, extra: 0 },
    esperado: { impuesto: 3174000, marginal: 35 },
  },
  {
    nombre: "Below the tax-free limit",
    origen: { tipo: "recalculado", detalle: "50,000 a month is 600,000 a year: 0%." },
    fecha: "2026-10-17",
    entrada: { mensual: 50000, extra: 0 },
    esperado: { impuesto: 0 },
  },
]);
