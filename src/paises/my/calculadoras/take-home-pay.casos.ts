import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

const BASE = { categoria: "single", hijos: 0, hijosEstudios: 0, categoriaSocso: "first" } as const;

export default definirCasos(calculadora, [
  {
    nombre: "RM5,000 a month, single, all schemes",
    origen: {
      tipo: "recalculado",
      detalle: "SOCSO band RM4,900 to RM5,000: Invalidity 24.75 + SKBBK 37.15 = 61.90. EIS 9.90. PCB: P = 4,450 + (5,000 − 313.63) × 11 − 9,000 = 47,000.07; (12,000.07 × 6% + 600) / 12 = 110.00. Net 5,000 − 550 − 61.90 − 9.90 − 110 = 4,268.20.",
    },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 5000, epf: 550, skbbk: true, eis: true },
    esperado: { neto: 4268.2, socso: 61.9, eis: 9.9, pcb: 110, deducciones: 731.8, anual: 51218.4 },
  },
  {
    nombre: "RM3,000 a month without LINDUNG 24 Jam: no PCB",
    origen: { tipo: "recalculado", detalle: "SOCSO band RM2,900 to RM3,000: Invalidity 14.75. EIS 5.90. PCB 0 (P = 23,040, tax below the rebate). Net 3,000 − 330 − 14.75 − 5.90 = 2,649.35." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 3000, epf: 330, skbbk: false, eis: true },
    esperado: { neto: 2649.35, socso: 14.75, eis: 5.9, pcb: 0 },
  },
  {
    nombre: "RM8,000 a month: SOCSO and EIS stop at the RM6,000 ceiling",
    origen: {
      tipo: "recalculado",
      detalle: "Over RM6,000: SOCSO 29.75 + 44.65 = 74.40, EIS 11.90. PCB: P = 7,120 + (8,000 − 283.63) × 11 − 9,000 = 83,000.07; (13,000.07 × 19% + 3,700) / 12 = 514.16, rounded up to 514.20. Net 6,519.50.",
    },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 8000, epf: 880, skbbk: true, eis: true },
    esperado: { neto: 6519.5, socso: 74.4, eis: 11.9, pcb: 514.2 },
  },
  {
    nombre: "EPF equal to the salary",
    origen: { tipo: "recalculado", detalle: "The EPF contribution cannot be the whole salary." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 1000, epf: 1000, skbbk: true, eis: true },
    esperaError: true,
  },
]);
