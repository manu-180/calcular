import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-pay";

export default definirCasos(calculadora, [
  {
    nombre: "QAR 9,000 wage, two years of service",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 96: 50 days on full pay. 9,000 ÷ 30 = 300 a day. 50 × 300 = 15,000." },
    fecha: "2026-10-26",
    entrada: { salario: 9000, anios: 2, metodoDiario: "30" },
    esperado: { dias: 50, despues: 35, diario: 300, pago: 15000 },
  },
  {
    nombre: "365-day method",
    origen: { tipo: "recalculado", detalle: "7,300 × 12 ÷ 365 = 240. 50 × 240 = 12,000." },
    fecha: "2026-10-26",
    entrada: { salario: 7300, anios: 1, metodoDiario: "365" },
    esperado: { diario: 240, pago: 12000 },
  },
  {
    nombre: "Less than a year",
    origen: { tipo: "recalculado", detalle: "0.5 years < 1: no paid maternity leave." },
    fecha: "2026-10-26",
    entrada: { salario: 9000, anios: 0.5, metodoDiario: "30" },
    esperado: { pago: 0 },
  },
]);
