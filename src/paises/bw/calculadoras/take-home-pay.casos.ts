import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

const TABLA = "https://www.burs.org.bw/images/Tax%20Table_2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "P18 000 a month, resident (BURS example 3)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 3 of the 2026 tax table: P18 000 a month, tax to be withheld P2 337.50." },
    fecha: "2026-10-27",
    entrada: { salario: 18000, residencia: "resident", pension: 0 },
    esperado: { paye: 2337.5, neto: 15662.5, marginal: 25 },
  },
  {
    nombre: "P34 000 a month, resident, top bracket (BURS example 4)",
    origen: {
      tipo: "oficial",
      url: TABLA,
      detalle: "Example 4: P6 170.83 on the first P33 333 plus 27.5% of P667 = P6 354.26. Worked on the yearly P408 000 it is 76 250 / 12 = 6 354.17; BURS rounds the bracket to P33 333, hence the 9 thebe.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 34000, residencia: "resident", pension: 0 },
    esperado: { paye: 6354.26, marginal: 27.5 },
    tolerancia: 0.1,
  },
  {
    nombre: "P89 000 a month, non-resident director (BURS example 5)",
    origen: { tipo: "oficial", url: TABLA, detalle: "Example 5: P6 370.83 + P15 308.43 = P21 679.26. Yearly: 76 450 + 27.5% × 668 000 = 260 150, / 12 = 21 679.17." },
    fecha: "2026-10-27",
    entrada: { salario: 89000, residencia: "non-resident", pension: 0 },
    esperado: { paye: 21679.26 },
    tolerancia: 0.1,
  },
  {
    nombre: "P50 000 a month from July 2026",
    origen: { tipo: "recalculado", detalle: "600 000 a year: 74 050 + 27.5% × 200 000 = 129 050, / 12 = 10 754.17." },
    fecha: "2026-07-01",
    entrada: { salario: 50000, residencia: "resident", pension: 0 },
    esperado: { paye: 10754.17, neto: 39245.83 },
  },
  {
    nombre: "P20 000 with P2 000 to a pension fund",
    origen: { tipo: "recalculado", detalle: "240 000 − 24 000 = 216 000 taxable (cap 240 000 × 15/115 = 31 304). Tax 13 050 + 25% × 60 000 = 28 050, / 12 = 2 337.50. Net 20 000 − 2 337.50 − 2 000." },
    fecha: "2026-10-27",
    entrada: { salario: 20000, residencia: "resident", pension: 2000 },
    esperado: { paye: 2337.5, neto: 15662.5 },
  },
  {
    nombre: "Pension contribution above the 15% cap",
    origen: {
      tipo: "recalculado",
      detalle: "120 000 a year, cap 120 000 × 15/115 = 15 652.17. Taxable 104 347.83: 1 800 + 12.5% × 20 347.83 = 4 343.48, / 12 = 361.96. Net 10 000 − 361.96 − 3 000 = 6 638.04.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 10000, residencia: "resident", pension: 3000 },
    esperado: { paye: 361.96, neto: 6638.04 },
  },
  {
    nombre: "P4 000 a month pays no tax",
    origen: { tipo: "recalculado", detalle: "48 000 a year is the top of the 0% band." },
    fecha: "2026-10-27",
    entrada: { salario: 4000, residencia: "resident", pension: 0 },
    esperado: { paye: 0, neto: 4000 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 0, residencia: "resident", pension: 0 },
    esperaError: true,
  },
]);
