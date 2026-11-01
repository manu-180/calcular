import { definirCasos } from "@/motor/calculo";
import calculadora from "./terminal-benefits-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Six years, laid off for economic reasons",
    origen: { tipo: "recalculado", detalle: "Article 31: between 5 and 10 years, three times the average. 3,600,000 ÷ 12 = 300,000 × 3 = 900,000." },
    fecha: "2026-10-26",
    entrada: { anios: 6, total12: 3600000, motivo: "economic" },
    esperado: { monto: 900000, meses: 3, promedio: 300000 },
  },
  {
    nombre: "Three years",
    origen: { tipo: "recalculado", detalle: "Less than 5 years: twice the average. 2,400,000 ÷ 12 = 200,000 × 2 = 400,000." },
    fecha: "2026-10-26",
    entrada: { anios: 3, total12: 2400000, motivo: "economic" },
    esperado: { monto: 400000, meses: 2 },
  },
  {
    nombre: "Retiring after 30 years",
    origen: { tipo: "recalculado", detalle: "Article 32 uses the Article 31 scale. Over 25 years: seven times. 6,000,000 ÷ 12 = 500,000 × 7 = 3,500,000." },
    fecha: "2026-10-26",
    entrada: { anios: 30, total12: 6000000, motivo: "retirement" },
    esperado: { monto: 3500000, meses: 7 },
  },
  {
    nombre: "Ten months of service",
    origen: { tipo: "recalculado", detalle: "Less than 12 consecutive months: no terminal benefits." },
    fecha: "2026-10-26",
    entrada: { anios: 0.8, total12: 2000000, motivo: "economic" },
    esperado: { monto: 0 },
  },
]);
