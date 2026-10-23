import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Thirty days not worked on AED 12,000",
    origen: { tipo: "recalculado", detalle: "Article 43: compensation equal to the wage for the notice period. 12,000 / 30 x 30 = 12,000." },
    fecha: "2026-10-17",
    entrada: { salario: 12000, plazo: 30, trabajados: 0, metodoDiario: "30" },
    esperado: { compensacion: 12000, restantes: 30 },
  },
  {
    nombre: "Sixty days with 20 already worked",
    origen: { tipo: "recalculado", detalle: "40 remaining days x 400 = 16,000." },
    fecha: "2026-10-17",
    entrada: { salario: 12000, plazo: 60, trabajados: 20, metodoDiario: "30" },
    esperado: { compensacion: 16000, restantes: 40 },
  },
  {
    nombre: "A 14-day clause is raised to the 30-day minimum",
    origen: { tipo: "recalculado", detalle: "Notice can't be less than 30 days: 30 x 200 = 6,000." },
    fecha: "2026-10-17",
    entrada: { salario: 6000, plazo: 14, trabajados: 0, metodoDiario: "30" },
    esperado: { plazo: 30, compensacion: 6000 },
  },
  {
    nombre: "More days worked than the notice is not valid",
    origen: { tipo: "recalculado", detalle: "trabajados > plazo." },
    fecha: "2026-10-17",
    entrada: { salario: 6000, plazo: 30, trabajados: 40, metodoDiario: "30" },
    esperaError: true,
  },
]);
