import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Mary sells a house in July 2025",
    origen: {
      tipo: "oficial",
      url: "https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx",
      detalle: "Revenue example 1: 380,000 − 130,000 − 300 − 5,280 − 1,110 = 243,310. Less 1,270 = 242,040 × 33% = 79,873.20.",
    },
    fecha: "2025-07-15",
    entrada: { venta: 380000, compra: 130000, gastos: 6690, perdidas: 0 },
    esperado: { ganancia: 243310, gravable: 242040, impuesto: 79873.2, tasa: 33 },
  },
  {
    nombre: "€50,000 gain after 7 October 2026",
    origen: { tipo: "recalculado", detalle: "50,000 − 1,270 = 48,730 × 31% = 15,106.30." },
    fecha: "2026-10-14",
    entrada: { venta: 150000, compra: 100000, gastos: 0, perdidas: 0 },
    esperado: { gravable: 48730, impuesto: 15106.3, tasa: 31 },
  },
  {
    nombre: "Day before the new rate",
    origen: { tipo: "recalculado", detalle: "On 6 October 2026 the rate was still 33%: 48,730 × 33% = 16,080.90." },
    fecha: "2026-10-06",
    entrada: { venta: 150000, compra: 100000, gastos: 0, perdidas: 0 },
    esperado: { impuesto: 16080.9, tasa: 33 },
  },
  {
    nombre: "Gain below the exemption",
    origen: { tipo: "recalculado", detalle: "A gain of 1,000 is under the 1,270 exemption: no CGT." },
    fecha: "2026-10-14",
    entrada: { venta: 6000, compra: 5000, gastos: 0, perdidas: 0 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "A loss",
    origen: { tipo: "recalculado", detalle: "Sale below cost: a loss of 2,000 and no CGT." },
    fecha: "2026-10-14",
    entrada: { venta: 8000, compra: 10000, gastos: 0, perdidas: 0 },
    esperado: { ganancia: -2000, impuesto: 0 },
  },
]);
