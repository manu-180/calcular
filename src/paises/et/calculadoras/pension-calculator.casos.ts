import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "POESSA example: 36 years 2 months, average ETB 16,333.33",
    origen: {
      tipo: "oficial",
      url: "https://www.poessa.gov.et/?page_id=443",
      detalle: "30% + 26 × 1.25% + 2/12 × 1.25% = 62.7%. 62.7 × 16,333.33 / 100: the page shows ETB 10,240.99 because it drops the third decimal; rounded it is 10,241.00.",
    },
    fecha: "2026-10-27",
    entrada: { promedio: 16333.33, anios: 36, meses: 2 },
    esperado: { porcentajePension: 62.7, pension: 10241 },
    tolerancia: 0.011,
  },
  {
    nombre: "Exactly 10 years",
    origen: { tipo: "recalculado", detalle: "30% × 12,000 = 3,600." },
    fecha: "2026-10-27",
    entrada: { promedio: 12000, anios: 10, meses: 0 },
    esperado: { porcentajePension: 30, pension: 3600 },
  },
  {
    nombre: "25 years on ETB 20,000",
    origen: { tipo: "recalculado", detalle: "30% + 15 × 1.25% = 48.75%, shown as 48.8%. 48.8% × 20,000 = 9,760." },
    fecha: "2026-10-27",
    entrada: { promedio: 20000, anios: 25, meses: 0 },
    esperado: { porcentajePension: 48.8, pension: 9760 },
  },
  {
    nombre: "Nine years is not enough",
    origen: { tipo: "recalculado", detalle: "The service pension needs at least 10 years." },
    fecha: "2026-10-27",
    entrada: { promedio: 10000, anios: 9, meses: 11 },
    esperaError: true,
  },
]);
