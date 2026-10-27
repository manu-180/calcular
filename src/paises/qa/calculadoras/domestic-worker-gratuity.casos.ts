import { definirCasos } from "@/motor/calculo";
import calculadora from "./domestic-worker-gratuity";

export default definirCasos(calculadora, [
  {
    nombre: "QAR 1,800 wage, four years",
    origen: { tipo: "recalculado", detalle: "Law 15/2017 art. 15: 3 weeks per year. Weekly 1,800 ÷ 30 × 7 = 420. 3 × 4 × 420 = 5,040." },
    fecha: "2026-10-26",
    entrada: { salario: 1800, anios: 4, semanasContrato: 3, metodoSemanal: "30" },
    esperado: { semanal: 420, gratuidad: 5040, semanas: 12 },
  },
  {
    nombre: "Two and a half years, x12/52 method",
    origen: { tipo: "recalculado", detalle: "Weekly 2,600 × 12 ÷ 52 = 600. Gratuity 3 × 2.5 × 600 = 4,500." },
    fecha: "2026-10-26",
    entrada: { salario: 2600, anios: 2.5, semanasContrato: 3, metodoSemanal: "52" },
    esperado: { gratuidad: 4500, semanas: 7.5 },
  },
  {
    nombre: "Under one year",
    origen: { tipo: "recalculado", detalle: "0.5 years: no gratuity." },
    fecha: "2026-10-26",
    entrada: { salario: 1800, anios: 0.5, semanasContrato: 3, metodoSemanal: "30" },
    esperado: { gratuidad: 0 },
  },
]);
