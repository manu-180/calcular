import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const CERO = { hijos: 0, hijosEstudios: 0, discapacidad: false, seguroVida: 0, seguroMedico: 0, estiloVida: 0, deporte: 0, prs: 0, socso: 0, otros: 0, zakat: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "RM72,000 a year, single, EPF over the limit",
    origen: { tipo: "recalculado", detalle: "Reliefs 9,000 + EPF 4,000 (limit) = 13,000. Chargeable 59,000. Tax 150 + 450 + 900 + 9,000 × 11% = 2,490. No rebate above 35,000." },
    fecha: "2026-10-16",
    entrada: { ...CERO, ingresos: 72000, categoria: "single", epf: 7920 },
    esperado: { impuesto: 2490, mensual: 207.5, gravable: 59000, alivios: 13000, rebate: 0, marginal: 11 },
  },
  {
    nombre: "RM40,000, spouse not working, two children: the rebate wipes out the tax",
    origen: { tipo: "recalculado", detalle: "Reliefs 9,000 + 4,000 + 2 × 2,000 + EPF 4,000 = 21,000. Chargeable 19,000. Tax 14,000 × 1% = 140, less rebate up to 800 = 0." },
    fecha: "2026-10-16",
    entrada: { ...CERO, ingresos: 40000, categoria: "spouse-not-working", hijos: 2, epf: 4400 },
    esperado: { impuesto: 0, gravable: 19000, bruto: 140, rebate: 140 },
  },
  {
    nombre: "RM150,000, single, lifestyle over the limit, zakat RM1,000",
    origen: { tipo: "recalculado", detalle: "Reliefs 9,000 + 4,000 + 2,500 (limit) + 2,000 = 17,500. Chargeable 132,500. Tax 9,400 + 32,500 × 25% = 17,525, less zakat 1,000 = 16,525." },
    fecha: "2026-10-16",
    entrada: { ...CERO, ingresos: 150000, categoria: "single", epf: 16500, estiloVida: 3000, seguroMedico: 2000, zakat: 1000 },
    esperado: { impuesto: 16525, gravable: 132500, bruto: 17525, zakat: 1000, marginal: 25 },
  },
  {
    nombre: "Zero income",
    origen: { tipo: "recalculado", detalle: "An income of 0 is not a valid input." },
    fecha: "2026-10-16",
    entrada: { ...CERO, ingresos: 0, categoria: "single", epf: 0 },
    esperaError: true,
  },
]);
