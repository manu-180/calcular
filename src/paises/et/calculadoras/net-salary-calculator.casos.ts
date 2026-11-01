import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 10,000 gross",
    origen: { tipo: "recalculado", detalle: "Tax 2,000 × 15% + 3,000 × 20% + 3,000 × 25% = 1,650. Pension 7% = 700. Net 10,000 − 1,650 − 700 = 7,650." },
    fecha: "2026-10-27",
    entrada: { bruto: 10000, otras: 0 },
    esperado: { neto: 7650, impuesto: 1650, pension: 700, marginal: 25 },
  },
  {
    nombre: "ETB 20,000 gross, top band",
    origen: { tipo: "recalculado", detalle: "Tax 300 + 600 + 750 + 1,200 + 6,000 × 35% = 4,950. Pension 1,400. Net 13,650." },
    fecha: "2026-10-27",
    entrada: { bruto: 20000, otras: 0 },
    esperado: { neto: 13650, impuesto: 4950, pension: 1400, marginal: 35 },
  },
  {
    nombre: "ETB 2,000 gross pays no tax",
    origen: { tipo: "recalculado", detalle: "The first ETB 2,000 is taxed at 0%. Pension 140. Net 1,860." },
    fecha: "2026-10-27",
    entrada: { bruto: 2000, otras: 0 },
    esperado: { neto: 1860, impuesto: 0, pension: 140 },
  },
  {
    nombre: "ETB 3,000 gross with ETB 500 loan repayment",
    origen: { tipo: "recalculado", detalle: "Tax 1,000 × 15% = 150. Pension 210. Net 3,000 − 150 − 210 − 500 = 2,140." },
    fecha: "2026-10-27",
    entrada: { bruto: 3000, otras: 500 },
    esperado: { neto: 2140, totalDeducido: 860 },
  },
  {
    nombre: "Zero salary is rejected",
    origen: { tipo: "recalculado", detalle: "A gross salary of zero is not a valid input." },
    fecha: "2026-10-27",
    entrada: { bruto: 0, otras: 0 },
    esperaError: true,
  },
]);
