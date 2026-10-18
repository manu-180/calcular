import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "GH₵5,000 basic salary",
    origen: {
      tipo: "recalculado",
      detalle: "SSNIT 5.5% = 275. Chargeable 4,725: 4 + 10 + 507.50 + (4,725 − 3,668) × 25% = 785.75. Net 5,000 − 275 − 785.75 = 3,939.25.",
    },
    fecha: "2026-10-18",
    entrada: { basico: 5000, subsidios: 0, tier3: 0 },
    esperado: { ssnit: 275, paye: 785.75, neto: 3939.25, gravable: 4725 },
  },
  {
    nombre: "Allowances and Tier 3 above the relief",
    origen: {
      tipo: "recalculado",
      detalle: "Basic 3,000, allowances 1,000, Tier 3 600 (relief cap 16.5% = 495). SSNIT 165. Chargeable 4,000 − 165 − 495 = 3,340: 4 + 10 + (3,340 − 768) × 17.5% = 464.10. Net 4,000 − 165 − 600 − 464.10 = 2,770.90.",
    },
    fecha: "2026-10-18",
    entrada: { basico: 3000, subsidios: 1000, tier3: 600 },
    esperado: { ssnit: 165, paye: 464.1, neto: 2770.9 },
  },
  {
    nombre: "No basic salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { basico: 0, subsidios: 0, tier3: 0 },
    esperaError: true,
  },
]);
