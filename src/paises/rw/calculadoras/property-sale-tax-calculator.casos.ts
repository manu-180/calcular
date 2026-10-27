import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-sale-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "House sold for RWF 30,000,000 by an unregistered seller",
    origen: { tipo: "recalculado", detalle: "(30,000,000 − 5,000,000) × 2.5% = 625,000." },
    fecha: "2026-10-26",
    entrada: { valor: 30000000, vendedor: "other" },
    esperado: { impuesto: 625000, base: 25000000, neto: 29375000 },
  },
  {
    nombre: "Commercial building sold for RWF 100,000,000 by a registered seller",
    origen: { tipo: "recalculado", detalle: "(100,000,000 − 5,000,000) × 2% = 1,900,000." },
    fecha: "2026-10-26",
    entrada: { valor: 100000000, vendedor: "registered" },
    esperado: { impuesto: 1900000, tasa: 2 },
  },
  {
    nombre: "Plot sold for RWF 4,000,000",
    origen: { tipo: "recalculado", detalle: "Below the 5,000,000 that is not taxed: no tax." },
    fecha: "2026-10-26",
    entrada: { valor: 4000000, vendedor: "other" },
    esperado: { impuesto: 0, base: 0 },
  },
]);
