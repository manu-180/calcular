import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "GH₵5,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "Monthly bands: 588 at 0%, 80 × 5% = 4, 100 × 10% = 10, 2,900 × 17.5% = 507.50, (5,000 − 3,668) × 25% = 333. Total 854.50.",
    },
    fecha: "2026-10-18",
    entrada: { ingreso: 5000, periodo: "monthly", residente: true },
    esperado: { mensual: 854.5, anual: 10254, neto: 4145.5, marginal: 25 },
  },
  {
    nombre: "GH₵700,000 a year reaches 35%",
    origen: {
      tipo: "recalculado",
      detalle: "48 + 120 + 6,090 + 192,000 × 25% (48,000) + 363,984 × 30% (109,195.20) + 100,000 × 35% (35,000) = 198,453.20.",
    },
    fecha: "2026-10-18",
    entrada: { ingreso: 700000, periodo: "annual", residente: true },
    esperado: { anual: 198453.2, marginal: 35 },
  },
  {
    nombre: "Below the tax-free band",
    origen: { tipo: "recalculado", detalle: "GH₵500 a month is under the GH₵588 first band." },
    fecha: "2026-10-18",
    entrada: { ingreso: 500, periodo: "monthly", residente: true },
    esperado: { mensual: 0 },
  },
  {
    nombre: "Non-resident flat rate",
    origen: { tipo: "recalculado", detalle: "25% of 5,000 = 1,250 a month." },
    fecha: "2026-10-18",
    entrada: { ingreso: 5000, periodo: "monthly", residente: false },
    esperado: { mensual: 1250, marginal: 25 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { ingreso: 0, periodo: "monthly", residente: true },
    esperaError: true,
  },
]);
