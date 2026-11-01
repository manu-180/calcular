import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Shares bought for 6 million, sold for 10 million",
    origen: { tipo: "recalculado", detalle: "Gain 4,000,000 × 10% = 400,000." },
    fecha: "2026-10-26",
    entrada: { venta: 10000000, costo: 6000000 },
    esperado: { impuesto: 400000, ganancia: 4000000, neto: 9600000 },
  },
  {
    nombre: "Sold at a loss",
    origen: { tipo: "recalculado", detalle: "No gain, no tax." },
    fecha: "2026-10-26",
    entrada: { venta: 5000000, costo: 6000000 },
    esperado: { impuesto: 0, ganancia: 0 },
  },
]);
