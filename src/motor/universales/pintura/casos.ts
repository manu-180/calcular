import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Cuarto de 14 m de paredes y 2,6 m de alto",
    detalle: "14 × 2,6 = 36,4 m² − 4 = 32,4 m²; × 2 manos ÷ 10 m²/L = 6,48 L; + 10 % = 7,13 L.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { modo: "medidas", largo: 14, alto: 2.6, superficie: null, aberturas: 4, manos: 2, rendimiento: 10 },
    esperado: { neta: 32.4, necesario: 6.48, recomendado: 7.13 },
  },
  {
    nombre: "Superficie directa de 400 ft²",
    detalle: "400 ft² × 2 manos ÷ 350 ft²/gal = 2,29 gal; + 10 % = 2,51 gal.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { modo: "superficie", largo: null, alto: null, superficie: 400, aberturas: null, manos: 2, rendimiento: 350 },
    esperado: { neta: 400, necesario: 2.29, recomendado: 2.51 },
  },
  {
    nombre: "Aberturas más grandes que la pared",
    detalle: "10 m² de pared con 12 m² de aberturas no tiene sentido.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { modo: "superficie", largo: null, alto: null, superficie: 10, aberturas: 12, manos: 2, rendimiento: 10 },
    esperaError: true,
  },
  {
    nombre: "Medidas sin alto",
    detalle: "Con el modo de medidas hace falta el alto.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { modo: "medidas", largo: 40, alto: null, superficie: null, aberturas: null, manos: 2, rendimiento: 350 },
    esperaError: true,
  },
];
