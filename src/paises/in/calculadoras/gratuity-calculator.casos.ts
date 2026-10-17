import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "8 years on ₹60,000",
    origen: { tipo: "recalculado", detalle: "60,000 / 26 × 15 = 34,615.38 a year; × 8 = 2,76,923.08." },
    fecha: "2026-10-15",
    entrada: { salario: 60000, anios: 8, meses: 0, motivo: "resignation" },
    esperado: { gratuity: 276923.08, porAnio: 34615.38, anios: 8, elegible: "Yes" },
  },
  {
    nombre: "10 years and 7 months rounds up to 11",
    origen: { tipo: "recalculado", detalle: "Part of a year above six months counts as a year: 11 × 52,000 / 26 × 15 = 3,30,000." },
    fecha: "2026-10-15",
    entrada: { salario: 52000, anios: 10, meses: 7, motivo: "resignation" },
    esperado: { gratuity: 330000, anios: 11 },
  },
  {
    nombre: "Resignation after 4 years",
    origen: { tipo: "recalculado", detalle: "Less than five years of continuous service on resignation: no gratuity." },
    fecha: "2026-10-15",
    entrada: { salario: 52000, anios: 4, meses: 6, motivo: "resignation" },
    esperado: { gratuity: 0, elegible: "Not yet" },
  },
  {
    nombre: "Fixed-term contract of 18 months",
    origen: { tipo: "recalculado", detalle: "Pro rata: 26,000 / 26 × 15 = 15,000 a year × 1.5 years = 22,500." },
    fecha: "2026-10-15",
    entrada: { salario: 26000, anios: 1, meses: 6, motivo: "fixed-term" },
    esperado: { gratuity: 22500, anios: 1.5 },
  },
  {
    nombre: "Death after 2 years and 3 months",
    origen: { tipo: "recalculado", detalle: "No minimum service on death. 2 years counted × 15,000 = 30,000." },
    fecha: "2026-10-15",
    entrada: { salario: 26000, anios: 2, meses: 3, motivo: "death" },
    esperado: { gratuity: 30000, elegible: "Yes" },
  },
]);
