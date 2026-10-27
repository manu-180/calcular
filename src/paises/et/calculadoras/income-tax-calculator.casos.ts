import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 10,000 a month",
    origen: { tipo: "recalculado", detalle: "2,000 × 15% + 3,000 × 20% + 3,000 × 25% = 1,650, the same as 10,000 × 25% − 850." },
    fecha: "2026-10-27",
    entrada: { ingreso: 10000 },
    esperado: { impuesto: 1650, marginal: 25, deduccion: 850 },
  },
  {
    nombre: "ETB 14,000, top of the 30% band",
    origen: { tipo: "recalculado", detalle: "300 + 600 + 750 + 4,000 × 30% = 2,850, the same as 14,000 × 30% − 1,350." },
    fecha: "2026-10-27",
    entrada: { ingreso: 14000 },
    esperado: { impuesto: 2850, marginal: 30, deduccion: 1350 },
  },
  {
    nombre: "ETB 50,000 a month",
    origen: { tipo: "recalculado", detalle: "50,000 × 35% − 2,050 = 15,450." },
    fecha: "2026-10-27",
    entrada: { ingreso: 50000 },
    esperado: { impuesto: 15450, deduccion: 2050, anual: 185400 },
  },
  {
    nombre: "ETB 4,000, top of the 15% band",
    origen: { tipo: "recalculado", detalle: "2,000 × 15% = 300." },
    fecha: "2026-10-27",
    entrada: { ingreso: 4000 },
    esperado: { impuesto: 300, marginal: 15, deduccion: 300 },
  },
  {
    nombre: "ETB 1,500 pays nothing",
    origen: { tipo: "recalculado", detalle: "Income up to 2,000 is in the 0% band." },
    fecha: "2026-10-27",
    entrada: { ingreso: 1500 },
    esperado: { impuesto: 0, marginal: 0 },
  },
]);
