import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Five-day week, 12 months, 4 days taken",
    origen: { tipo: "recalculado", detalle: "BCEA section 22: days normally worked in six weeks, 6 × 5 = 30 per 36-month cycle. 30 − 4 = 26 left. 36 − 12 = 24 months to a new cycle." },
    fecha: "2026-10-14",
    entrada: { diasSemana: 5, meses: 12, trabajados: null, tomados: 4 },
    esperado: { ciclo: 30, disponibles: 26, mesesRestantes: 24 },
  },
  {
    nombre: "Six-day week, second cycle",
    origen: { tipo: "recalculado", detalle: "6 × 6 = 36 days. At 40 months the second cycle started 4 months ago: 32 months to go." },
    fecha: "2026-10-14",
    entrada: { diasSemana: 6, meses: 40, trabajados: null, tomados: 0 },
    esperado: { ciclo: 36, disponibles: 36, mesesRestantes: 32 },
  },
  {
    nombre: "First six months, 80 days worked",
    origen: { tipo: "recalculado", detalle: "One day per 26 days worked: 80 / 26 = 3 full days, 1 taken, 2 left." },
    fecha: "2026-10-14",
    entrada: { diasSemana: 5, meses: 4, trabajados: 80, tomados: 1 },
    esperado: { disponibles: 2 },
  },
  {
    nombre: "First six months without days worked",
    origen: { tipo: "recalculado", detalle: "The days worked are needed in the first six months." },
    fecha: "2026-10-14",
    entrada: { diasSemana: 5, meses: 3, trabajados: null, tomados: 0 },
    esperaError: true,
  },
]);
