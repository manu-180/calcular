import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Cruce de febrero bisiesto",
    detalle: "28/2/2024 + 2 días corridos: 29/2 y 1/3/2024 (viernes).",
    fecha: "2026-10-13",
    entrada: { fecha: "2024-02-28", operacion: "sumar", dias: 2, tipo: "corridos" },
    esperado: { resultado: "2024-03-01", diasCorridos: 2 },
  },
  {
    nombre: "Un día hábil desde un viernes",
    detalle: "Viernes 16/10/2026 + 1 hábil: salta sábado y domingo, cae el lunes 19/10/2026; 3 días corridos.",
    fecha: "2026-10-13",
    entrada: { fecha: "2026-10-16", operacion: "sumar", dias: 1, tipo: "habiles" },
    esperado: { resultado: "2026-10-19", diasCorridos: 3 },
  },
  {
    nombre: "Restar con cambio de mes",
    detalle: "1/3/2026 − 1 día corrido = 28/2/2026 (2026 no es bisiesto).",
    fecha: "2026-10-13",
    entrada: { fecha: "2026-03-01", operacion: "restar", dias: 1, tipo: "corridos" },
    esperado: { resultado: "2026-02-28", diasCorridos: 1 },
  },
  {
    nombre: "Diez hábiles hacia atrás",
    detalle: "Lunes 19/10/2026 − 10 hábiles: dos semanas de lunes a viernes, cae el lunes 5/10/2026; 14 corridos.",
    fecha: "2026-10-13",
    entrada: { fecha: "2026-10-19", operacion: "restar", dias: 10, tipo: "habiles" },
    esperado: { resultado: "2026-10-05", diasCorridos: 14 },
  },
  {
    nombre: "Días negativos es un error",
    detalle: "Para ir hacia atrás se usa la opción restar, no un número negativo.",
    fecha: "2026-10-13",
    entrada: { fecha: "2026-10-13", operacion: "sumar", dias: -5, tipo: "corridos" },
    esperaError: true,
  },
];
