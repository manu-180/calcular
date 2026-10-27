import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

const TABLA = { "mw.severance-weeks": { "years-1-5": 2, "years-6-10": 3, "years-11-plus": 4 } };

export default definirCasos(calculadora, [
  {
    nombre: "Eight years at K50,000 a week (formula only)",
    origen: { tipo: "recalculado", detalle: "5 × 2 + 3 × 3 = 19 weeks × 50,000 = 950,000, with the schedule passed in as fixed values." },
    fecha: "2026-10-27",
    entrada: { anios: 8, semanal: 50000 },
    valores: TABLA,
    esperado: { total: 950000, semanas: 19 },
  },
  {
    nombre: "Twelve years (formula only)",
    origen: { tipo: "recalculado", detalle: "5 × 2 + 5 × 3 + 2 × 4 = 33 weeks × 10,000 = 330,000." },
    fecha: "2026-10-27",
    entrada: { anios: 12, semanal: 10000 },
    valores: TABLA,
    esperado: { total: 330000, semanas: 33 },
  },
]);
