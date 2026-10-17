import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "1.500 de gastos, 6 meses, 1.000 ahorrados y 500 por mes",
    detalle: "Meta 1500 × 6 = 9000. Falta 9000 − 1000 = 8000. 8000 ÷ 500 = 16 meses. Hoy cubre 1000 ÷ 1500 = 0,66 → 0,6 meses.",
    fecha: "2026-10-13",
    entrada: { gastos: 1500, meses: 6, actual: 1000, aporte: 500 },
    esperado: { meta: 9000, falta: 8000, mesesParaLlegar: 16, cobertura: 0.6 },
  },
  {
    nombre: "División no exacta redondea hacia arriba",
    detalle: "Meta 1000 × 3 = 3000. 3000 ÷ 700 = 4,29 → 5 meses. Sin ahorro previo no se muestra la cobertura.",
    fecha: "2026-10-13",
    entrada: { gastos: 1000, meses: 3, actual: null, aporte: 700 },
    esperado: { meta: 3000, falta: 3000, mesesParaLlegar: 5, cobertura: null },
  },
  {
    nombre: "Fondo ya completo",
    detalle: "Meta 1000 × 6 = 6000 y hay 7000: falta 0, no hay meses para llegar. Cubre 7 meses.",
    fecha: "2026-10-13",
    entrada: { gastos: 1000, meses: 6, actual: 7000, aporte: 200 },
    esperado: { meta: 6000, falta: 0, mesesParaLlegar: null, cobertura: 7 },
  },
  {
    nombre: "Gastos cero es un error",
    detalle: "Sin gastos no hay fondo que calcular.",
    fecha: "2026-10-13",
    entrada: { gastos: 0, meses: 6, actual: null, aporte: null },
    esperaError: true,
  },
];
