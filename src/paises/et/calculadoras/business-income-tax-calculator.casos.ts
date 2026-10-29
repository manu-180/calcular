import { definirCasos } from "@/motor/calculo";
import calculadora from "./business-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 150,000 of taxable profit",
    origen: { tipo: "recalculado", detalle: "3,600 + 7,200 + 9,000 + 30,000 × 30% = 28,800, the same as 150,000 × 30% − 16,200." },
    fecha: "2026-10-27",
    entrada: { ingreso: 150000 },
    esperado: { impuesto: 28800, marginal: 30, deduccion: 16200 },
  },
  {
    nombre: "ETB 48,000 of taxable profit",
    origen: { tipo: "recalculado", detalle: "24,000 × 15% = 3,600." },
    fecha: "2026-10-27",
    entrada: { ingreso: 48000 },
    esperado: { impuesto: 3600, marginal: 15 },
  },
  {
    nombre: "ETB 500,000 of taxable profit",
    origen: { tipo: "recalculado", detalle: "500,000 × 35% − 24,600 = 150,400." },
    fecha: "2026-10-27",
    entrada: { ingreso: 500000 },
    esperado: { impuesto: 150400 },
  },
]);
