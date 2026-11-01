import { definirCasos } from "@/motor/calculo";
import calculadora from "./dashain-bonus-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "A full year on NPR 30,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "One month of basic pay: 30,000 × 1 = 30,000." },
    fecha: "2026-10-29",
    entrada: { basico: 30000, meses: 12 },
    esperado: { festival: 30000, completo: 30000, mensual: 2500 },
  },
  {
    nombre: "Joined 5 months ago",
    origen: { tipo: "recalculado", url: ACT, detalle: "30,000 × 5 / 12 = 12,500." },
    fecha: "2026-10-29",
    entrada: { basico: 30000, meses: 5 },
    esperado: { festival: 12500, proporcion: 41.7 },
    tolerancia: 0.06,
  },
  {
    nombre: "No basic pay",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { basico: 0, meses: 12 },
    esperaError: true,
  },
]);
