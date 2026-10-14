import { definirCasos } from "@/motor/calculo";
import calculadora from "./student-loan-repayment";

export default definirCasos(calculadora, [
  {
    nombre: "Plan 2 on £40,000",
    origen: { tipo: "recalculado", detalle: "(40,000 − 29,385) × 9% = 955.35 a year; 79.61 a month." },
    fecha: "2026-10-14",
    entrada: { salario: 40000, plan: "plan-2", posgrado: false },
    esperado: { total: 955.35, mensual: 79.61, umbral: 29385 },
  },
  {
    nombre: "Plan 5 and Postgraduate Loan on £30,000",
    origen: { tipo: "recalculado", detalle: "Plan 5 (30,000 − 25,000) × 9% = 450. PGL (30,000 − 21,000) × 6% = 540. Total 990." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, plan: "plan-5", posgrado: true },
    esperado: { prestamo: 450, posgrado: 540, total: 990 },
  },
  {
    nombre: "Plan 4 below the threshold",
    origen: { tipo: "recalculado", detalle: "30,000 is below the Plan 4 threshold of 33,795: nothing to repay." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, plan: "plan-4", posgrado: false },
    esperado: { total: 0 },
  },
  {
    nombre: "Plan 1 on £30,000",
    origen: { tipo: "recalculado", detalle: "(30,000 − 26,900) × 9% = 279." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, plan: "plan-1", posgrado: false },
    esperado: { total: 279 },
  },
  {
    nombre: "No loan chosen",
    origen: { tipo: "recalculado", detalle: "Without a plan and without a Postgraduate Loan there is nothing to work out." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, plan: "none", posgrado: false },
    esperaError: true,
  },
]);
