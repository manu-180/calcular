import { definirCasos } from "@/motor/calculo";
import calculadora from "./hourly-rate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "M6 000 a month, five-day week",
    origen: { tipo: "recalculado", detalle: "Labour Act s. 187(1)(a): 6 000 / 195 = 30.77. Day of 9 hours 276.92. Week of 45 hours 1 384.62." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, periodo: "monthly", sereno: false, semana: "five-day" },
    esperado: { hora: 30.77, dia: 276.92, semana: 1384.62, divisor: 195 },
  },
  {
    nombre: "Weekly wage, six-day week",
    origen: { tipo: "recalculado", detalle: "s. 187(1)(b): 1 350 / 45 = 30. Day of 8 hours 240." },
    fecha: "2026-10-27",
    entrada: { salario: 1350, periodo: "weekly", sereno: false, semana: "six-day" },
    esperado: { hora: 30, dia: 240, divisor: 45 },
  },
  {
    nombre: "Security guard paid monthly",
    origen: { tipo: "recalculado", detalle: "s. 187(2)(a): 3 900 / 260 = 15." },
    fecha: "2026-10-27",
    entrada: { salario: 3900, periodo: "monthly", sereno: true, semana: "six-day" },
    esperado: { hora: 15, dia: null, divisor: 260 },
  },
]);
