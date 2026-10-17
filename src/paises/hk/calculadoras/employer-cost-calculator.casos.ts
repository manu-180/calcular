import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$25,000 a month with double pay",
    origen: {
      tipo: "recalculado",
      detalle: "Salary 25,000 x 13 = 325,000. MPF 1,250 x 11 + 1,500 in the double pay month (50,000 capped at 30,000) = 15,250. Total 340,250.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000, meses: 13, otros: 0 },
    esperado: { sueldos: 325000, mpfAnual: 15250, total: 340250 },
  },
  {
    nombre: "$40,000 a month, 12 months, with $10,000 of insurance",
    origen: { tipo: "recalculado", detalle: "480,000 + 1,500 x 12 = 18,000 + 10,000 = 508,000." },
    fecha: "2026-10-16",
    entrada: { sueldo: 40000, meses: 12, otros: 10000 },
    esperado: { mpfAnual: 18000, total: 508000 },
  },
  {
    nombre: "Below the minimum the employer still contributes",
    origen: { tipo: "recalculado", detalle: "6,000 x 5% = 300 a month. 72,000 + 3,600 = 75,600." },
    fecha: "2026-10-16",
    entrada: { sueldo: 6000, meses: 12, otros: 0 },
    esperado: { mpfMes: 300, total: 75600 },
  },
  {
    nombre: "No salary is not valid",
    origen: { tipo: "recalculado", detalle: "Salary 0." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, meses: 12, otros: 0 },
    esperaError: true,
  },
]);
