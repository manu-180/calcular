import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "QAR 8,000 basic, 6.5 years, ÷30 method",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 54: 3 weeks × 6.5 = 19.5 weeks. Weekly 8,000 ÷ 30 × 7 = 1,866.67. 19.5 × 1,866.666… = 36,400." },
    fecha: "2026-10-26",
    entrada: { basico: 8000, anios: 6.5, semanasContrato: 3, metodoSemanal: "30" },
    esperado: { semanas: 19.5, semanal: 1866.67, gratuidad: 36400 },
  },
  {
    nombre: "QAR 10,400 basic, 5 years, ×12÷52 method",
    origen: { tipo: "recalculado", detalle: "Weekly 10,400 × 12 ÷ 52 = 2,400. 3 × 5 = 15 weeks. 15 × 2,400 = 36,000." },
    fecha: "2026-10-26",
    entrada: { basico: 10400, anios: 5, semanasContrato: 3, metodoSemanal: "52" },
    esperado: { semanas: 15, semanal: 2400, gratuidad: 36000 },
  },
  {
    nombre: "Contract with 4 weeks per year",
    origen: { tipo: "recalculado", detalle: "4 × 2 = 8 weeks. Weekly 6,000 ÷ 30 × 7 = 1,400. 8 × 1,400 = 11,200." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, anios: 2, semanasContrato: 4, metodoSemanal: "30" },
    esperado: { gratuidad: 11200 },
  },
  {
    nombre: "Contract below the minimum uses 3 weeks",
    origen: { tipo: "recalculado", detalle: "2 weeks in the contract < 3: 3 × 2 = 6 weeks × 1,400 = 8,400." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, anios: 2, semanasContrato: 2, metodoSemanal: "30" },
    esperado: { gratuidad: 8400 },
  },
  {
    nombre: "Less than one year",
    origen: { tipo: "recalculado", detalle: "0.8 years < 1: nothing due." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, anios: 0.8, semanasContrato: 3, metodoSemanal: "30" },
    esperado: { gratuidad: 0 },
  },
]);
