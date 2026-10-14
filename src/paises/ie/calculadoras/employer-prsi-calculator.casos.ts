import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-prsi-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "€50,000 a year, June 2026",
    origen: { tipo: "recalculado", detalle: "50,000 / 52 = 961.54 a week, over €552, so 11.25%: 108.17 a week × 52 = 5,624.84. Cost 55,624.84." },
    fecha: "2026-06-15",
    entrada: { importe: 50000, periodo: "year" },
    esperado: { tasa: 11.25, prsiSemana: 108.17, prsiAnio: 5624.84, costoAnio: 55624.84 },
  },
  {
    nombre: "€50,000 a year after 1 October 2026",
    origen: { tipo: "recalculado", detalle: "961.54 × 11.40% = 109.62 a week × 52 = 5,700.24." },
    fecha: "2026-10-14",
    entrada: { importe: 50000, periodo: "year" },
    esperado: { tasa: 11.4, prsiAnio: 5700.24 },
  },
  {
    nombre: "€25,000 a year at the lower rate",
    origen: { tipo: "recalculado", detalle: "25,000 / 52 = 480.77 a week, €552 or less, so 9%: 43.27 a week × 52 = 2,250.04." },
    fecha: "2026-06-15",
    entrada: { importe: 25000, periodo: "year" },
    esperado: { tasa: 9, prsiSemana: 43.27, prsiAnio: 2250.04 },
  },
  {
    nombre: "Exactly €552 a week",
    origen: { tipo: "recalculado", detalle: "€552 is in the AL band: employer rate 9%, 49.68 a week." },
    fecha: "2026-06-15",
    entrada: { importe: 552, periodo: "week" },
    esperado: { tasa: 9, prsiSemana: 49.68 },
  },
  {
    nombre: "€552.01 a week",
    origen: { tipo: "recalculado", detalle: "More than €552 is A1: employer rate 11.25%, 62.10 a week." },
    fecha: "2026-06-15",
    entrada: { importe: 552.01, periodo: "week" },
    esperado: { tasa: 11.25, prsiSemana: 62.1 },
  },
]);
