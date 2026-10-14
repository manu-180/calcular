import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ruth, single, €4,000 a month",
    origen: {
      tipo: "oficial",
      url: "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/how-income-tax-is-calculated.aspx",
      detalle: "Revenue example 2: monthly tax 533.32 on €4,000 with €4,000 of credits and a €44,000 band. Over the year: 44,000 × 20% + 4,000 × 40% = 10,400 − 4,000 = 6,400.",
    },
    fecha: "2026-06-15",
    entrada: { estado: "single", ingreso: 48000, ingresoPareja: 0, alquiler: 0 },
    esperado: { bruto: 10400, creditos: 4000, impuesto: 6400, banda: 44000, marginal: 40 },
  },
  {
    nombre: "John, single, €350 a week",
    origen: {
      tipo: "oficial",
      url: "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/how-income-tax-is-calculated.aspx",
      detalle: "Revenue example 1: €350 a week at 20% is €70, less weekly credits of €76.93, so no tax. A year: 18,200 × 20% = 3,640 less 4,000 = 0.",
    },
    fecha: "2026-06-15",
    entrada: { estado: "single", ingreso: 18200, ingresoPareja: 0, alquiler: 0 },
    esperado: { bruto: 3640, impuesto: 0, marginal: 20 },
  },
  {
    nombre: "Married, two incomes of €60,000 and €30,000",
    origen: { tipo: "recalculado", detalle: "Band 53,000 + 30,000 = 83,000. 83,000 × 20% = 16,600 + 7,000 × 40% = 2,800 = 19,400. Credits 4,000 + 2,000 + 2,000 = 8,000. Tax 11,400." },
    fecha: "2026-06-15",
    entrada: { estado: "married-two-incomes", ingreso: 60000, ingresoPareja: 30000, alquiler: 0 },
    esperado: { banda: 83000, bruto: 19400, creditos: 8000, impuesto: 11400 },
  },
  {
    nombre: "Married, two incomes, increase capped",
    origen: { tipo: "recalculado", detalle: "Band 53,000 + min(35,000, 40,000) = 88,000. 17,600 + 12,000 × 40% = 4,800 = 22,400 − 8,000 = 14,400." },
    fecha: "2026-06-15",
    entrada: { estado: "married-two-incomes", ingreso: 60000, ingresoPareja: 40000, alquiler: 0 },
    esperado: { banda: 88000, impuesto: 14400 },
  },
  {
    nombre: "Single parent on €50,000 who rents",
    origen: {
      tipo: "recalculado",
      detalle: "Band 48,000: 9,600 + 2,000 × 40% = 800 = 10,400. Credits 2,000 + 1,900 + 2,000 = 5,900. Tax 4,500, less Rent Tax Credit min(9,000 × 20%, 1,000) = 3,500.",
    },
    fecha: "2026-06-15",
    entrada: { estado: "single-parent", ingreso: 50000, ingresoPareja: 0, alquiler: 9000 },
    esperado: { creditos: 5900, alquiler: 1000, impuesto: 3500 },
  },
  {
    nombre: "Part-time income of €6,000",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE income under €10,000, so the Employee Tax Credit is 6,000 × 20% = 1,200. Tax 1,200 less 2,000 + 1,200 = 0.",
    },
    fecha: "2026-06-15",
    entrada: { estado: "single", ingreso: 6000, ingresoPareja: 0, alquiler: 0 },
    esperado: { creditos: 3200, impuesto: 0 },
  },
  {
    nombre: "Two incomes without the second one",
    origen: { tipo: "recalculado", detalle: "Choosing two incomes with no partner income is an input error." },
    fecha: "2026-06-15",
    entrada: { estado: "married-two-incomes", ingreso: 50000, ingresoPareja: 0, alquiler: 0 },
    esperaError: true,
  },
]);
