import type { ValorEntrada } from "../../tipos";
import type { CasoUniversal } from "../tipos";

function entrada(superficies: readonly (readonly [string, number | null, number | null])[]): Record<string, ValorEntrada> {
  const e: Record<string, ValorEntrada> = {};
  for (let i = 1; i <= 5; i++) {
    const [forma, a, b] = superficies[i - 1] ?? ["ninguna", null, null];
    e[`forma${i}`] = forma;
    e[`a${i}`] = a;
    e[`b${i}`] = b;
  }
  return e;
}

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Rectángulo, triángulo y círculo",
    detalle: "5 × 4 = 20; 3 × 2 ÷ 2 = 3; π × 1² = 3,1416. Total 26,1416 m² → 26,14; × 10,7639 = 281,39 ft².",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: entrada([
      ["rectangulo", 5, 4],
      ["triangulo", 3, 2],
      ["circulo", 2, null],
    ]),
    esperado: { total: 26.14, s1: 20, s2: 3, s3: 3.14, s4: null, equivale: 281.39 },
  },
  {
    nombre: "Cuarto de 12 × 10 pies",
    detalle: "12 × 10 = 120 ft² = 120 ÷ 10,7639 = 11,15 m².",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: entrada([["rectangulo", 12, 10]]),
    esperado: { total: 120, equivale: 11.15 },
  },
  {
    nombre: "Rectángulo sin ancho es un error",
    detalle: "Falta la segunda medida del rectángulo.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: entrada([["rectangulo", 5, null]]),
    esperaError: true,
  },
];
