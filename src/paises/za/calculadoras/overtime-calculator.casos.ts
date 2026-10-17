import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R12 000 a month, 10 hours of overtime",
    origen: { tipo: "recalculado", detalle: "Hourly 12 000 / (45 × 4.333) = 61.54. Overtime 10 × 61.54 × 1.5 = 923.10." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, horas: 45, extra: 10, domingo: 0, domingoHabitual: false, feriado: 0 },
    esperado: { hora: 61.54, pagoExtra: 923.1, total: 923.1 },
  },
  {
    nombre: "Sunday and public holiday hours",
    origen: { tipo: "recalculado", detalle: "Sunday 8 × 61.54 × 2 = 984.64. Public holiday 9 × 61.54 × 2 = 1 107.72. Total 2 092.36." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, horas: 45, extra: 0, domingo: 8, domingoHabitual: false, feriado: 9 },
    esperado: { pagoDomingo: 984.64, pagoFeriado: 1107.72, total: 2092.36 },
  },
  {
    nombre: "Sunday for someone who normally works Sundays",
    origen: { tipo: "recalculado", detalle: "BCEA section 16: one and a half times. 8 × 61.54 × 1.5 = 738.48." },
    fecha: "2026-10-14",
    entrada: { salario: 12000, horas: 45, extra: 0, domingo: 8, domingoHabitual: true, feriado: 0 },
    esperado: { pagoDomingo: 738.48 },
  },
  {
    nombre: "R30 000 a month is above the earnings threshold",
    origen: { tipo: "recalculado", detalle: "Hourly 30 000 / 194.985 = 153.86. Overtime 5 × 153.86 × 1.5 = 1 153.95. Yearly 360 000 is above 269 900.90." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, horas: 45, extra: 5, domingo: 0, domingoHabitual: false, feriado: 0 },
    esperado: { hora: 153.86, pagoExtra: 1153.95 },
  },
]);
