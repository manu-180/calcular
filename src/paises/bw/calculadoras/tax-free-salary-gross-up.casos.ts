import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-free-salary-gross-up";

export default definirCasos(calculadora, [
  {
    nombre: "Tax-free salary of P7 500 a month (BURS grossing-up example)",
    origen: {
      tipo: "oficial",
      url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf",
      detalle: "Example in Part II: 7 500 × 12 = 90 000. Tax 1 800 on the first 82 200 plus 12.5/87.5 × 7 800 = 1 114.29, total 2 914.29 a year; 2 914.29 / 12 = P242.86 a month.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 7500, residencia: "resident" },
    esperado: { impuestoAnual: 2914.29, paye: 242.86, bruto: 7742.86 },
  },
  {
    nombre: "P40 000 net a month, resident, into the top bracket",
    origen: {
      tipo: "recalculado",
      detalle: "Net 480 000 a year is above 325 950, the net at P400 000 gross. Gross = 400 000 + (480 000 − 325 950) / 0.725 = 612 482.76; tax 132 482.76; 11 040.23 a month.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 40000, residencia: "resident" },
    esperado: { impuestoAnual: 132482.76, paye: 11040.23 },
  },
  {
    nombre: "P3 000 net a month, non-resident",
    origen: { tipo: "recalculado", detalle: "Net 36 000 in the 5% band: gross 36 000 / 0.95 = 37 894.74; tax 1 894.74; 157.89 a month." },
    fecha: "2026-10-27",
    entrada: { neto: 3000, residencia: "non-resident" },
    esperado: { impuestoAnual: 1894.74, paye: 157.89 },
  },
  {
    nombre: "Zero net",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { neto: 0, residencia: "resident" },
    esperaError: true,
  },
]);
