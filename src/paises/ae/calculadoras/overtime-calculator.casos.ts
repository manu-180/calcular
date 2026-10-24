import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const BASE = { basico: 6000, horasDia: 8, horas: 0, horasNoche: 0, diasDescanso: 0, turnos: false, metodoDiario: "30" } as const;

export default definirCasos(calculadora, [
  {
    nombre: "Ten overtime hours on AED 6,000",
    origen: { tipo: "recalculado", detalle: "Article 19: basic hourly wage + 25%. 6,000 / 30 / 8 = 25 an hour x 1.25 = 31.25 x 10 = 312.50." },
    fecha: "2026-10-17",
    entrada: { ...BASE, horas: 10 },
    esperado: { hora: 25, total: 312.5 },
  },
  {
    nombre: "Night overtime at 50%",
    origen: { tipo: "recalculado", detalle: "Between 10 pm and 4 am: 25 x 1.5 = 37.50 x 4 = 150." },
    fecha: "2026-10-17",
    entrada: { ...BASE, horasNoche: 4 },
    esperado: { noche: 150, total: 150 },
  },
  {
    nombre: "Shift worker's night hours stay at 25%",
    origen: { tipo: "recalculado", detalle: "Shift workers are excluded from the 50% night rate: 25 x 1.25 x 4 = 125." },
    fecha: "2026-10-17",
    entrada: { ...BASE, horasNoche: 4, turnos: true },
    esperado: { noche: 125 },
  },
  {
    nombre: "One rest day worked and paid",
    origen: { tipo: "recalculado", detalle: "Day wage 200 + 50% of the basic day wage (100) = 300." },
    fecha: "2026-10-17",
    entrada: { ...BASE, diasDescanso: 1 },
    esperado: { descanso: 300, total: 300 },
  },
  {
    nombre: "Nothing entered is not valid",
    origen: { tipo: "recalculado", detalle: "No hours or days." },
    fecha: "2026-10-17",
    entrada: BASE,
    esperaError: true,
  },
]);
