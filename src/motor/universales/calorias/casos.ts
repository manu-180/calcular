import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Mujer de 30, 60 kg, 165 cm, actividad moderada, bajar",
    detalle: "10 × 60 + 6,25 × 165 − 5 × 30 − 161 = 600 + 1031,25 − 150 − 161 = 1320,25 → 1320. × 1,55 = 2046,39 → 2046. Bajar: 2046,39 − 500 = 1546.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { sexo: "mujer", edad: 30, peso: 60, altura: 165, actividad: "moderada", objetivo: "bajar" },
    esperado: { basal: 1320, mantenimiento: 2046, objetivo: 1546 },
  },
  {
    nombre: "Piso al bajar de peso",
    detalle: "Mujer de 70, 45 kg, 150 cm, poca actividad: 450 + 937,5 − 350 − 161 = 876,5 → 877; × 1,2 = 1051,8 → 1052. 1051,8 − 500 queda por debajo de 1200: se usa 1200.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { sexo: "mujer", edad: 70, peso: 45, altura: 150, actividad: "sedentaria", objetivo: "bajar" },
    esperado: { basal: 877, mantenimiento: 1052, objetivo: 1200 },
  },
  {
    nombre: "Hombre de 35, 180 lb, 5 ft 10 in, poca actividad",
    detalle: "180 lb = 81,647 kg; 70 in = 177,8 cm. 816,47 + 1111,25 − 175 + 5 = 1757,72 → 1758. × 1,2 = 2109,26 → 2109. Subir: + 300 = 2409.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { sexo: "hombre", edad: 35, peso: 180, pies: 5, pulgadas: 10, actividad: "sedentaria", objetivo: "subir" },
    esperado: { basal: 1758, mantenimiento: 2109, objetivo: 2409 },
  },
  {
    nombre: "Edad fuera de rango es un error",
    detalle: "La fórmula es para 15 años o más.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { sexo: "hombre", edad: 10, peso: 35, altura: 140, actividad: "ligera", objetivo: "mantener" },
    esperaError: true,
  },
];
