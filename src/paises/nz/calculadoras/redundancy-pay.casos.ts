import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay";

export default definirCasos(calculadora, [
  {
    nombre: "6 years, 4 weeks then 2 a year, no cap",
    origen: { tipo: "recalculado", detalle: "4 + 5 × 2 = 14 weeks × 1,300 = 18,200." },
    fecha: "2026-10-14",
    entrada: { semanal: 1300, anios: 6, semanasPrimer: 4, semanasAdicional: 2, tope: 0, preaviso: 0 },
    esperado: { semanas: 14, indemnizacion: 18200, total: 18200 },
  },
  {
    nombre: "15 years with a 20-week cap and 4 weeks' notice",
    origen: { tipo: "recalculado", detalle: "4 + 14 × 2 = 32, capped at 20 × 1,000 = 20,000. Notice 4 × 1,000 = 4,000. Total 24,000." },
    fecha: "2026-10-14",
    entrada: { semanal: 1000, anios: 15, semanasPrimer: 4, semanasAdicional: 2, tope: 20, preaviso: 4 },
    esperado: { semanas: 20, indemnizacion: 20000, preaviso: 4000, total: 24000 },
  },
  {
    nombre: "Part year counts in proportion",
    origen: { tipo: "recalculado", detalle: "2.5 years: 4 + 1.5 × 2 = 7 weeks × 900 = 6,300." },
    fecha: "2026-10-14",
    entrada: { semanal: 900, anios: 2.5, semanasPrimer: 4, semanasAdicional: 2, tope: 0, preaviso: 0 },
    esperado: { semanas: 7, indemnizacion: 6300 },
  },
  {
    nombre: "No pay entered",
    origen: { tipo: "recalculado", detalle: "Weekly pay of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { semanal: 0, anios: 6, semanasPrimer: 4, semanasAdicional: 2, tope: 0, preaviso: 0 },
    esperaError: true,
  },
]);
