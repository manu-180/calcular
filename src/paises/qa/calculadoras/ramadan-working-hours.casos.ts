import { definirCasos } from "@/motor/calculo";
import calculadora from "./ramadan-working-hours";

export default definirCasos(calculadora, [
  {
    nombre: "Start at 08:00 with a one-hour break",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 73: 6 hours a day in Ramadan. 08:00 + 6 h + 1 h break = 15:00. 6 × 6 = 36 hours, no overtime." },
    fecha: "2026-10-26",
    entrada: { inicio: "08:00", descanso: 60, horasReales: 6, dias: 6 },
    esperado: { fin: "15:00", semana: 36, extra: 0 },
  },
  {
    nombre: "Eight hours a day in Ramadan",
    origen: { tipo: "recalculado", detalle: "2 hours over the daily limit × 5 days = 10. Week 40 - 36 = 4. Overtime is the larger: 10." },
    fecha: "2026-10-26",
    entrada: { inicio: "09:30", descanso: 90, horasReales: 8, dias: 5 },
    esperado: { fin: "17:00", semana: 40, extra: 10 },
  },
]);
