import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-tax-relief";

export default definirCasos(calculadora, [
  {
    nombre: "P1 500 a month on a P20 000 salary",
    origen: {
      tipo: "recalculado",
      detalle: "240 000 a year, contribution 18 000 (cap 31 304). Tax without: 13 050 + 25% × 84 000 = 34 050. With: 222 000 → 13 050 + 25% × 66 000 = 29 550. Saving 4 500 a year, 375 a month.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 20000, aporte: 1500 },
    esperado: { ahorro: 375, costoReal: 1125, ahorroAnual: 4500, noDeducible: 0 },
  },
  {
    nombre: "Contribution above the cap on P40 000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "480 000 a year, cap 480 000 × 15/115 = 62 608.70 (5 217.39 a month). Contribution 7 000 × 12 = 84 000. Saving 27.5% × 62 608.70 = 17 217.39 a year, 1 434.78 a month.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 40000, aporte: 7000 },
    esperado: { ahorro: 1434.78, maximo: 5217.39, noDeducible: 1782.61 },
  },
  {
    nombre: "No saving below the tax threshold",
    origen: { tipo: "recalculado", detalle: "3 500 a month is 42 000 a year, under the 48 000 nil band." },
    fecha: "2026-10-27",
    entrada: { salario: 3500, aporte: 200 },
    esperado: { ahorro: 0, costoReal: 200 },
  },
  {
    nombre: "Contribution equal to salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 5000, aporte: 5000 },
    esperaError: true,
  },
]);
