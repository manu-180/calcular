import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "M6 000 a month, 10 hours of overtime",
    origen: { tipo: "recalculado", detalle: "Labour Act s. 187: 6 000 / 195 = 30.77 an hour. s. 186(3): 10 × 30.77 × 1.25 = 384.63." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, periodo: "monthly", sereno: false, extra: 10, descanso: 0, feriado: 0 },
    esperado: { hora: 30.77, horaExtra: 38.46, pagoExtra: 384.63, total: 384.63 },
  },
  {
    nombre: "Rest day and public holiday hours",
    origen: { tipo: "recalculado", detalle: "s. 186(10): double rate. Rest day 8 × 30.77 × 2 = 492.32. Public holiday 9 × 30.77 × 2 = 553.86. Total 1 046.18." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, periodo: "monthly", sereno: false, extra: 0, descanso: 8, feriado: 9 },
    esperado: { pagoDescanso: 492.32, pagoFeriado: 553.86, total: 1046.18 },
  },
  {
    nombre: "Security guard paid monthly",
    origen: { tipo: "recalculado", detalle: "s. 187(2): 3 900 / 260 = 15 an hour. 20 × 15 × 1.25 = 375." },
    fecha: "2026-10-27",
    entrada: { salario: 3900, periodo: "monthly", sereno: true, extra: 20, descanso: 0, feriado: 0 },
    esperado: { hora: 15, total: 375 },
  },
  {
    nombre: "Weekly wage",
    origen: { tipo: "recalculado", detalle: "s. 187(1)(b): 1 350 / 45 = 30 an hour. 5 × 30 × 1.25 = 187.50." },
    fecha: "2026-10-27",
    entrada: { salario: 1350, periodo: "weekly", sereno: false, extra: 5, descanso: 0, feriado: 0 },
    esperado: { hora: 30, total: 187.5 },
  },
]);
