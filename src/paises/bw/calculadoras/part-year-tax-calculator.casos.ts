import { definirCasos } from "@/motor/calculo";
import calculadora from "./part-year-tax-calculator";

const TABLA = "https://www.burs.org.bw/images/Tax%20Table_2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Starts on 1 October on P8 000 a month (BURS example 9 b)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 9 (b): 8 000 × 9 = 72 000, tax 1 200; 1 200 / 9 = P133.33 a month." },
    fecha: "2026-10-27",
    entrada: { salario: 8000, meses: 9 },
    esperado: { total: 72000, impuestoAnio: 1200, paye: 133.33 },
  },
  {
    nombre: "Starts on 1 April on P6 000 a month (BURS example 9 a)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 9 (a): 6 000 × 3 = 18 000, tax nil." },
    fecha: "2026-10-27",
    entrada: { salario: 6000, meses: 3 },
    esperado: { impuestoAnio: 0, paye: 0 },
  },
  {
    nombre: "Full year on P8 000",
    origen: { tipo: "recalculado", detalle: "96 000 a year: 1 800 + 12.5% × 12 000 = 3 300; 275 a month." },
    fecha: "2026-10-27",
    entrada: { salario: 8000, meses: 12 },
    esperado: { paye: 275, anualizado: 275, diferencia: 0 },
  },
  {
    nombre: "Starts in October: tax avoided against a full year",
    origen: { tipo: "recalculado", detalle: "Full-year rate 275 × 9 = 2 475, less the 1 200 actually due = 1 275." },
    fecha: "2026-10-27",
    entrada: { salario: 8000, meses: 9 },
    esperado: { anualizado: 275, diferencia: 1275 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 0, meses: 9 },
    esperaError: true,
  },
]);
