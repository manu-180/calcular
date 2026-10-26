import { definirCasos } from "@/motor/calculo";
import calculadora from "./vacation-leave-calculator";

const LMP = "https://www.mlss.gov.jm/wp-content/uploads/2024/07/Labour-Management-Procedures-LMP-JAMAICA-SPIRO-FINAL.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "More than 220 days, 3 years of service, 5-day week",
    origen: { tipo: "recalculado", url: LMP, detalle: "Holidays with Pay Order: 2 normal working weeks = 10 days. Pay 2 × 40,000 = 80,000." },
    fecha: "2026-10-24",
    entrada: { dias: 240, anios: 3, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 10, semanas: 2, pago: 80000 },
  },
  {
    nombre: "More than 220 days, 12 years of service",
    origen: { tipo: "recalculado", url: LMP, detalle: "3 normal working weeks = 15 days on a 5-day week. Pay 3 × 40,000 = 120,000." },
    fecha: "2026-10-24",
    entrada: { dias: 250, anios: 12, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 15, semanas: 3, pago: 120000 },
  },
  {
    nombre: "150 days worked",
    origen: { tipo: "recalculado", url: LMP, detalle: "150 / 22 = 6.8, and a fraction counts as a full day: 7 days. Pay 40,000 / 5 × 7 = 56,000." },
    fecha: "2026-10-24",
    entrada: { dias: 150, anios: 1, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 7, pago: 56000 },
  },
  {
    nombre: "Exactly 220 days",
    origen: { tipo: "recalculado", detalle: "220 is not more than 220: 220 / 22 = 10 days." },
    fecha: "2026-10-24",
    entrada: { dias: 220, anios: 1, diasSemana: 6, semanal: 30000 },
    esperado: { dias: 10, semanas: 0, pago: 50000 },
  },
  {
    nombre: "Under 110 days",
    origen: { tipo: "recalculado", detalle: "Fewer than 110 days: no vacation leave." },
    fecha: "2026-10-24",
    entrada: { dias: 100, anios: 0, diasSemana: 5, semanal: 40000 },
    esperado: { dias: 0, pago: 0 },
  },
]);
