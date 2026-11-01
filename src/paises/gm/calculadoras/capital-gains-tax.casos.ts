import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: land sold for D2 million",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0c6de0-d217-11ed-9b31-029254d29bb1",
      detalle: "Gain 2,000,000 − 1,500,000 − 100,000 − 20,000 = 380,000. Higher of 15% × 380,000 = 57,000 and 5% × 2,000,000 = 100,000: tax 100,000.",
    },
    fecha: "2026-10-27",
    entrada: { vendedor: "individual", precio: 2000000, costo: 1500000, mejoras: 100000, gastos: 20000 },
    esperado: { ganancia: 380000, sobreGanancia: 57000, sobrePrecio: 100000, impuesto: 100000 },
  },
  {
    nombre: "Company with a large gain",
    origen: { tipo: "recalculado", detalle: "Gain 3,000,000 − 1,000,000 = 2,000,000. 25% = 500,000 against 10% × 3,000,000 = 300,000: tax 500,000." },
    fecha: "2026-10-27",
    entrada: { vendedor: "company", precio: 3000000, costo: 1000000, mejoras: 0, gastos: 0 },
    esperado: { impuesto: 500000 },
  },
  {
    nombre: "Gain of D24,000 is exempt",
    origen: { tipo: "recalculado", detalle: "Gain 124,000 − 100,000 = 24,000, not above D24,000: no tax." },
    fecha: "2026-10-27",
    entrada: { vendedor: "individual", precio: 124000, costo: 100000, mejoras: 0, gastos: 0 },
    esperado: { impuesto: 0, ganancia: 24000 },
  },
  {
    nombre: "No selling price",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { vendedor: "individual", precio: 0, costo: 0, mejoras: 0, gastos: 0 },
    esperaError: true,
  },
]);
