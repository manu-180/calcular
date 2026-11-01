import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after 5 years",
    origen: { tipo: "recalculado", detalle: "Daily 9,000 / 30 = 300. Severance 30 + 4 × 10 = 70 days = 21,000. Article 40(4): 60 days = 18,000. Total 39,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 5, meses: 0, motivo: "redundancy" },
    esperado: { total: 39000, indemnizacion: 21000, diasIndemnizacion: 70, extra: 18000, compensacion: 0 },
  },
  {
    nombre: "Unlawful dismissal after 30 years",
    origen: { tipo: "recalculado", detalle: "30 + 29 × 10 = 320 days, under the 360-day cap: 320 × 300 = 96,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 30, meses: 0, motivo: "unlawful" },
    esperado: { total: 96000, diasIndemnizacion: 320 },
  },
  {
    nombre: "40 years hits the twelve-month cap",
    origen: { tipo: "recalculado", detalle: "30 + 39 × 10 = 420 days, capped at 12 months = 108,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 40, meses: 0, motivo: "disability" },
    esperado: { total: 108000, diasIndemnizacion: 360 },
  },
  {
    nombre: "Closure after 6 months",
    origen: { tipo: "recalculado", detalle: "Article 40(2) proportional: 30 × 6/12 = 15 days = 4,500, plus 60 days = 18,000. Total 22,500." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 0, meses: 6, motivo: "closure" },
    esperado: { total: 22500, indemnizacion: 4500, extra: 18000 },
  },
  {
    nombre: "Harassment after 2 years",
    origen: { tipo: "recalculado", detalle: "Severance 30 + 10 = 40 days = 12,000. Article 41(2): 90 days = 27,000. Total 39,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 2, meses: 0, motivo: "harassment" },
    esperado: { total: 39000, compensacion: 27000 },
  },
  {
    nombre: "Employer's conduct after 3 years 6 months",
    origen: { tipo: "recalculado", detalle: "Completed additional years only: 30 + 2 × 10 = 50 days = 15,000. Article 41(1): 30 days = 9,000. Total 24,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 3, meses: 6, motivo: "employer-fault" },
    esperado: { total: 24000, indemnizacion: 15000, compensacion: 9000 },
  },
  {
    nombre: "Resignation after 4 years gives nothing",
    origen: { tipo: "recalculado", detalle: "Article 39(1)(h) requires at least five years." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 4, meses: 11, motivo: "resignation" },
    esperado: { total: 0 },
  },
  {
    nombre: "Resignation after 5 years",
    origen: { tipo: "recalculado", detalle: "30 + 4 × 10 = 70 days = 21,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 5, meses: 0, motivo: "resignation" },
    esperado: { total: 21000 },
  },
]);
