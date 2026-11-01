import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$12,000 a month, 10 overtime hours",
    origen: {
      tipo: "recalculado",
      detalle: "Hourly: 12,000 / (4.333 × 45) = 61.54. Overtime 10 × 61.54 × 1.5 = 923.10.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 12000, horasSemana: 45, extra: 10, extraDomingo: 0, noche: 0 },
    esperado: { hora: 61.54, pagoExtra: 923.1, total: 923.1, conSalario: 12923.1 },
  },
  {
    nombre: "Sunday overtime and night hours",
    origen: {
      tipo: "recalculado",
      detalle: "Hourly 8,000 / (4.333 × 40) = 46.16. Sunday overtime 4 × 46.16 × 2 = 369.28. Night 20 × 6% × 46.16 = 55.39. Total 424.67.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 8000, horasSemana: 40, extra: 0, extraDomingo: 4, noche: 20 },
    esperado: { hora: 46.16, pagoDomingo: 369.28, pagoNoche: 55.39, total: 424.67 },
  },
  {
    nombre: "60 ordinary hours entered: the rate uses 45",
    origen: { tipo: "recalculado", detalle: "Hourly 12,000 / (4.333 × 45) = 61.54, same as with 45 hours." },
    fecha: "2026-10-27",
    entrada: { salario: 12000, horasSemana: 60, extra: 0, extraDomingo: 0, noche: 0 },
    esperado: { hora: 61.54, total: 0 },
  },
]);
