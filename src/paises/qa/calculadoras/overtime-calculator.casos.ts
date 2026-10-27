import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "QAR 5,200 basic, 48 hours, 10 day and 4 night hours",
    origen: { tipo: "recalculado", detalle: "Hourly 5,200 × 12 ÷ 52 ÷ 48 = 25. Day: 10 × 25 × 1.25 = 312.50. Night (art. 74, +50%): 4 × 25 × 1.5 = 150. Total 462.50." },
    fecha: "2026-10-26",
    entrada: { basico: 5200, horasSemana: 48, extra: 10, nocturnas: 4, turnos: false },
    esperado: { hora: 25, diurno: 312.5, nocturno: 150, total: 462.5 },
  },
  {
    nombre: "Shift worker at night",
    origen: { tipo: "recalculado", detalle: "Shift workers are excluded from the night rate: 4 × 25 × 1.25 = 125." },
    fecha: "2026-10-26",
    entrada: { basico: 5200, horasSemana: 48, extra: 0, nocturnas: 4, turnos: true },
    esperado: { nocturno: 125, total: 125 },
  },
  {
    nombre: "40-hour contract",
    origen: { tipo: "recalculado", detalle: "Hourly 4,000 × 12 ÷ 52 ÷ 40 = 23.0769. 8 × 23.0769 × 1.25 = 230.77." },
    fecha: "2026-10-26",
    entrada: { basico: 4000, horasSemana: 40, extra: 8, nocturnas: 0, turnos: false },
    esperado: { hora: 23.08, diurno: 230.77 },
  },
]);
