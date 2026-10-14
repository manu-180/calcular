import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "2.000 con 50/30/20",
    detalle: "2000 × 0,5 = 1000; 2000 × 0,3 = 600; 2000 × 0,2 = 400. Ahorro anual 400 × 12 = 4800.",
    fecha: "2026-10-13",
    entrada: { ingreso: 2000, necesidades: 50, gustos: 30, ahorro: 20 },
    esperado: { necesidades: 1000, gustos: 600, ahorro: 400, ahorroAnual: 4800 },
  },
  {
    nombre: "3.000 con 60/30/10",
    detalle: "3000 × 0,6 = 1800; 3000 × 0,3 = 900; 3000 × 0,1 = 300. Ahorro anual 3600.",
    fecha: "2026-10-13",
    entrada: { ingreso: 3000, necesidades: 60, gustos: 30, ahorro: 10 },
    esperado: { necesidades: 1800, gustos: 900, ahorro: 300, ahorroAnual: 3600 },
  },
  {
    nombre: "Tercios: el ahorro absorbe el redondeo",
    detalle: "1000 × 33,333 % = 333,33 dos veces; ahorro = 1000 − 666,66 = 333,34. Los tres suman el ingreso exacto.",
    fecha: "2026-10-13",
    entrada: { ingreso: 1000, necesidades: 33.333, gustos: 33.333, ahorro: 33.334 },
    esperado: { necesidades: 333.33, gustos: 333.33, ahorro: 333.34 },
  },
  {
    nombre: "Porcentajes que no suman 100 son un error",
    detalle: "50 + 30 + 30 = 110: pide ajustar.",
    fecha: "2026-10-13",
    entrada: { ingreso: 2000, necesidades: 50, gustos: 30, ahorro: 30 },
    esperaError: true,
  },
];
