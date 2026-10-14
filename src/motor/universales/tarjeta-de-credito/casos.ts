import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "1.000 al 24 % pagando 100 por mes",
    detalle:
      "Interés 2 % mensual sobre el saldo, después se resta el pago. NPER = −ln(1 − 0,02 × 1000 ÷ 100) ÷ ln(1,02) = 11,27 → 12 meses. " +
      "Intereses mes a mes redondeados al centavo: 127,04; total pagado 1127,04.",
    fecha: "2026-10-13",
    entrada: { saldo: 1000, tasa: 24, modo: "fijo", pagoFijo: 100, minimoPorcentaje: null, minimoPiso: null },
    esperado: { meses: 12, intereses: 127.04, total: 1127.04, primerPago: null },
  },
  {
    nombre: "El mismo saldo pagando el mínimo del 5 % con piso de 25",
    detalle:
      "Primer mes: 1000 + 20 de interés = 1020; mínimo 5 % = 51. Cuando el 5 % baja de 25, se paga 25. " +
      "Simulado mes a mes: 48 meses, 467,23 de intereses, 1467,23 en total.",
    fecha: "2026-10-13",
    entrada: { saldo: 1000, tasa: 24, modo: "minimo", pagoFijo: null, minimoPorcentaje: 5, minimoPiso: 25 },
    esperado: { meses: 48, intereses: 467.23, total: 1467.23, primerPago: 51 },
  },
  {
    nombre: "Tasa cero",
    detalle: "Sin interés: 1000 ÷ 100 = 10 meses y 0 de intereses.",
    fecha: "2026-10-13",
    entrada: { saldo: 1000, tasa: 0, modo: "fijo", pagoFijo: 100, minimoPorcentaje: null, minimoPiso: null },
    esperado: { meses: 10, intereses: 0, total: 1000 },
  },
  {
    nombre: "Pago igual al interés es un error",
    detalle: "1000 al 24 %: el interés del mes es 20. Pagando 20 la deuda no baja nunca.",
    fecha: "2026-10-13",
    entrada: { saldo: 1000, tasa: 24, modo: "fijo", pagoFijo: 20, minimoPorcentaje: null, minimoPiso: null },
    esperaError: true,
  },
  {
    nombre: "Mínimo sin piso nunca termina",
    detalle: "Con 1 % de mínimo, sin piso y 24 % anual, el pago es menor que el interés: pide subir el pago.",
    fecha: "2026-10-13",
    entrada: { saldo: 1000, tasa: 24, modo: "minimo", pagoFijo: null, minimoPorcentaje: 1, minimoPiso: 0 },
    esperaError: true,
  },
];
