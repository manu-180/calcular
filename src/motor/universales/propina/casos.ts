import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "60 con 15 % entre 3",
    detalle: "Propina 60 × 0,15 = 9; total 69; por persona 69 ÷ 3 = 23.",
    fecha: "2026-10-13",
    entrada: { cuenta: 60, porcentaje: 15, personas: 3, redondear: false },
    esperado: { propina: 9, total: 69, porPersona: 23, propinaEfectiva: null },
  },
  {
    nombre: "Redondeo hacia arriba entre 2",
    detalle: "47,50 × 0,10 = 4,75; total 52,25; 52,25 ÷ 2 = 26,125 → 27 por persona; total 54; propina 6,50 = 13,68 % de la cuenta.",
    fecha: "2026-10-13",
    entrada: { cuenta: 47.5, porcentaje: 10, personas: 2, redondear: true },
    esperado: { porPersona: 27, total: 54, propina: 6.5, propinaEfectiva: 13.68 },
  },
  {
    nombre: "Redondeo que no cambia nada",
    detalle: "100 × 0,20 = 20; total 120; 120 ÷ 4 = 30 justo: no hay nada que redondear.",
    fecha: "2026-10-13",
    entrada: { cuenta: 100, porcentaje: 20, personas: 4, redondear: true },
    esperado: { porPersona: 30, total: 120, propina: 20, propinaEfectiva: null },
  },
  {
    nombre: "Cero personas es un error",
    detalle: "No se puede dividir la cuenta entre 0 personas.",
    fecha: "2026-10-13",
    entrada: { cuenta: 60, porcentaje: 10, personas: 0, redondear: false },
    esperaError: true,
  },
];
