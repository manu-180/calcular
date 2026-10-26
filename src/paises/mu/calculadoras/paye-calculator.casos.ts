import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 75,000 a month, no deductions",
    origen: {
      tipo: "recalculado",
      url: "https://www.mra.mu/download/FinanceAct2026.pdf",
      detalle: "13 × 75,000 = 975,000. Tax 10% × 475,000 = 47,500. 47,500 / 13 = 3,653.85, rounded down to 3,653. Exempt pay 500,000 / 13 = 38,461.54.",
    },
    fecha: "2026-10-24",
    entrada: { emolumentos: 75000, dependientes: "0", otrasDeducciones: 0 },
    esperado: { paye: 3653, payeAnual: 47489, gravable: 975000, marginal: 10, exento: 38461.54 },
  },
  {
    nombre: "Rs 75,000 with one dependent",
    origen: {
      tipo: "recalculado",
      url: "https://www.mra.mu/download/PAYEGuide.pdf",
      detalle: "975,000 − 110,000 = 865,000. Tax 10% × 365,000 = 36,500; / 13 = 2,807.69 → 2,807. Exempt pay 610,000 / 13 = 46,923.08.",
    },
    fecha: "2026-10-24",
    entrada: { emolumentos: 75000, dependientes: "1", otrasDeducciones: 0 },
    esperado: { paye: 2807, gravable: 865000, deducciones: 110000, exento: 46923.08 },
  },
  {
    nombre: "Rs 38,000 a month pays no PAYE",
    origen: { tipo: "recalculado", detalle: "13 × 38,000 = 494,000, inside the 0% band." },
    fecha: "2026-10-24",
    entrada: { emolumentos: 38000, dependientes: "0", otrasDeducciones: 0 },
    esperado: { paye: 0, marginal: 0 },
  },
]);
