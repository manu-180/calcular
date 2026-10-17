import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "De 80 a 100",
    detalle: "(100 − 80) ÷ 80 × 100 = 25 %; diferencia 20; para volver: (80 − 100) ÷ 100 × 100 = −20 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 80, final: 100 },
    esperado: { variacion: 25, diferencia: 20, vuelta: -20 },
  },
  {
    nombre: "De 50 a 40",
    detalle: "(40 − 50) ÷ 50 × 100 = −20 %; diferencia −10; para volver: 10 ÷ 40 × 100 = 25 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 50, final: 40 },
    esperado: { variacion: -20, diferencia: -10, vuelta: 25 },
  },
  {
    nombre: "Inicial negativo",
    detalle: "De −200 a −100: (−100 + 200) ÷ |−200| × 100 = 50 % (mejoró).",
    fecha: "2026-10-13",
    entrada: { inicial: -200, final: -100 },
    esperado: { variacion: 50, diferencia: 100 },
  },
  {
    nombre: "Final cero",
    detalle: "De 30 a 0: −100 %; no hay porcentaje para volver desde cero.",
    fecha: "2026-10-13",
    entrada: { inicial: 30, final: 0 },
    esperado: { variacion: -100, vuelta: null },
  },
  {
    nombre: "Inicial cero es un error",
    detalle: "Dividir por 0 no existe: pide corregir el valor inicial.",
    fecha: "2026-10-13",
    entrada: { inicial: 0, final: 10 },
    esperaError: true,
  },
];
