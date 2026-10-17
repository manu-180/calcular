import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "$30,000 a month, single, 2026/27",
    origen: {
      tipo: "recalculado",
      detalle: "MPF 1,500 a month (capped). 360,000 less 18,000 less 145,000 = 197,000. Tax 9,000 + 47,000 x 14% = 15,580, or 1,298.33 a month.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 30000, bono: 0, estado: "single", hijos: 0 },
    esperado: { netoMes: 28500, mpfMes: 1500, impuestoAnual: 15580, impuestoMes: 1298.33, despuesImpuesto: 27201.67, netoAnual: 326420 },
  },
  {
    nombre: "$20,000 a month with a $20,000 double pay",
    origen: {
      tipo: "recalculado",
      detalle: "MPF 1,000 for 11 months and 1,500 in the bonus month (40,000 capped at 30,000) = 12,500. 260,000 less 12,500 less 145,000 = 102,500. Tax 4,000 + 2,500 x 10% = 4,250.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 20000, bono: 20000, estado: "single", hijos: 0 },
    esperado: { mpfMes: 1000, impuestoAnual: 4250, netoAnual: 243250 },
  },
  {
    nombre: "Married with one child pays no tax on $25,000 a month",
    origen: { tipo: "recalculado", detalle: "300,000 less 15,000 MPF = 285,000, below 290,000 + 140,000 of allowances. Tax 0." },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000, bono: 0, estado: "married", hijos: 1 },
    esperado: { mpfMes: 1250, impuestoAnual: 0, netoMes: 23750 },
  },
  {
    nombre: "No salary is not valid",
    origen: { tipo: "recalculado", detalle: "Salary 0." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, bono: 0, estado: "single", hijos: 0 },
    esperaError: true,
  },
]);
