import { definirCasos } from "@/motor/calculo";
import calculadora from "./daily-rate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RM2,600 a month, 8 hours a day",
    origen: { tipo: "recalculado", detalle: "Section 60I(1A): 2,600 / 26 = 100. Hourly 100 / 8 = 12.50. Overtime 12.50 × 1.5 = 18.75." },
    fecha: "2026-10-16",
    entrada: { base: "monthly", pago: 2600, horasDia: 8 },
    esperado: { diario: 100, hora: 12.5, horaExtra: 18.75, divisor: 26 },
  },
  {
    nombre: "RM600 a week, 8 hours a day",
    origen: { tipo: "recalculado", detalle: "Section 60I(1B): 600 / 6 = 100. Hourly 12.50." },
    fecha: "2026-10-16",
    entrada: { base: "weekly", pago: 600, horasDia: 8 },
    esperado: { diario: 100, hora: 12.5, divisor: 6 },
  },
  {
    nombre: "RM1,700 a month, 7.5 hours a day",
    origen: { tipo: "recalculado", detalle: "1,700 / 26 = 65.38. 65.38 / 7.5 = 8.72." },
    fecha: "2026-10-16",
    entrada: { base: "monthly", pago: 1700, horasDia: 7.5 },
    esperado: { diario: 65.38, hora: 8.72 },
  },
]);
