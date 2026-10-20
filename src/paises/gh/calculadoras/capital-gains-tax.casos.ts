import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Gain of GH₵35,000",
    origen: { tipo: "recalculado", detalle: "100,000 − 60,000 − 5,000 = 35,000; 15% = 5,250." },
    fecha: "2026-10-18",
    entrada: { venta: 100000, costo: 60000, gastos: 5000 },
    esperado: { ganancia: 35000, impuesto: 5250, tasa: 15 },
  },
  {
    nombre: "Sold at a loss",
    origen: { tipo: "recalculado", detalle: "No gain, no tax." },
    fecha: "2026-10-18",
    entrada: { venta: 50000, costo: 60000, gastos: 0 },
    esperado: { ganancia: 0, impuesto: 0 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { venta: 0, costo: 0, gastos: 0 },
    esperaError: true,
  },
]);
