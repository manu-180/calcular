import { definirCasos } from "@/motor/calculo";
import calculadora from "./transfer-tax-calculator";

const FEES = "https://www.jamaicatax.gov.jm/rates-and-fees";

export default definirCasos(calculadora, [
  {
    nombre: "J$25,000,000 house with a J$20,000,000 mortgage",
    origen: {
      tipo: "recalculado",
      url: FEES,
      detalle: "Transfer tax 2% = 500,000. Stamp duty 5,000. Mortgage stamp duty 5,000 + 1/4 = 6,250. Total 511,250.",
    },
    fecha: "2026-10-24",
    entrada: { valor: 25000000, hipoteca: true, prestamo: 20000000 },
    esperado: { total: 511250, transferTax: 500000, selloVenta: 5000, selloHipoteca: 6250 },
  },
  {
    nombre: "Cash purchase of J$12,000,000",
    origen: { tipo: "recalculado", url: FEES, detalle: "Transfer tax 240,000 plus stamp duty 5,000." },
    fecha: "2026-10-24",
    entrada: { valor: 12000000, hipoteca: false, prestamo: null },
    esperado: { total: 245000, selloHipoteca: 0 },
  },
  {
    nombre: "Small lot of J$450,000",
    origen: { tipo: "recalculado", url: FEES, detalle: "Below 500,000 the stamp duty is 100. Transfer tax 9,000." },
    fecha: "2026-10-24",
    entrada: { valor: 450000, hipoteca: false, prestamo: null },
    esperado: { total: 9100, selloVenta: 100 },
  },
]);
