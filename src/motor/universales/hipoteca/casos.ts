import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "200.000 con 20 % de entrada al 7 % a 25 años",
    detalle:
      "Entrada 40000, préstamo 160000. Cuota = PMT(0,07 ÷ 12; 300; 160000) = 1130,85. " +
      "Intereses mes a mes redondeados al centavo, con el último pago cerrando el saldo: 179252,48 (1130,85 × 300 − 160000 = 179255 sin ese ajuste).",
    fecha: "2026-10-13",
    entrada: { precio: 200000, entradaPorcentaje: 20, entradaMonto: null, tasa: 7, anios: 25, gastos: null },
    esperado: { entrada: 40000, prestado: 160000, cuota: 1130.85, cuotaTotal: null, intereses: 179252.48, total: 339252.48 },
  },
  {
    nombre: "Entrada en dinero, tasa cero y gastos mensuales",
    detalle:
      "La entrada de 50000 pisa el porcentaje: préstamo 150000 − 50000 = 100000. Sin interés, 100000 ÷ 120 = 833,33. " +
      "Con 100 de gastos, el pago mensual es 933,33.",
    fecha: "2026-10-13",
    entrada: { precio: 150000, entradaPorcentaje: 20, entradaMonto: 50000, tasa: 0, anios: 10, gastos: 100 },
    esperado: { entrada: 50000, prestado: 100000, cuota: 833.33, cuotaTotal: 933.33, intereses: 0, total: 100000 },
  },
  {
    nombre: "Plazo de un año",
    detalle: "100000 al 6 % (0,5 % mensual) en 12 cuotas: PMT = 8606,64. Intereses con redondeo mensual: 3279,73.",
    fecha: "2026-10-13",
    entrada: { precio: 100000, entradaPorcentaje: 0, entradaMonto: null, tasa: 6, anios: 1, gastos: null },
    esperado: { prestado: 100000, cuota: 8606.64, intereses: 3279.73 },
  },
  {
    nombre: "Entrada del 100 % es un error",
    detalle: "Si la entrada cubre todo el precio no hay préstamo que calcular.",
    fecha: "2026-10-13",
    entrada: { precio: 100000, entradaPorcentaje: 100, entradaMonto: null, tasa: 7, anios: 20, gastos: null },
    esperaError: true,
  },
];
