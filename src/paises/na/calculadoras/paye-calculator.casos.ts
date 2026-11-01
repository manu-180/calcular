import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const NAMRA = "https://itas.namra.org.na/tax/income-tax/calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$300,000 a year, no contributions",
    origen: { tipo: "oficial", url: NAMRA, detalle: "NamRA tax calculator, 27 October 2026: income 300,000 gives annual tax N$46,500 and monthly tax N$3,875 (9,000 + 25% of 150,000)." },
    fecha: "2026-10-27",
    entrada: { ingreso: 300000, periodo: "year", aportes: 0 },
    esperado: { anual: 46500, mensual: 3875, marginal: 25 },
  },
  {
    nombre: "N$660,000 a year with N$40,000 to a pension fund",
    origen: { tipo: "oficial", url: NAMRA, detalle: "NamRA tax calculator: income 600,000 plus allowances 60,000 and pension 40,000 gives taxable income 620,000 and tax N$136,000 (115,000 + 30% of 70,000)." },
    fecha: "2026-10-27",
    entrada: { ingreso: 660000, periodo: "year", aportes: 40000 },
    esperado: { anual: 136000, mensual: 11333.33, gravable: 620000, deduccion: 40000 },
  },
  {
    nombre: "N$2,000,000 a year, contributions above the cap",
    origen: { tipo: "oficial", url: NAMRA, detalle: "NamRA tax calculator: pension 200,000 is capped at 150,000, taxable income 1,850,000, tax N$540,000 (429,000 + 37% of 300,000)." },
    fecha: "2026-10-27",
    entrada: { ingreso: 2000000, periodo: "year", aportes: 200000 },
    esperado: { anual: 540000, deduccion: 150000, marginal: 37 },
  },
  {
    nombre: "N$8,000 a month is below the threshold",
    origen: { tipo: "recalculado", detalle: "8,000 × 12 = 96,000, below N$100,000: no tax." },
    fecha: "2026-10-27",
    entrada: { ingreso: 8000, periodo: "month", aportes: 0 },
    esperado: { anual: 0, mensual: 0 },
  },
  {
    nombre: "N$100,000 a month",
    origen: { tipo: "recalculado", detalle: "1,200,000 a year: 205,000 + 32% × 350,000 = 317,000. Monthly 26,416.67." },
    fecha: "2026-10-27",
    entrada: { ingreso: 100000, periodo: "month", aportes: 0 },
    esperado: { anual: 317000, mensual: 26416.67, marginal: 32 },
  },
  {
    nombre: "Contributions equal to income",
    origen: { tipo: "recalculado", detalle: "Contributions cannot be as large as income." },
    fecha: "2026-10-27",
    entrada: { ingreso: 10000, periodo: "month", aportes: 10000 },
    esperaError: true,
  },
]);
