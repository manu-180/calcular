import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Salary of ₹15 lakh, both regimes",
    origen: {
      tipo: "recalculado",
      detalle:
        "New: 15,00,000 − 75,000 = 14,25,000; 20,000 + 40,000 + 2,25,000 × 15% = 93,750; cess 3,750; total 97,500. Old: 15,00,000 − 50,000 − 1,50,000 = 13,00,000; 12,500 + 1,00,000 + 90,000 = 2,02,500; cess 8,100; total 2,10,600.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 1500000, otros: 0, edad: "below60", seccion123: 150000, otrasDeducciones: 0 },
    esperado: { impuestoNuevo: 97500, gravableNuevo: 1425000, impuestoViejo: 210600, gravableViejo: 1300000, mejor: "New regime", ahorro: 113100, marginalNuevo: 15 },
  },
  {
    nombre: "Salary of ₹12.75 lakh pays no tax in the new regime",
    origen: { tipo: "recalculado", detalle: "12,75,000 − 75,000 = 12,00,000; slab tax 60,000; section 156(2)(a) rebate 60,000; tax 0." },
    fecha: "2026-10-15",
    entrada: { salario: 1275000, otros: 0, edad: "below60", seccion123: 0, otrasDeducciones: 0 },
    esperado: { impuestoNuevo: 0, gravableNuevo: 1200000 },
  },
  {
    nombre: "Marginal relief just above ₹12 lakh",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 12,10,000; slab tax 61,500; excess over 12 lakh 10,000, so section 156(2)(b) leaves 10,000; cess 400; total 10,400.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 1285000, otros: 0, edad: "below60", seccion123: 0, otrasDeducciones: 0 },
    esperado: { impuestoNuevo: 10400, gravableNuevo: 1210000 },
  },
  {
    nombre: "Surcharge with marginal relief just above ₹50 lakh",
    origen: {
      tipo: "recalculado",
      detalle:
        "New: slab tax on 50,10,000 = 10,83,000. Tax at 50 lakh is 10,80,000, so tax plus surcharge is capped at 10,80,000 + 10,000 = 10,90,000 and the surcharge is 7,000. With 4% cess: 11,33,600. Old: slab tax 13,15,500; cap 13,12,500 + 10,000 = 13,22,500; with cess 13,75,400.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 0, otros: 5010000, edad: "below60", seccion123: 0, otrasDeducciones: 0 },
    esperado: { impuestoNuevo: 1133600, impuestoViejo: 1375400 },
  },
  {
    nombre: "Senior citizen aged 70 with ₹6 lakh salary",
    origen: {
      tipo: "recalculado",
      detalle: "Old: 6,00,000 − 50,000 = 5,50,000; 2,00,000 × 5% + 50,000 × 20% = 20,000; cess 800; total 20,800. New: 5,25,000 taxable, slab tax 6,250 fully rebated.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 600000, otros: 0, edad: "60to79", seccion123: 0, otrasDeducciones: 0 },
    esperado: { impuestoViejo: 20800, impuestoNuevo: 0, mejor: "New regime" },
  },
]);
