import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 3,600,000 employment income, APIT already paid",
    origen: {
      tipo: "recalculado",
      detalle: "3,600,000 − 1,800,000 relief = 1,800,000 taxable. Rs. 150,000 + 24% × 300,000 = 222,000. Twelve months of APIT on Rs. 300,000 (18,500) also give 222,000, so nothing is left to pay.",
    },
    fecha: "2026-10-26",
    entrada: { empleo: 3600000, otros: 0, pagado: 222000 },
    esperado: { impuesto: 222000, gravable: 1800000, aPagar: 0, aFavor: 0 },
  },
  {
    nombre: "Rs. 2,400,000 salary and Rs. 600,000 rent",
    origen: { tipo: "recalculado", detalle: "3,000,000 − 1,800,000 = 1,200,000. 60,000 + 18% × 200,000 = 96,000. Less 36,000 APIT = 60,000 to pay." },
    fecha: "2026-10-26",
    entrada: { empleo: 2400000, otros: 600000, pagado: 36000 },
    esperado: { impuesto: 96000, gravable: 1200000, aPagar: 60000 },
  },
  {
    nombre: "Rs. 5,000,000 business income",
    origen: { tipo: "recalculado", detalle: "5,000,000 − 1,800,000 = 3,200,000. 420,000 + 36% × 700,000 = 672,000." },
    fecha: "2026-10-26",
    entrada: { empleo: 0, otros: 5000000, pagado: 0 },
    esperado: { impuesto: 672000, aPagar: 672000, porMes: 56000 },
  },
  {
    nombre: "Below the personal relief",
    origen: { tipo: "recalculado", detalle: "Rs. 1,500,000 is below the Rs. 1,800,000 relief: no tax, and the APIT paid comes back as excess." },
    fecha: "2026-10-26",
    entrada: { empleo: 1500000, otros: 0, pagado: 5000 },
    esperado: { impuesto: 0, gravable: 0, aFavor: 5000 },
  },
]);
