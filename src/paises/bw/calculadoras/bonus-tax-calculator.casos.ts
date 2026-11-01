import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One month bonus on P4 000 a month (BURS example 7)",
    origen: {
      tipo: "oficial",
      url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf",
      detalle: "Example 7: 12 × 4 000 = 48 000, tax nil; 52 000, tax 200. Tax on the bonus P200.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 4000, bono: 4000, residencia: "resident" },
    esperado: { impuestoBono: 200, netoBono: 3800, regular: 48000 },
  },
  {
    nombre: "P30 000 bonus that stays under the top bracket",
    origen: { tipo: "recalculado", detalle: "Regular 360 000: 13 050 + 25% × 204 000 = 64 050. With the bonus 390 000, still under 400 000: 13 050 + 25% × 234 000 = 71 550. Bonus tax 7 500." },
    fecha: "2026-10-27",
    entrada: { salario: 30000, bono: 30000, residencia: "resident" },
    esperado: { impuestoBono: 7500, marginal: 25 },
  },
  {
    nombre: "P60 000 bonus on P30 000 a month",
    origen: { tipo: "recalculado", detalle: "420 000: 74 050 + 27.5% × 20 000 = 79 550. Less 64 050 = 15 500." },
    fecha: "2026-10-27",
    entrada: { salario: 30000, bono: 60000, residencia: "resident" },
    esperado: { impuestoBono: 15500, marginal: 27.5 },
  },
  {
    nombre: "Zero bonus",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 4000, bono: 0, residencia: "resident" },
    esperaError: true,
  },
]);
