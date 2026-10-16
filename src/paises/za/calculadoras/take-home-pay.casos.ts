import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "R30 000 a month, under 65, no medical aid",
    origen: {
      tipo: "recalculado",
      detalle: "Yearly 360 000. Tax 44 118 + (360 000 − 245 100) × 26% = 73 992, less primary rebate 17 820 = 56 172; PAYE 4 681 a month. UIF 1% of the 17 712 ceiling = 177.12. Net 30 000 − 4 681 − 177.12 = 25 141.88.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 30000, edad: "under-65", medicos: 0, retiro: 0 },
    esperado: { paye: 4681, uif: 177.12, neto: 25141.88, anualNeto: 301702.56, marginal: 26 },
  },
  {
    nombre: "R50 000 with two on medical aid and R5 000 to an RA",
    origen: {
      tipo: "recalculado",
      detalle: "Yearly 600 000, RA 60 000 (under 27.5% = 165 000) so taxable 540 000. Tax 125 599 + 9 800 × 36% = 129 127 − 17 820 = 111 307. Medical credit (376 + 376) × 12 = 9 024. PAYE 102 283 a year, 8 523.58 a month. Net 50 000 − 8 523.58 − 177.12 − 5 000 = 36 299.30.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 50000, edad: "under-65", medicos: 2, retiro: 5000 },
    esperado: { paye: 8523.58, credito: 752, neto: 36299.3, payeAnual: 102283, marginal: 36 },
  },
  {
    nombre: "R20 000 a month, aged 65 to 74",
    origen: {
      tipo: "recalculado",
      detalle: "Yearly 240 000 × 18% = 43 200, less primary and secondary rebates 17 820 + 9 765 = 15 615 a year; PAYE 1 301.25. UIF 177.12. Net 18 521.63.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 20000, edad: "65-to-74", medicos: 0, retiro: 0 },
    esperado: { paye: 1301.25, uif: 177.12, neto: 18521.63 },
  },
  {
    nombre: "R8 000 a month is below the tax threshold",
    origen: { tipo: "recalculado", detalle: "Yearly 96 000 is under the 99 000 threshold, so no PAYE. UIF 1% = 80. Net 7 920." },
    fecha: "2026-10-14",
    entrada: { salario: 8000, edad: "under-65", medicos: 0, retiro: 0 },
    esperado: { paye: 0, uif: 80, neto: 7920 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not a valid input." },
    fecha: "2026-10-14",
    entrada: { salario: 0, edad: "under-65", medicos: 0, retiro: 0 },
    esperaError: true,
  },
]);
