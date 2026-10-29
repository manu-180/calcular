import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

const GUIA = "https://www.rsl.org.ls/sites/default/files/2026-09/Guide%20on%20Taxation%20of%20Employment%20Income%2026-27.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "M10 000 a month (RSL example 3)",
    origen: { tipo: "oficial", url: GUIA, detalle: "First M6 480 at 20% = 1 296, balance M3 520 at 30% = 1 056, less credit 1 020 = M1 332." },
    fecha: "2026-10-27",
    entrada: { salario: 10000, pension: 0 },
    esperado: { paye: 1332, neto: 8668, marginal: 30 },
  },
  {
    nombre: "M6 480 a month (RSL example 2)",
    origen: { tipo: "oficial", url: GUIA, detalle: "M6 480 at 20% = 1 296, less credit 1 020 = M276." },
    fecha: "2026-10-27",
    entrada: { salario: 6480, pension: 0 },
    esperado: { paye: 276, neto: 6204, marginal: 20 },
  },
  {
    nombre: "M5 100 a month pays no tax (RSL example 1)",
    origen: { tipo: "oficial", url: GUIA, detalle: "M5 100 at 20% = 1 020, less credit 1 020 = 0." },
    fecha: "2026-10-27",
    entrada: { salario: 5100, pension: 0 },
    esperado: { paye: 0, neto: 5100 },
  },
  {
    nombre: "Pension above the 20% cap",
    origen: { tipo: "recalculado", detalle: "Cap 20% of 10 000 = 2 000. Chargeable 8 000: 1 296 + 1 520 × 30% = 1 752, less 1 020 = 732. Net 10 000 − 732 − 2 500 = 6 768." },
    fecha: "2026-10-27",
    entrada: { salario: 10000, pension: 2500 },
    esperado: { paye: 732, neto: 6768, imponible: 8000 },
  },
  {
    nombre: "M10 000 in the 2025/26 tax year",
    origen: { tipo: "recalculado", detalle: "Band M6 170 and credit M970: 1 234 + 3 830 × 30% = 2 383, less 970 = M1 413." },
    fecha: "2026-03-15",
    entrada: { salario: 10000, pension: 0 },
    esperado: { paye: 1413, neto: 8587 },
  },
  {
    nombre: "Salary of zero",
    origen: { tipo: "recalculado", detalle: "There is nothing to calculate." },
    fecha: "2026-10-27",
    entrada: { salario: 0, pension: 0 },
    esperaError: true,
  },
]);
