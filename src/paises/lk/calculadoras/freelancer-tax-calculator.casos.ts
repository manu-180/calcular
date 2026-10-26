import { definirCasos } from "@/motor/calculo";
import calculadora from "./freelancer-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 6,000,000 from foreign clients",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 6,000,000 − 1,800,000 = 4,200,000. 6% × 1,000,000 = 60,000; the rest at most 15%: 3,200,000 × 15% = 480,000. Tax 540,000. At normal rates 420,000 + 36% × 1,700,000 = 1,032,000.",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 6000000 },
    esperado: { impuesto: 540000, gravable: 4200000, ahorro: 492000, tasaEfectiva: 9 },
  },
  {
    nombre: "Rs. 2,500,000 from foreign clients",
    origen: { tipo: "recalculado", detalle: "Taxable 700,000, all in the 6% band: 42,000." },
    fecha: "2026-10-26",
    entrada: { ingreso: 2500000 },
    esperado: { impuesto: 42000, ahorro: 0 },
  },
]);
