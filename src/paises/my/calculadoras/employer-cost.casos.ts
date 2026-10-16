import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "RM4,000 with RM520 employer EPF",
    origen: { tipo: "recalculado", detalle: "SOCSO employer share, row RM3,900 to RM4,000: 69.15. EIS row RM3,900 to RM4,000: 7.90. 4,000 + 520 + 69.15 + 7.90 = 4,597.05 a month." },
    fecha: "2026-10-16",
    entrada: { sueldo: 4000, epf: 520, otros: 0, categoriaSocso: "first", eis: true },
    esperado: { mensual: 4597.05, anual: 55164.6, socso: 69.15, eis: 7.9, cargas: 597.05 },
  },
  {
    nombre: "RM7,000, second category, no EIS, RM70 of other costs",
    origen: { tipo: "recalculado", detalle: "Second category over RM6,000: employer 74.40. 7,000 + 840 + 74.40 + 70 = 7,984.40." },
    fecha: "2026-10-16",
    entrada: { sueldo: 7000, epf: 840, otros: 70, categoriaSocso: "second", eis: false },
    esperado: { mensual: 7984.4, socso: 74.4, eis: 0 },
  },
  {
    nombre: "Zero wages",
    origen: { tipo: "recalculado", detalle: "Wages of 0 are not a valid input." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, epf: 0, otros: 0, categoriaSocso: "first", eis: true },
    esperaError: true,
  },
]);
