import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Full year, three years of service",
    origen: { tipo: "recalculado", detalle: "Article 46: 12 × 1.5 = 18 days, plus 1 day for 3 years = 19." },
    fecha: "2026-10-26",
    entrada: { meses: 12, anios: 3, menor: false },
    esperado: { total: 19, base: 18, extra: 1 },
  },
  {
    nombre: "Full year, 15 years of service",
    origen: { tipo: "recalculado", detalle: "18 + 5 = 23, capped at 21 working days." },
    fecha: "2026-10-26",
    entrada: { meses: 12, anios: 15, menor: false },
    esperado: { total: 21, extra: 5 },
  },
  {
    nombre: "Seven months in the first year",
    origen: { tipo: "recalculado", detalle: "7 × 1.5 = 10.5 days, no extra." },
    fecha: "2026-10-26",
    entrada: { meses: 7, anios: 0, menor: false },
    esperado: { total: 10.5 },
  },
  {
    nombre: "Employee aged 17, six months",
    origen: { tipo: "recalculado", detalle: "Two working days a month: 6 × 2 = 12." },
    fecha: "2026-10-26",
    entrada: { meses: 6, anios: 0, menor: true },
    esperado: { total: 12 },
  },
]);
