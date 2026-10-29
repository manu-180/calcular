import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

const SSF = "https://ssf.gov.np/list/act_regulation/social-security-operation-procedure-2075-with-5th-ammendment" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 40,000 basic and 10,000 allowances, in the Fund",
    origen: { tipo: "recalculado", url: SSF, detalle: "Fund 20% × 40,000 = 8,000. Festival 40,000 / 12 = 3,333.33. Total 40,000 + 10,000 + 8,000 + 3,333.33 = 61,333.33." },
    fecha: "2026-10-29",
    entrada: { basico: 40000, asignaciones: 10000, ssf: true },
    esperado: { total: 61333.33, aporte: 8000, festival: 3333.33, sobrecosto: 11333.33 },
  },
  {
    nombre: "Same pay, outside the Fund",
    origen: { tipo: "recalculado", detalle: "Provident match 10% + gratuity 8.33% = 18.33% × 40,000 = 7,332. Total 40,000 + 10,000 + 7,332 + 3,333.33 = 60,665.33." },
    fecha: "2026-10-29",
    entrada: { basico: 40000, asignaciones: 10000, ssf: false },
    esperado: { total: 60665.33, aporte: 7332 },
  },
  {
    nombre: "No basic pay",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { basico: 0, asignaciones: 0, ssf: true },
    esperaError: true,
  },
]);
