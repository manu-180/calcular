import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Eight years on AED 12,000 basic, daily wage ÷ 30",
    origen: {
      tipo: "recalculado",
      detalle: "Article 51: 21 days for each of the first 5 years (105) + 30 days for each of the next 3 (90) = 195 days. 12,000 / 30 = 400 a day x 195 = 78,000.",
    },
    fecha: "2026-10-17",
    entrada: { basico: 12000, anios: 8, ausencias: 0, metodoDiario: "30" },
    esperado: { dias: 195, diario: 400, gratuidad: 78000 },
  },
  {
    nombre: "Three and a half years, daily wage × 12 ÷ 365",
    origen: { tipo: "recalculado", detalle: "21 x 3.5 = 73.5 days. 10,000 x 12 / 365 = 328.77 a day x 73.5 = 24,164.38." },
    fecha: "2026-10-17",
    entrada: { basico: 10000, anios: 3.5, ausencias: 0, metodoDiario: "365" },
    esperado: { dias: 73.5, gratuidad: 24164.38 },
  },
  {
    nombre: "Thirty years stop at two years' wage",
    origen: { tipo: "recalculado", detalle: "105 + 25 x 30 = 855 days x 500 = 427,500, above the cap of 15,000 x 24 = 360,000." },
    fecha: "2026-10-17",
    entrada: { basico: 15000, anios: 30, ausencias: 0, metodoDiario: "30" },
    esperado: { gratuidad: 360000, tope: 360000 },
  },
  {
    nombre: "Unpaid absence takes service under one year",
    origen: { tipo: "recalculado", detalle: "1.05 years less 40 days (0.11) = 0.94 years: nothing due." },
    fecha: "2026-10-17",
    entrada: { basico: 8000, anios: 1.05, ausencias: 40, metodoDiario: "30" },
    esperado: { gratuidad: 0 },
  },
  {
    nombre: "No years is not valid",
    origen: { tipo: "recalculado", detalle: "Years 0." },
    fecha: "2026-10-17",
    entrada: { basico: 8000, anios: 0, ausencias: 0, metodoDiario: "30" },
    esperaError: true,
  },
]);
