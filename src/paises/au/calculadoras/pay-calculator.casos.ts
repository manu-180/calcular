import { definirCasos } from "@/motor/calculo";
import calculadora from "./pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$85,000 a year, no study loan",
    origen: { tipo: "recalculado", detalle: "Tax 4,020 + 40,000 × 30% = 16,020. Medicare 1,700. Take-home 67,280; a month 5,606.67; a fortnight 2,587.69; a week 1,293.85. Super 12% = 10,200." },
    fecha: "2026-10-14",
    entrada: { salario: 85000, periodo: "anual", incluyeSuper: false, help: false },
    esperado: { impuesto: 16020, medicareLevy: 1700, neto: 67280, mensual: 5606.67, quincenal: 2587.69, semanal: 1293.85, superAnual: 10200 },
  },
  {
    nombre: "$1,500 a week",
    origen: { tipo: "recalculado", detalle: "1,500 × 52 = 78,000. Tax 4,020 + 33,000 × 30% = 13,920. Medicare 1,560. Take-home 62,520; a week 1,202.31." },
    fecha: "2026-10-14",
    entrada: { salario: 1500, periodo: "semanal", incluyeSuper: false, help: false },
    esperado: { salario: 78000, impuesto: 13920, medicareLevy: 1560, neto: 62520, semanal: 1202.31 },
  },
  {
    nombre: "$112,000 package including super, with HELP",
    origen: {
      tipo: "recalculado",
      detalle: "Salary 112,000 / 1.12 = 100,000; super 12,000. Tax 4,020 + 55,000 × 30% = 20,520. Medicare 2,000. HELP (100,000 − 69,528) × 15% = 4,570.80. Take-home 72,909.20.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 112000, periodo: "anual", incluyeSuper: true, help: true },
    esperado: { salario: 100000, superAnual: 12000, impuesto: 20520, medicareLevy: 2000, help: 4570.8, neto: 72909.2 },
  },
  {
    nombre: "$400,000 package above the maximum contribution base",
    origen: {
      tipo: "recalculado",
      detalle: "Super capped at 270,830 × 12% = 32,499.60; salary 367,500.40. Tax 51,370 + 177,500.40 × 45% = 131,245.18. Medicare 7,350.01. Take-home 228,905.21.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 400000, periodo: "anual", incluyeSuper: true, help: false },
    esperado: { salario: 367500.4, superAnual: 32499.6, impuesto: 131245.18, medicareLevy: 7350.01, neto: 228905.21 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "The function asks for pay above zero." },
    fecha: "2026-10-14",
    entrada: { salario: 0, periodo: "anual", incluyeSuper: false, help: false },
    esperaError: true,
  },
]);
