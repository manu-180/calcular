import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sale at FJ$300,000 of an asset that cost FJ$200,000",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/tax-rates-and-codes", detalle: "Gain 300,000 − 200,000 − 5,000 = 95,000. Tax 10% × 95,000 = 9,500. Cash 300,000 − 5,000 − 9,500 = 285,500." },
    fecha: "2026-10-29",
    entrada: { venta: 300000, costo: 200000, gastos: 5000 },
    esperado: { ganancia: 95000, impuesto: 9500, neto: 285500 },
  },
  {
    nombre: "Sale at a loss",
    origen: { tipo: "recalculado", detalle: "Gain 80,000 − 100,000 − 0 = −20,000. Tax 0." },
    fecha: "2026-10-29",
    entrada: { venta: 80000, costo: 100000, gastos: 0 },
    esperado: { ganancia: -20000, impuesto: 0, neto: 80000 },
  },
  { nombre: "Zero sale price is rejected", origen: { tipo: "recalculado", detalle: "Price must be above zero." }, fecha: "2026-10-29", entrada: { venta: 0, costo: 0, gastos: 0 }, esperaError: true },
]);
