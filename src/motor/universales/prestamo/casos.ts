import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "10.000 al 12 % a 36 meses",
    detalle:
      "i = 0,12 ÷ 12 = 0,01. Cuota = 10000 × 0,01 ÷ (1 − 1,01^−36) = 332,143 → 332,14 (igual que PMT(1 %; 36; 10000)). " +
      "Intereses mes a mes redondeados al centavo y el último pago cierra el saldo: 1957,18 (332,14 × 36 − 10000 = 1957,04 sin ese ajuste).",
    fecha: "2026-10-13",
    entrada: { monto: 10000, tasa: 12, meses: 36, extra: null },
    esperado: { cuota: 332.14, intereses: 1957.18, total: 11957.18, mesesReales: null, ahorro: null },
  },
  {
    nombre: "Con 100 extra por mes termina en 27 meses",
    detalle:
      "Pago de 432,14 por mes. NPER = −ln(1 − 0,01 × 10000 ÷ 432,14) ÷ ln(1,01) = 26,45 → 27 pagos. " +
      "Intereses 1430,93 contra 1957,18 sin extra: ahorro 526,25.",
    fecha: "2026-10-13",
    entrada: { monto: 10000, tasa: 12, meses: 36, extra: 100 },
    esperado: { cuota: 332.14, intereses: 1430.93, total: 11430.93, mesesReales: 27, ahorro: 526.25 },
  },
  {
    nombre: "Tasa cero",
    detalle: "Sin interés la cuota es el monto dividido por el plazo: 1200 ÷ 12 = 100.",
    fecha: "2026-10-13",
    entrada: { monto: 1200, tasa: 0, meses: 12, extra: null },
    esperado: { cuota: 100, intereses: 0, total: 1200 },
  },
  {
    nombre: "Plazo de un mes",
    detalle: "1000 × 1,01 = 1010: se devuelve todo junto con un mes de interés.",
    fecha: "2026-10-13",
    entrada: { monto: 1000, tasa: 12, meses: 1, extra: null },
    esperado: { cuota: 1010, intereses: 10, total: 1010 },
  },
  {
    nombre: "Monto cero es un error",
    detalle: "No hay préstamo de 0: pide corregir el monto.",
    fecha: "2026-10-13",
    entrada: { monto: 0, tasa: 12, meses: 12, extra: null },
    esperaError: true,
  },
];
