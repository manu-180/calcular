import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "1000 W, 2 horas, 30 días, kWh a 0,20",
    detalle: "1000 × 2 ÷ 1000 = 2 kWh por día; × 30 = 60 por mes; × 12 = 720 por año. Costos: 0,40, 12 y 144.",
    fecha: "2026-10-13",
    entrada: { potencia: 1000, cantidad: 1, horas: 2, dias: 30, precio: 0.2 },
    esperado: { kwhDia: 2, kwhMes: 60, kwhAnio: 720, costoDia: 0.4, costoMes: 12, costoAnio: 144 },
  },
  {
    nombre: "10 lámparas LED de 9 W, 5 horas",
    detalle: "9 × 10 × 5 ÷ 1000 = 0,45 kWh por día; × 31 = 13,95 por mes; costo 13,95 × 150 = 2092,50.",
    fecha: "2026-10-13",
    entrada: { potencia: 9, cantidad: 10, horas: 5, dias: 31, precio: 150 },
    esperado: { kwhDia: 0.45, kwhMes: 13.95, costoMes: 2092.5 },
  },
  {
    nombre: "Más de 24 horas es un error",
    detalle: "Un día no tiene 25 horas de uso.",
    fecha: "2026-10-13",
    entrada: { potencia: 100, cantidad: 1, horas: 25, dias: 30, precio: 1 },
    esperaError: true,
  },
];
