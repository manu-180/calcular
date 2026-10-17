import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$100,000 gain held over 12 months, $85,000 other income",
    origen: {
      tipo: "recalculado",
      detalle: "Discount 50% leaves 50,000. Tax + Medicare at 135,000: 31,020 + 2,700 = 33,720; at 85,000: 16,020 + 1,700 = 17,720. Extra 16,000.",
    },
    fecha: "2026-10-14",
    entrada: { costo: 300000, venta: 400000, doceMeses: true, ingreso: 85000 },
    esperado: { ganancia: 100000, descuento: 50000, neta: 50000, impuesto: 16000, tasaEfectiva: 16 },
  },
  {
    nombre: "$20,000 gain held under 12 months, $50,000 other income",
    origen: {
      tipo: "recalculado",
      detalle: "No discount. At 70,000: 4,020 + 25,000 × 30% = 11,520, no LITO, Medicare 1,400 = 12,920. At 50,000: 5,520 − 250 LITO + 1,000 = 6,270. Extra 6,650.",
    },
    fecha: "2026-10-14",
    entrada: { costo: 30000, venta: 50000, doceMeses: false, ingreso: 50000 },
    esperado: { descuento: 0, neta: 20000, impuesto: 6650 },
  },
  {
    nombre: "ATO example: Maree sells shares after 6 months",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax/what-is-capital-gains-tax",
      detalle: "Shares bought for $5,000 and sold for $5,500 after 6 months: Maree declares a $500 capital gain, taxed at her income tax rate. With $85,000 of other income: 500 × (30% + 2%) = 160.",
    },
    fecha: "2026-10-14",
    entrada: { costo: 5000, venta: 5500, doceMeses: false, ingreso: 85000 },
    esperado: { ganancia: 500, descuento: 0, neta: 500, impuesto: 160 },
  },
  {
    nombre: "Capital loss",
    origen: { tipo: "recalculado", detalle: "40,000 − 50,000 = −10,000: no tax." },
    fecha: "2026-10-14",
    entrada: { costo: 50000, venta: 40000, doceMeses: true, ingreso: 85000 },
    esperado: { ganancia: -10000, neta: 0, impuesto: 0 },
  },
  {
    nombre: "Negative income",
    origen: { tipo: "recalculado", detalle: "The function rejects incomes below zero." },
    fecha: "2026-10-14",
    entrada: { costo: 1000, venta: 2000, doceMeses: true, ingreso: -5 },
    esperaError: true,
  },
]);
