import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

const IR340 = "https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir300---ir399/ir340/ir340-apr-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "$500 a week with a student loan and KiwiSaver at 3.5%",
    origen: {
      tipo: "oficial",
      url: IR340,
      detalle: "IR340 April 2026, weekly earnings $500: M $75.25, ME $65.25, SL $4.32, KiwiSaver 3.5% $17.50. A year: 26,000 − (65.25 + 4.32 + 17.50) × 52 = 21,472.36.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 500, periodo: "week", kiwisaver: "3.5", prestamo: true, sinIetc: false },
    esperado: { impuesto: 3458, acc: 455, credito: 520, kiwisaver: 910, prestamo: 224.64, anual: 21472.36, semanal: 412.93 },
  },
  {
    nombre: "$78,000 a year with a student loan, no KiwiSaver",
    origen: {
      tipo: "oficial",
      url: IR340,
      detalle: "IR340 April 2026, weekly earnings $1,500 (78,000 a year): M and ME $326.64, SL $124.32. Tax 15,620.50 + ACC 1,365 = 16,985.50 = 326.64 × 52. Take-home 78,000 − 16,985.50 − 6,464.64 = 54,549.86.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 78000, periodo: "year", kiwisaver: "none", prestamo: true, sinIetc: false },
    esperado: { impuesto: 15620.5, acc: 1365, credito: 0, prestamo: 6464.64, anual: 54549.86, marginal: 30 },
  },
  {
    nombre: "$200,000 a year with KiwiSaver at 4% hits the ACC cap",
    origen: {
      tipo: "recalculado",
      detalle: "Tax 1,638 + 6,632.50 + 7,380 + 33,627 + 20,000 × 39% = 57,077.50. ACC 156,641 × 1.75% = 2,741.22. KiwiSaver 8,000. Take-home 132,181.28.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 200000, periodo: "year", kiwisaver: "4", prestamo: false, sinIetc: false },
    esperado: { impuesto: 57077.5, acc: 2741.22, kiwisaver: 8000, anual: 132181.28, marginal: 39 },
  },
  {
    nombre: "$68,000 a year gets part of the IETC",
    origen: {
      tipo: "recalculado",
      detalle: "Tax 1,638 + 6,632.50 + 14,500 × 30% = 12,620.50. ACC 1,190. IETC 520 − 2,000 × 13% = 260. Take-home 68,000 − 12,620.50 − 1,190 + 260 = 54,449.50.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 68000, periodo: "year", kiwisaver: "none", prestamo: false, sinIetc: false },
    esperado: { impuesto: 12620.5, acc: 1190, credito: 260, anual: 54449.5 },
  },
  {
    nombre: "No IETC with Working for Families",
    origen: { tipo: "recalculado", detalle: "Same $500 a week without the credit: 21,472.36 − 520 = 20,952.36." },
    fecha: "2026-10-14",
    entrada: { salario: 500, periodo: "week", kiwisaver: "3.5", prestamo: true, sinIetc: true },
    esperado: { credito: 0, anual: 20952.36 },
  },
  {
    nombre: "ACC levy before 1 April 2026 was 1.67%",
    origen: { tipo: "recalculado", detalle: "On 26,000 in March 2026: ACC 26,000 × 1.67% = 434.20." },
    fecha: "2026-03-15",
    entrada: { salario: 26000, periodo: "year", kiwisaver: "none", prestamo: false, sinIetc: false },
    esperado: { acc: 434.2 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "Pay of 0 is not a valid input." },
    fecha: "2026-10-14",
    entrada: { salario: 0, periodo: "year", kiwisaver: "none", prestamo: false, sinIetc: false },
    esperaError: true,
  },
]);
