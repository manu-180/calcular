import type { CasoUniversal } from "../tipos";

const vacio = { p4: null, p5: null, p6: null, p7: null, p8: null };

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Tres personas, una no pagó",
    detalle: "Total 90 + 30 + 0 = 120; parte 40. Saldos: +50, −10, −40. Pagos: 3 → 1 40 y 2 → 1 10.",
    fecha: "2026-10-13",
    entrada: { p1: 90, p2: 30, p3: 0, ...vacio },
    esperado: { total: 120, personas: 3, cuota: 40, transferencias: 2 },
  },
  {
    nombre: "Cuatro personas que pusieron lo mismo",
    detalle: "Total 4 × 25 = 100; parte 25; todos con saldo 0: ningún pago.",
    fecha: "2026-10-13",
    entrada: { p1: 25, p2: 25, p3: 25, p4: 25, p5: null, p6: null, p7: null, p8: null },
    esperado: { total: 100, personas: 4, cuota: 25, transferencias: 0 },
  },
  {
    nombre: "Parte con decimales periódicos",
    detalle: "Total 100; parte 33,33. Saldos: +66,67, −33,33, −33,33. Dos pagos de 33,33.",
    fecha: "2026-10-13",
    entrada: { p1: 100, p2: 0, p3: 0, ...vacio },
    esperado: { total: 100, personas: 3, cuota: 33.33, transferencias: 2 },
  },
  {
    nombre: "Una sola persona es un error",
    detalle: "No hay con quién dividir: pide al menos dos personas.",
    fecha: "2026-10-13",
    entrada: { p1: 50, p2: null, p3: null, ...vacio },
    esperaError: true,
  },
];
