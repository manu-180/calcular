import type { CasoUniversal } from "../tipos";
import type { ValorEntrada } from "../../tipos";

function entrada(pares: readonly (readonly [number | null, number | null])[]): Record<string, ValorEntrada> {
  const e: Record<string, ValorEntrada> = {};
  for (let i = 1; i <= 10; i++) {
    const [n, w] = pares[i - 1] ?? [null, null];
    e[`n${i}`] = n;
    e[`w${i}`] = w;
  }
  return e;
}

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Tres notas con pesos 20, 30 y 50",
    detalle: "(7 × 20 + 8 × 30 + 9 × 50) ÷ 100 = (140 + 240 + 450) ÷ 100 = 8,3; simple (7 + 8 + 9) ÷ 3 = 8.",
    fecha: "2026-10-13",
    entrada: entrada([
      [7, 20],
      [8, 30],
      [9, 50],
    ]),
    esperado: { ponderado: 8.3, simple: 8, cantidad: 3, sumaPesos: 100 },
  },
  {
    nombre: "Créditos que no suman 100",
    detalle: "(6 × 6 + 9 × 4) ÷ 10 = 72 ÷ 10 = 7,2; simple (6 + 9) ÷ 2 = 7,5.",
    fecha: "2026-10-13",
    entrada: entrada([
      [6, 6],
      [9, 4],
    ]),
    esperado: { ponderado: 7.2, simple: 7.5, sumaPesos: 10 },
  },
  {
    nombre: "Sin pesos, ponderado igual al simple",
    detalle: "(6 + 8) ÷ 2 = 7 en los dos.",
    fecha: "2026-10-13",
    entrada: entrada([
      [6, null],
      [8, null],
    ]),
    esperado: { ponderado: 7, simple: 7, sumaPesos: null },
  },
  {
    nombre: "Pesos a medias es un error",
    detalle: "Una nota tiene peso y la otra no: pide completar el peso que falta.",
    fecha: "2026-10-13",
    entrada: entrada([
      [6, 30],
      [8, null],
    ]),
    esperaError: true,
  },
  {
    nombre: "Sin notas es un error",
    detalle: "No hay nada que promediar.",
    fecha: "2026-10-13",
    entrada: entrada([]),
    esperaError: true,
  },
];
