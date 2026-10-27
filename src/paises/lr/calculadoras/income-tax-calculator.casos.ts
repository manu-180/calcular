import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "L$400,000 a year (band 3)",
    origen: {
      tipo: "recalculado",
      detalle: "LRA PIT table: 6,500 + 15% × (400,000 − 200,000) = 36,500. A month: 3,041.67. Effective rate 9.125%.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 400000, periodo: "anual", divisa: "lrd", tipoCambio: null },
    esperado: { anual: 36500, mensual: 3041.67, marginal: 15, efectiva: 9.125 },
  },
  {
    nombre: "L$70,000 a year pays nothing",
    origen: { tipo: "recalculado", detalle: "Band 1 of the LRA table: up to 70,000 at 0%." },
    fecha: "2026-10-27",
    entrada: { ingreso: 70000, periodo: "anual", divisa: "lrd", tipoCambio: null },
    esperado: { anual: 0, mensual: 0 },
  },
  {
    nombre: "L$100,000 a month (band 4)",
    origen: {
      tipo: "recalculado",
      detalle: "Year 1,200,000: 96,500 + 25% × (1,200,000 − 800,000) = 196,500. A month 16,375.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 100000, periodo: "mensual", divisa: "lrd", tipoCambio: null },
    esperado: { anual: 196500, mensual: 16375, marginal: 25 },
  },
  {
    nombre: "US$500 a month at L$170",
    origen: {
      tipo: "recalculado",
      detalle: "Same method as the LRA PIT Calculator (USD): 500 × 12 × 170 = 1,020,000. 96,500 + 25% × 220,000 = 151,500. A month 12,625, or US$74.26.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 500, periodo: "mensual", divisa: "usd", tipoCambio: 170 },
    esperado: { anualLrd: 1020000, anual: 151500, mensual: 12625, mensualUsd: 74.26 },
  },
  {
    nombre: "US dollars without an exchange rate",
    origen: { tipo: "recalculado", detalle: "The rate is needed to convert to Liberian dollars." },
    fecha: "2026-10-27",
    entrada: { ingreso: 1000, periodo: "anual", divisa: "usd", tipoCambio: 0 },
    esperaError: true,
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ingreso: 0, periodo: "anual", divisa: "lrd", tipoCambio: null },
    esperaError: true,
  },
]);
