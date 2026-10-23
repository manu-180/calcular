import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Plot sold for KSh 10 million",
    origen: {
      tipo: "recalculado",
      url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/capital-gains-tax",
      detalle: "Gain 10,000,000 − 300,000 − 6,000,000 − 500,000 = 3,200,000. Tax 15% = 480,000.",
    },
    fecha: "2026-10-17",
    entrada: { venta: 10000000, costo: 6000000, mejoras: 500000, gastosVenta: 300000 },
    esperado: { impuesto: 480000, ganancia: 3200000, neto: 9220000 },
  },
  {
    nombre: "Sold at a loss",
    origen: { tipo: "recalculado", detalle: "Costs are higher than the sale price, so the tax is zero." },
    fecha: "2026-10-17",
    entrada: { venta: 5000000, costo: 5200000, mejoras: 0, gastosVenta: 100000 },
    esperado: { impuesto: 0, ganancia: -300000 },
  },
]);
