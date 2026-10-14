import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R400 000 taxable income in 2026/27, under 65",
    origen: { tipo: "recalculado", detalle: "79 998 + (400 000 − 383 100) × 31% = 85 237, less primary rebate 17 820 = 67 417; 5 618.08 a month." },
    fecha: "2026-10-14",
    entrada: { ingreso: 400000, edad: "under-65", medicos: 0, meses: 12 },
    esperado: { antes: 85237, rebates: 17820, impuesto: 67417, mensual: 5618.08, marginal: 31 },
  },
  {
    nombre: "R400 000 in the 2025/26 tax year",
    origen: { tipo: "recalculado", detalle: "2026 tables: 77 362 + (400 000 − 370 500) × 31% = 86 507, less primary rebate 17 235 = 69 272." },
    fecha: "2026-01-15",
    entrada: { ingreso: 400000, edad: "under-65", medicos: 0, meses: 12 },
    esperado: { antes: 86507, impuesto: 69272 },
  },
  {
    nombre: "R160 000 at 75 or older pays no tax",
    origen: { tipo: "recalculado", detalle: "160 000 × 18% = 28 800, below the three rebates 17 820 + 9 765 + 3 249 = 30 834. Threshold for 75+ is 171 300." },
    fecha: "2026-10-14",
    entrada: { ingreso: 160000, edad: "75-and-over", medicos: 1, meses: 12 },
    esperado: { antes: 28800, rebates: 28800, credito: 0, impuesto: 0 },
  },
  {
    nombre: "R1 000 000 with three on medical aid",
    origen: {
      tipo: "recalculado",
      detalle: "259 783 + (1 000 000 − 887 000) × 41% = 306 113 − 17 820 = 288 293. Credit (376 + 376 + 254) × 12 = 12 072. Tax 276 221.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 1000000, edad: "under-65", medicos: 3, meses: 12 },
    esperado: { antes: 306113, credito: 12072, impuesto: 276221, marginal: 41 },
  },
]);
