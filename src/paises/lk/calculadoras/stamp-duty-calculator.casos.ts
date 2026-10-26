import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Two year lease at Rs. 100,000 a month",
    origen: { tipo: "recalculado", detalle: "Aggregate rent 2,400,000: 2,400 blocks of Rs. 1,000 × Rs. 20 = 48,000." },
    fecha: "2026-10-26",
    entrada: { instrumento: "lease", importe: 100000, anios: 2 },
    esperado: { derecho: 48000, base: 2400000, tramos: 2400 },
  },
  {
    nombre: "25 year lease at Rs. 50,000 a month",
    origen: { tipo: "recalculado", detalle: "Only 20 years count: 50,000 × 12 × 20 = 12,000,000. 12,000 × 20 = 240,000." },
    fecha: "2026-10-26",
    entrada: { instrumento: "lease", importe: 50000, anios: 25 },
    esperado: { derecho: 240000, base: 12000000 },
  },
  {
    nombre: "Mortgage of Rs. 5,000,500",
    origen: { tipo: "recalculado", detalle: "Rs. 1 for every Rs. 1,000 or part: 5,001 blocks = 5,001." },
    fecha: "2026-10-26",
    entrada: { instrumento: "mortgage", importe: 5000500, anios: null },
    esperado: { derecho: 5001, tramos: 5001 },
  },
  {
    nombre: "Hire purchase of Rs. 2,000,000",
    origen: { tipo: "recalculado", detalle: "Rs. 10 per Rs. 1,000: 20,000." },
    fecha: "2026-10-26",
    entrada: { instrumento: "hire-purchase", importe: 2000000, anios: null },
    esperado: { derecho: 20000 },
  },
]);
