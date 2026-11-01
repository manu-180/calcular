import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service",
    origen: { tipo: "recalculado", url: ACT, detalle: "More than one year: 30 days. Pay 30,000 / 30 × 30 = 30,000." },
    fecha: "2026-10-29",
    entrada: { inicio: "2023-10-01", fin: "2026-10-29", basico: 30000, diasMes: 30 },
    esperado: { dias: 30, pago: 30000 },
  },
  {
    nombre: "Six months of service",
    origen: { tipo: "recalculado", url: ACT, detalle: "Between 4 weeks and 1 year: 7 days. Pay 30,000 / 30 × 7 = 7,000." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-04-29", fin: "2026-10-29", basico: 30000, diasMes: 30 },
    esperado: { dias: 7, pago: 7000 },
  },
  {
    nombre: "Three weeks of service",
    origen: { tipo: "recalculado", url: ACT, detalle: "Up to 4 weeks (28 days): 1 day." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-10-08", fin: "2026-10-29", basico: null, diasMes: 30 },
    esperado: { dias: 1 },
  },
  {
    nombre: "Exactly one year is still the 7-day band",
    origen: { tipo: "recalculado", url: ACT, detalle: "365 days of service is not more than one year." },
    fecha: "2026-10-29",
    entrada: { inicio: "2025-10-29", fin: "2026-10-29", basico: null, diasMes: 30 },
    esperado: { dias: 7 },
  },
  {
    nombre: "End before start",
    origen: { tipo: "recalculado", detalle: "The last day cannot be before the first." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-10-29", fin: "2026-10-01", basico: null, diasMes: 30 },
    esperaError: true,
  },
]);
