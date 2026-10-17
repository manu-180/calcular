import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "El 15 % de 200",
    detalle: "15 × 200 ÷ 100 = 30.",
    fecha: "2026-10-13",
    entrada: { modo: "parte", x: 15, y: 200 },
    esperado: { resultado: 30, porcentaje: null, diferencia: null },
  },
  {
    nombre: "30 es qué porcentaje de 120",
    detalle: "30 ÷ 120 × 100 = 25 %.",
    fecha: "2026-10-13",
    entrada: { modo: "proporcion", x: 30, y: 120 },
    esperado: { porcentaje: 25, resultado: null },
  },
  {
    nombre: "200 más el 21 %",
    detalle: "200 × 21 ÷ 100 = 42; 200 + 42 = 242.",
    fecha: "2026-10-13",
    entrada: { modo: "aumento", x: 21, y: 200 },
    esperado: { resultado: 242, diferencia: 42 },
  },
  {
    nombre: "80 menos el 25 %",
    detalle: "80 × 25 ÷ 100 = 20; 80 − 20 = 60.",
    fecha: "2026-10-13",
    entrada: { modo: "rebaja", x: 25, y: 80 },
    esperado: { resultado: 60, diferencia: 20 },
  },
  {
    nombre: "Porcentaje de una base cero es un error",
    detalle: "X ÷ 0 no existe: pide corregir Y.",
    fecha: "2026-10-13",
    entrada: { modo: "proporcion", x: 5, y: 0 },
    esperaError: true,
  },
];
