import { definirCasos } from "@/motor/calculo";
import calculadora from "./turnover-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 400,000 of sales in the month",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/turnover-tax-tot", detalle: "1.5% × 400,000 = 6,000. 1.5% × 4,800,000 = 72,000." },
    fecha: "2026-10-17",
    entrada: { ventas: 400000, anual: 4800000 },
    esperado: { impuesto: 6000, anualEstimado: 72000, aplica: "Yes" },
  },
  {
    nombre: "Turnover above KSh 25 million",
    origen: { tipo: "recalculado", detalle: "30 million a year is above the turnover tax range." },
    fecha: "2026-10-17",
    entrada: { ventas: 2500000, anual: 30000000 },
    esperado: { impuesto: 37500, aplica: "No" },
  },
  {
    nombre: "Exactly KSh 1 million is below the range",
    origen: { tipo: "recalculado", detalle: "Turnover must be more than 1,000,000." },
    fecha: "2026-10-17",
    entrada: { ventas: 80000, anual: 1000000 },
    esperado: { aplica: "No" },
  },
]);
