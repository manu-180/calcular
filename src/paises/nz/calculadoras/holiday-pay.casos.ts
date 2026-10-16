import { definirCasos } from "@/motor/calculo";
import calculadora from "./holiday-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Average weekly earnings beat ordinary pay",
    origen: { tipo: "recalculado", detalle: "AWE 57,200 / 52 = 1,100. OWP 1,000. The greater is 1,100. Two weeks: 2,200." },
    fecha: "2026-10-14",
    entrada: { modo: "taking", ganancias: 57200, semanaOrdinaria: 1000, semanasTrabajadas: 52, semanasVacaciones: 2 },
    esperado: { semanal: 1100, total: 2200, awe: 1100, owp: 1000, base: "Average weekly earnings", derecho: 4 },
  },
  {
    nombre: "Ordinary weekly pay is higher after a pay rise",
    origen: { tipo: "recalculado", detalle: "AWE 52,000 / 52 = 1,000. OWP 1,150. The greater is 1,150. One and a half weeks: 1,725." },
    fecha: "2026-10-14",
    entrada: { modo: "taking", ganancias: 52000, semanaOrdinaria: 1150, semanasTrabajadas: 52, semanasVacaciones: 1.5 },
    esperado: { semanal: 1150, total: 1725, base: "Ordinary weekly pay" },
  },
  {
    nombre: "Less than 12 months worked",
    origen: { tipo: "recalculado", detalle: "AWE uses the weeks worked: 30,000 / 26 = 1,153.85. OWP 1,100. One week: 1,153.85." },
    fecha: "2026-10-14",
    entrada: { modo: "taking", ganancias: 30000, semanaOrdinaria: 1100, semanasTrabajadas: 26, semanasVacaciones: 1 },
    esperado: { awe: 1153.85, total: 1153.85 },
  },
  {
    nombre: "8% on $40,000",
    origen: { tipo: "recalculado", detalle: "40,000 × 8% = 3,200." },
    fecha: "2026-10-14",
    entrada: { modo: "payg", ganancias: 40000, semanaOrdinaria: 0, semanasTrabajadas: 52, semanasVacaciones: 0 },
    esperado: { total: 3200, semanal: null },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Earnings of 0 are not valid." },
    fecha: "2026-10-14",
    entrada: { modo: "payg", ganancias: 0, semanaOrdinaria: 0, semanasTrabajadas: 52, semanasVacaciones: 0 },
    esperaError: true,
  },
]);
