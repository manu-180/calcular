import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Five years on NPR 40,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "One month of basic pay per year: 40,000 × 5 = 200,000." },
    fecha: "2026-10-29",
    entrada: { basico: 40000, meses: 60 },
    esperado: { compensacion: 200000, anios: 5, mensual: 40000 },
  },
  {
    nombre: "Six months on NPR 30,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Less than a year is pro rata: 30,000 × 6 / 12 = 15,000." },
    fecha: "2026-10-29",
    entrada: { basico: 30000, meses: 6 },
    esperado: { compensacion: 15000, anios: 0.5 },
  },
  {
    nombre: "No basic pay",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { basico: 0, meses: 12 },
    esperaError: true,
  },
]);
