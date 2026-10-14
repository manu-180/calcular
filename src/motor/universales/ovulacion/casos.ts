import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Ciclo de 28 con cambio de mes",
    detalle: "10/2/2026 + 28 − 14 = 24/2/2026 (ovulación); fértiles 19/2 al 25/2; próxima 10/2 + 28 = 10/3/2026 (febrero de 28 días).",
    fecha: "2026-10-13",
    entrada: { fum: "2026-02-10", ciclo: 28 },
    esperado: { ovulacion: "2026-02-24", fertilDesde: "2026-02-19", fertilHasta: "2026-02-25", proxima: "2026-03-10" },
  },
  {
    nombre: "Ciclo de 30 en febrero bisiesto",
    detalle: "15/2/2024 + 30 − 14 = 15/2 + 16 = 2/3/2024 (pasa por el 29/2); fértiles 26/2 al 3/3; próxima 16/3/2024.",
    fecha: "2026-10-13",
    entrada: { fum: "2024-02-15", ciclo: 30 },
    esperado: { ovulacion: "2024-03-02", fertilDesde: "2024-02-26", fertilHasta: "2024-03-03", proxima: "2024-03-16" },
  },
  {
    nombre: "Ciclo demasiado corto es un error",
    detalle: "Un ciclo de 15 días queda fuera del rango que la estimación puede cubrir (21 a 45).",
    fecha: "2026-10-13",
    entrada: { fum: "2026-02-10", ciclo: 15 },
    esperaError: true,
  },
];
