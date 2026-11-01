import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay-calculator";

const ACT = "https://www.moice.gov.bt/wp-content/uploads/2022/08/labouract.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Two holidays worked on Nu. 30,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 110: 50% extra. Day = 30,000 / 30 = 1,000. Extra = 1,000 × 0.5 × 2 = 1,000. Normal 2,000, total 3,000." },
    fecha: "2026-10-29",
    entrada: { mensual: 30000, diasMes: 30, diasTrabajados: 2 },
    esperado: { extra: 1000, dia: 1000, totalDias: 3000, feriados: 9 },
  },
  {
    nombre: "Month of 26 days",
    origen: { tipo: "recalculado", detalle: "26,000 / 26 = 1,000. One holiday: extra 500." },
    fecha: "2026-10-29",
    entrada: { mensual: 26000, diasMes: 26, diasTrabajados: 1 },
    esperado: { extra: 500, totalDias: 1500 },
  },
  {
    nombre: "No holidays worked",
    origen: { tipo: "recalculado", detalle: "Zero days gives zero extra." },
    fecha: "2026-10-29",
    entrada: { mensual: 25000, diasMes: 30, diasTrabajados: 0 },
    esperado: { extra: 0 },
  },
]);
