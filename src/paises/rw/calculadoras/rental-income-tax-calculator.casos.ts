import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 2,400,000 of rent in the year",
    origen: { tipo: "recalculado", detalle: "Taxable 2,400,000 − 50% = 1,200,000. Tax (1,000,000 − 180,000) × 20% + 200,000 × 30% = 164,000 + 60,000 = 224,000." },
    fecha: "2026-10-26",
    entrada: { renta: 2400000, intereses: 0 },
    esperado: { impuesto: 224000, gravable: 1200000, deduccion: 1200000 },
  },
  {
    nombre: "RWF 600,000 of rent",
    origen: { tipo: "recalculado", detalle: "Taxable 300,000. Tax (300,000 − 180,000) × 20% = 24,000." },
    fecha: "2026-10-26",
    entrada: { renta: 600000, intereses: 0 },
    esperado: { impuesto: 24000 },
  },
  {
    nombre: "RWF 2,400,000 with RWF 400,000 of loan interest",
    origen: { tipo: "recalculado", detalle: "Taxable 2,400,000 − 1,200,000 − 400,000 = 800,000. Tax (800,000 − 180,000) × 20% = 124,000." },
    fecha: "2026-10-26",
    entrada: { renta: 2400000, intereses: 400000 },
    esperado: { impuesto: 124000, gravable: 800000 },
  },
]);
