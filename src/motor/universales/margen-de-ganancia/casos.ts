import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Costo 60 y precio 100",
    detalle: "Ganancia 40. Margen 40 ÷ 100 = 40 %. Markup 40 ÷ 60 = 66,6667 %.",
    fecha: "2026-10-13",
    entrada: { modo: "precio", costo: 60, precio: 100, objetivo: null },
    esperado: { precio: 100, ganancia: 40, margen: 40, markup: 66.666667 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Precio para un margen del 25 % con costo 75",
    detalle: "75 ÷ (1 − 0,25) = 100. Markup 25 ÷ 75 = 33,3333 %.",
    fecha: "2026-10-13",
    entrada: { modo: "margen", costo: 75, precio: null, objetivo: 25 },
    esperado: { precio: 100, ganancia: 25, margen: 25, markup: 33.333333 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Markup del 50 % sobre costo 80",
    detalle: "80 × 1,5 = 120. Margen 40 ÷ 120 = 33,3333 %.",
    fecha: "2026-10-13",
    entrada: { modo: "markup", costo: 80, precio: null, objetivo: 50 },
    esperado: { precio: 120, ganancia: 40, margen: 33.333333, markup: 50 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Venta a pérdida",
    detalle: "Costo 100, precio 80: ganancia −20, margen −25 %, markup −20 %.",
    fecha: "2026-10-13",
    entrada: { modo: "precio", costo: 100, precio: 80, objetivo: null },
    esperado: { ganancia: -20, margen: -25, markup: -20 },
  },
  {
    nombre: "Margen del 100 % es un error",
    detalle: "Con margen 100 % el precio sería infinito (costo ÷ 0).",
    fecha: "2026-10-13",
    entrada: { modo: "margen", costo: 50, precio: null, objetivo: 100 },
    esperaError: true,
  },
];
