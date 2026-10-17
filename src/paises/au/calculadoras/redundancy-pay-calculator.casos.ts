import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "5 years at $1,500 a week",
    origen: { tipo: "recalculado", detalle: "NES table: 5 to 6 years = 10 weeks; 10 × 1,500 = 15,000. Tax-free limit 2026-27: 13,598 + 5 × 6,801 = 47,603." },
    fecha: "2026-10-14",
    entrada: { anios: 5, semanal: 1500, grande: true },
    esperado: { semanas: 10, pago: 15000, libre: 47603, gravado: 0 },
  },
  {
    nombre: "12 years: the table drops to 12 weeks",
    origen: { tipo: "recalculado", detalle: "At least 10 years = 12 weeks; 12 × 2,000 = 24,000. Limit 13,598 + 12 × 6,801 = 95,210." },
    fecha: "2026-10-14",
    entrada: { anios: 12, semanal: 2000, grande: true },
    esperado: { semanas: 12, pago: 24000, libre: 95210 },
  },
  {
    nombre: "9 years: the highest NES amount",
    origen: { tipo: "recalculado", detalle: "9 to 10 years = 16 weeks; 16 × 1,000 = 16,000." },
    fecha: "2026-10-14",
    entrada: { anios: 9, semanal: 1000, grande: true },
    esperado: { semanas: 16, pago: 16000 },
  },
  {
    nombre: "Small business employer",
    origen: { tipo: "recalculado", detalle: "Fewer than 15 employees: no NES redundancy pay." },
    fecha: "2026-10-14",
    entrada: { anios: 6, semanal: 1500, grande: false },
    esperado: { semanas: 0, pago: 0 },
  },
  {
    nombre: "3 years in 2025-26",
    origen: { tipo: "recalculado", detalle: "3 to 4 years = 7 weeks; 7 × 1,000 = 7,000. Limit 2025-26: 13,100 + 3 × 6,552 = 32,756." },
    fecha: "2026-06-30",
    entrada: { anios: 3, semanal: 1000, grande: true },
    esperado: { semanas: 7, pago: 7000, libre: 32756 },
  },
  {
    nombre: "Less than one year",
    origen: { tipo: "recalculado", detalle: "Less than 1 year of service: no NES redundancy pay." },
    fecha: "2026-10-14",
    entrada: { anios: 0, semanal: 1500, grande: true },
    esperado: { semanas: 0, pago: 0 },
  },
]);
