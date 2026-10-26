import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 900,000 income, no dependents",
    origen: { tipo: "recalculado", url: "https://www.mra.mu/download/FinanceAct2026.pdf", detalle: "10% × (900,000 − 500,000) = 40,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 900000, dependientes: "0", otrasDeducciones: 0, payePagado: null },
    esperado: { impuesto: 40000, banda10: 40000, banda20: 0, marginal: 10, mensual: 3333.33 },
  },
  {
    nombre: "Rs 2,000,000 with 3 dependents and PAYE paid",
    origen: {
      tipo: "recalculado",
      detalle: "2,000,000 − 275,000 = 1,725,000. Tax 50,000 + 20% × 725,000 = 195,000. PAYE 180,000 leaves 15,000.",
    },
    fecha: "2026-10-24",
    entrada: { ingreso: 2000000, dependientes: "3", otrasDeducciones: 0, payePagado: 180000 },
    esperado: { impuesto: 195000, gravable: 1725000, banda20: 145000, saldo: 15000 },
  },
  {
    nombre: "Rs 15 million reaches the 35% band",
    origen: { tipo: "recalculado", detalle: "50,000 + 20% × 11,000,000 + 35% × 3,000,000 = 3,300,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 15000000, dependientes: "0", otrasDeducciones: 0, payePagado: null },
    esperado: { impuesto: 3300000, banda35: 1050000, marginal: 35 },
  },
  {
    nombre: "Rs 15 million in the 2025-26 income year",
    origen: { tipo: "recalculado", url: "https://www.mra.mu/download/PayrollTaxes.pdf", detalle: "2025-26 bands: 50,000 + 20% × 14,000,000 = 2,850,000 (Fair Share Contribution not included)." },
    fecha: "2026-06-30",
    entrada: { ingreso: 15000000, dependientes: "0", otrasDeducciones: 0, payePagado: null },
    esperado: { impuesto: 2850000, banda35: null, marginal: 20 },
  },
  {
    nombre: "Income inside the 0% band",
    origen: { tipo: "recalculado", detalle: "450,000 is below 500,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 450000, dependientes: "0", otrasDeducciones: 0, payePagado: null },
    esperado: { impuesto: 0, marginal: 0 },
  },
]);
