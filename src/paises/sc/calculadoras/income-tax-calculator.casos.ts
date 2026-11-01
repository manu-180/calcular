import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "SCR 25,000 a month",
    origen: { tipo: "recalculado", detalle: "15 % × (10,000 − 8,555.50) = 216.675, plus 20 % × (25,000 − 10,000) = 3,000. Total 3,216.675, rounded to 3,216.68." },
    fecha: "2026-10-29",
    entrada: { bruto: 25000 },
    esperado: { impuesto: 3216.68, neto: 21783.32, marginal: 20 },
  },
  {
    nombre: "Pay inside the tax free band",
    origen: { tipo: "recalculado", detalle: "8,000 is below the SCR 8,555.50 limit of the 0 % band." },
    fecha: "2026-10-29",
    entrada: { bruto: 8000 },
    esperado: { impuesto: 0, neto: 8000, marginal: 0 },
  },
  {
    nombre: "SCR 83,333, the top of the 20 % band",
    origen: { tipo: "oficial", url: "https://src.gov.sc/income-and-non-monetary-benefits-tax/", detalle: "The SRC table gives SCR 14,883.28 as the tax at SCR 83,333 (216.675 plus 20 % of 73,333)." },
    fecha: "2026-10-29",
    entrada: { bruto: 83333 },
    esperado: { impuesto: 14883.28 },
  },
  {
    nombre: "SCR 100,000 reaches the 30 % band",
    origen: { tipo: "recalculado", detalle: "14,883.275 + 30 % × (100,000 − 83,333) = 14,883.275 + 5,000.10 = 19,883.375, rounded to 19,883.38." },
    fecha: "2026-10-29",
    entrada: { bruto: 100000 },
    esperado: { impuesto: 19883.38, marginal: 30 },
  },
  {
    nombre: "Zero pay is rejected",
    origen: { tipo: "recalculado", detalle: "A monthly pay of zero has nothing to tax." },
    fecha: "2026-10-29",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
