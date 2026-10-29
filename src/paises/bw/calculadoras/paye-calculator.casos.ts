import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const TABLA = "https://www.burs.org.bw/images/Tax%20Table_2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "P4 000 a fortnight (BURS example 6)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 6: 4 000 × 26 = 104 000; 1 800 + 12.5% × 20 000 = 4 300 a year; 4 300 / 26 = P165.38 a fortnight." },
    fecha: "2026-10-27",
    entrada: { ingreso: 4000, periodo: "fortnightly", residencia: "resident" },
    esperado: { impuestoPeriodo: 165.38, impuestoAnual: 4300, marginal: 12.5 },
  },
  {
    nombre: "P18 000 a month (BURS example 3)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 3: tax to be withheld P2 337.50." },
    fecha: "2026-10-27",
    entrada: { ingreso: 18000, periodo: "monthly", residencia: "resident" },
    esperado: { impuestoPeriodo: 2337.5, neto: 15662.5 },
  },
  {
    nombre: "P1 000 a week",
    origen: { tipo: "recalculado", detalle: "52 000 a year: 5% × 4 000 = 200, / 52 = 3.85." },
    fecha: "2026-10-27",
    entrada: { ingreso: 1000, periodo: "weekly", residencia: "resident" },
    esperado: { impuestoPeriodo: 3.85 },
  },
  {
    nombre: "P500 000 a year, resident",
    origen: { tipo: "recalculado", detalle: "74 050 + 27.5% × 100 000 = 101 550." },
    fecha: "2026-10-27",
    entrada: { ingreso: 500000, periodo: "yearly", residencia: "resident" },
    esperado: { impuestoAnual: 101550, marginal: 27.5 },
  },
  {
    nombre: "P60 000 a year, non-resident",
    origen: { tipo: "recalculado", detalle: "Non-residents pay 5% from the first pula: 3 000." },
    fecha: "2026-10-27",
    entrada: { ingreso: 60000, periodo: "yearly", residencia: "non-resident" },
    esperado: { impuestoAnual: 3000, marginal: 5 },
  },
  {
    nombre: "P500 000 a year in tax year 2025/26",
    origen: { tipo: "recalculado", detalle: "Old table: 13 050 + 25% × 344 000 = 99 050." },
    fecha: "2026-06-30",
    entrada: { ingreso: 500000, periodo: "yearly", residencia: "resident" },
    esperado: { impuestoAnual: 99050, marginal: 25 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ingreso: 0, periodo: "monthly", residencia: "resident" },
    esperaError: true,
  },
]);
