import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "70 kg y 175 cm",
    detalle: "70 ÷ 1,75² = 70 ÷ 3,0625 = 22,86 → 22,9 (peso normal). Rango: 18,5 × 3,0625 = 56,7 kg a 24,9 × 3,0625 = 76,3 kg.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { peso: 70, altura: 175 },
    esperado: { imc: 22.9, pesoMin: 56.7, pesoMax: 76.3 },
  },
  {
    nombre: "Borde exacto de sobrepeso",
    detalle: "81 ÷ 1,80² = 81 ÷ 3,24 = 25,0: ya es sobrepeso (desde 25).",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { peso: 81, altura: 180 },
    esperado: { imc: 25 },
  },
  {
    nombre: "160 lb y 5 ft 9 in",
    detalle: "160 lb = 72,575 kg; 69 in = 1,7526 m; 72,575 ÷ 3,0716 = 23,6. Rango: 18,5 × 3,0716 ÷ 0,45359 = 125,3 lb a 24,9 × 3,0716 ÷ 0,45359 = 168,6 lb.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { peso: 160, pies: 5, pulgadas: 9 },
    esperado: { imc: 23.6, pesoMin: 125.3, pesoMax: 168.6 },
  },
  {
    nombre: "Altura cero es un error (métrico)",
    detalle: "No se puede dividir por una altura de 0.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { peso: 70, altura: 0 },
    esperaError: true,
  },
  {
    nombre: "Altura cero es un error (imperial)",
    detalle: "0 ft 0 in no es una altura.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { peso: 160, pies: 0, pulgadas: 0 },
    esperaError: true,
  },
];
