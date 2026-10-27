import { definirCasos } from "@/motor/calculo";
import calculadora from "./excise-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Tobacco at QAR 25 before tax",
    origen: { tipo: "recalculado", detalle: "GTA: tobacco 100% of the price before tax. 25 × 100% = 25. Final 50." },
    fecha: "2026-10-26",
    entrada: { producto: "tobacco", precio: 25, modo: "sin" },
    esperado: { impuesto: 25, final: 50, tasa: 100 },
  },
  {
    nombre: "Energy drink at QAR 12 with tax",
    origen: { tipo: "recalculado", detalle: "12 ÷ 2 = 6 before tax. Tax 6." },
    fecha: "2026-10-26",
    entrada: { producto: "energy", precio: 12, modo: "con" },
    esperado: { base: 6, impuesto: 6, final: 12 },
  },
]);
