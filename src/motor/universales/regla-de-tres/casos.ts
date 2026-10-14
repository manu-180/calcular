import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Directa: 3 kilos son 600, 5 kilos",
    detalle: "X = 600 × 5 ÷ 3 = 1000.",
    fecha: "2026-10-13",
    entrada: { tipo: "directa", a: 3, b: 600, c: 5 },
    esperado: { x: 1000 },
  },
  {
    nombre: "Inversa: 4 personas tardan 12 días, 6 personas",
    detalle: "X = 4 × 12 ÷ 6 = 8.",
    fecha: "2026-10-13",
    entrada: { tipo: "inversa", a: 4, b: 12, c: 6 },
    esperado: { x: 8 },
  },
  {
    nombre: "Directa con resultado periódico",
    detalle: "X = 10 × 1 ÷ 3 = 3,3333 (redondeado a 4 decimales).",
    fecha: "2026-10-13",
    entrada: { tipo: "directa", a: 3, b: 10, c: 1 },
    esperado: { x: 3.3333 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Directa con A en cero es un error",
    detalle: "La cuenta divide por A = 0: pide corregirlo.",
    fecha: "2026-10-13",
    entrada: { tipo: "directa", a: 0, b: 10, c: 5 },
    esperaError: true,
  },
  {
    nombre: "Inversa con C en cero es un error",
    detalle: "La cuenta divide por C = 0: pide corregirlo.",
    fecha: "2026-10-13",
    entrada: { tipo: "inversa", a: 4, b: 12, c: 0 },
    esperaError: true,
  },
];
