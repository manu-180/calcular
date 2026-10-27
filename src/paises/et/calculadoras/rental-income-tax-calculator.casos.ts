import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 100,000 of taxable rent",
    origen: { tipo: "recalculado", detalle: "24,000 × 15% + 36,000 × 20% + 16,000 × 25% = 14,800, the same as 100,000 × 25% − 10,200." },
    fecha: "2026-10-27",
    entrada: { ingreso: 100000 },
    esperado: { impuesto: 14800, marginal: 25, deduccion: 10200 },
  },
  {
    nombre: "ETB 200,000 of taxable rent",
    origen: { tipo: "recalculado", detalle: "3,600 + 7,200 + 9,000 + 14,400 + 32,000 × 35% = 45,400." },
    fecha: "2026-10-27",
    entrada: { ingreso: 200000 },
    esperado: { impuesto: 45400, marginal: 35, deduccion: 24600 },
  },
  {
    nombre: "ETB 24,000 pays nothing",
    origen: { tipo: "recalculado", detalle: "The first 24,000 a year is in the 0% band." },
    fecha: "2026-10-27",
    entrada: { ingreso: 24000 },
    esperado: { impuesto: 0 },
  },
]);
