import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦6 million a year with pension and rent",
    origen: {
      tipo: "recalculado",
      detalle:
        "Rent relief 20% × 1,200,000 = 240,000. Deductions 360,000 + 240,000 = 600,000. Chargeable 5,400,000: 800,000 at 0%, 2,200,000 × 15% = 330,000, 2,400,000 × 18% = 432,000. Tax 762,000.",
    },
    fecha: "2026-10-16",
    entrada: { ingreso: 6000000, pension: 360000, nhf: 0, nhis: 0, otras: 0, alquiler: 1200000 },
    esperado: { impuesto: 762000, mensual: 63500, gravable: 5400000, rentRelief: 240000, marginal: 18 },
  },
  {
    nombre: "Minimum wage earner",
    origen: { tipo: "recalculado", detalle: "70,000 × 12 = 840,000: income at the national minimum wage is exempt." },
    fecha: "2026-10-16",
    entrada: { ingreso: 840000, pension: 0, nhf: 0, nhis: 0, otras: 0, alquiler: 0 },
    esperado: { impuesto: 0, marginal: 0 },
  },
  {
    nombre: "₦100 million, every band",
    origen: {
      tipo: "recalculado",
      detalle: "330,000 + 9,000,000 × 18% + 13,000,000 × 21% + 25,000,000 × 23% + 50,000,000 × 25% = 22,930,000.",
    },
    fecha: "2026-10-16",
    entrada: { ingreso: 100000000, pension: 0, nhf: 0, nhis: 0, otras: 0, alquiler: 0 },
    esperado: { impuesto: 22930000, marginal: 25 },
  },
  {
    nombre: "Rent relief capped at ₦500,000",
    origen: { tipo: "recalculado", detalle: "20% of 5,000,000 is 1,000,000, capped at 500,000. Chargeable 2,500,000; tax 1,700,000 × 15% = 255,000." },
    fecha: "2026-10-16",
    entrada: { ingreso: 3000000, pension: 0, nhf: 0, nhis: 0, otras: 0, alquiler: 5000000 },
    esperado: { impuesto: 255000, rentRelief: 500000 },
  },
]);
