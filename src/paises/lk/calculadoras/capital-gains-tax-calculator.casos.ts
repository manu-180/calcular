import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Land sold for Rs. 20 million after 3 June 2026",
    origen: { tipo: "recalculado", detalle: "Gain 20,000,000 − 12,000,000 = 8,000,000. Act No. 11 of 2026: 15%. Tax 1,200,000." },
    fecha: "2026-10-26",
    entrada: { precio: 20000000, mercado: null, costo: 12000000 },
    esperado: { impuesto: 1200000, ganancia: 8000000, tasa: 15, neto: 18800000 },
  },
  {
    nombre: "Same sale on 2 June 2026",
    origen: { tipo: "recalculado", detalle: "The day before the 2026 Act: 10%. Tax 800,000." },
    fecha: "2026-06-02",
    entrada: { precio: 20000000, mercado: null, costo: 12000000 },
    esperado: { impuesto: 800000, tasa: 10 },
  },
  {
    nombre: "Market value higher than the price",
    origen: { tipo: "recalculado", detalle: "IRD: the higher of consideration and market value. 25,000,000 − 12,000,000 = 13,000,000 × 15% = 1,950,000." },
    fecha: "2026-10-26",
    entrada: { precio: 20000000, mercado: 25000000, costo: 12000000 },
    esperado: { impuesto: 1950000, valor: 25000000 },
  },
  {
    nombre: "Sold at a loss",
    origen: { tipo: "recalculado", detalle: "10,000,000 − 12,000,000: a loss of 2,000,000 and no tax." },
    fecha: "2026-10-26",
    entrada: { precio: 10000000, mercado: null, costo: 12000000 },
    esperado: { impuesto: 0, perdida: 2000000 },
  },
]);
