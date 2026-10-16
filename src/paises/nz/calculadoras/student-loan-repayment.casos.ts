import { definirCasos } from "@/motor/calculo";
import calculadora from "./student-loan-repayment";

const IRD = "https://www.ird.govt.nz/student-loans/living-in-new-zealand-with-a-student-loan/repaying-my-student-loan-when-i-earn-salary-or-wages";

export default definirCasos(calculadora, [
  {
    nombre: "$600 a week in your main job",
    origen: { tipo: "oficial", url: IRD, detalle: "Inland Revenue example: earning $600 a week before tax, the repayment is $16.32 a week ((600 − 464) × 12%)." },
    fecha: "2026-10-14",
    entrada: { salario: 600, periodo: "week", trabajo: "main" },
    esperado: { semanal: 16.32, anual: 848.64 },
  },
  {
    nombre: "$60,000 a year in your main job",
    origen: { tipo: "recalculado", detalle: "(60,000 − 24,128) × 12% = 4,304.64 a year; a fortnight 165.56." },
    fecha: "2026-10-14",
    entrada: { salario: 60000, periodo: "year", trabajo: "main" },
    esperado: { anual: 4304.64, quincenal: 165.56, umbral: 24128 },
  },
  {
    nombre: "Under the threshold",
    origen: { tipo: "recalculado", detalle: "$20,000 a year is under 24,128, so nothing." },
    fecha: "2026-10-14",
    entrada: { salario: 20000, periodo: "year", trabajo: "main" },
    esperado: { anual: 0 },
  },
  {
    nombre: "$300 a week in a second job",
    origen: { tipo: "recalculado", detalle: "No threshold on secondary income: 300 × 12% = 36 a week." },
    fecha: "2026-10-14",
    entrada: { salario: 300, periodo: "week", trabajo: "secondary" },
    esperado: { semanal: 36, umbral: 0 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "Pay of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { salario: 0, periodo: "year", trabajo: "main" },
    esperaError: true,
  },
]);
