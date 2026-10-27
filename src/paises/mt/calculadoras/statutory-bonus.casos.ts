import { definirCasos } from "@/motor/calculo";
import calculadora from "./statutory-bonus";

const DIER = "https://web.archive.org/web/20260712031603/https://dier.gov.mt/en/services/employment-conditions/wages/bonus-and-weekly-allowances/";

export default definirCasos(calculadora, [
  {
    nombre: "Full December bonus, whole-time",
    origen: { tipo: "oficial", url: DIER, detalle: "DIER: the full statutory bonus is €135.10." },
    fecha: "2026-10-26",
    entrada: { pago: "december", completo: true, dias: null, semanas: null, horas: 40 },
    esperado: { pago: 135.1, completo: 135.1, parte: 100 },
  },
  {
    nombre: "Full September weekly allowance, whole-time",
    origen: { tipo: "oficial", url: DIER, detalle: "DIER: the full weekly allowance is €121.16." },
    fecha: "2026-10-26",
    entrada: { pago: "september", completo: true, dias: null, semanas: null, horas: 40 },
    esperado: { pago: 121.16 },
  },
  {
    nombre: "June bonus after 92 days",
    origen: { tipo: "recalculado", detalle: "DIER: €0.74 per calendar day. 92 × 0.74 = 68.08." },
    fecha: "2026-10-26",
    entrada: { pago: "june", completo: false, dias: 92, semanas: null, horas: 40 },
    esperado: { pago: 68.08 },
  },
  {
    nombre: "March allowance after 10 weeks, 20 hours a week",
    origen: { tipo: "recalculado", detalle: "DIER: €4.66 per working week. 10 × 4.66 = 46.60, pro rata 20/40 (S.L. 452.79, reg. 6) = 23.30." },
    fecha: "2026-10-26",
    entrada: { pago: "march", completo: false, dias: null, semanas: 10, horas: 20 },
    esperado: { pago: 23.3, parte: 50 },
  },
  {
    nombre: "Day rate never goes above the full bonus",
    origen: { tipo: "recalculado", detalle: "184 × 0.74 = 136.16, capped at the full €135.10." },
    fecha: "2026-10-26",
    entrada: { pago: "december", completo: false, dias: 184, semanas: null, horas: 40 },
    esperado: { pago: 135.1 },
  },
]);
