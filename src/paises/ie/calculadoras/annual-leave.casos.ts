import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Full time, 1,560 hours",
    origen: { tipo: "recalculado", detalle: "1,560 hours is at least 1,365, so 4 working weeks: 4 × 39 = 156 hours, 4 × 5 = 20 days." },
    fecha: "2026-10-14",
    entrada: { horasAnio: 1560, horasSemana: 39, diasSemana: 5, meses: 12 },
    esperado: { semanas: 4, horas: 156, dias: 20 },
  },
  {
    nombre: "Part time, 800 hours at 20 a week over 3 days",
    origen: { tipo: "recalculado", detalle: "8% of 800 = 64 hours = 3.2 weeks of 20 hours, or 9.6 days of a 3-day week." },
    fecha: "2026-10-14",
    entrada: { horasAnio: 800, horasSemana: 20, diasSemana: 3, meses: 0 },
    esperado: { horas: 64, semanas: 3.2, dias: 9.6, metodo: "8% of the hours you worked" },
  },
  {
    nombre: "Six months over 117 hours beats 8%",
    origen: { tipo: "recalculado", detalle: "Monthly: 6 / 3 = 2 weeks. 8% of 702 = 56.16 hours / 39 = 1.44 weeks. Best 2 weeks = 78 hours, 10 days." },
    fecha: "2026-10-14",
    entrada: { horasAnio: 702, horasSemana: 39, diasSemana: 5, meses: 6 },
    esperado: { semanas: 2, horas: 78, dias: 10 },
  },
  {
    nombre: "No weekly hours",
    origen: { tipo: "recalculado", detalle: "Normal weekly hours are needed to turn hours into weeks." },
    fecha: "2026-10-14",
    entrada: { horasAnio: 500, horasSemana: 0, diasSemana: 5, meses: 0 },
    esperaError: true,
  },
]);
