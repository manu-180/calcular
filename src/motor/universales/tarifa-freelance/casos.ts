import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "40.000 netos, 5.000 de gastos, 20 % de impuestos",
    detalle:
      "Facturación = 40000 ÷ 0,8 + 5000 = 55000. Días = 52 × 5 − 30 = 230. Horas = 230 × 5 = 1150. " +
      "Por hora 55000 ÷ 1150 = 47,83; por día 47,826 × 5 = 239,13; por mes 55000 ÷ 12 = 4583,33.",
    fecha: "2026-10-13",
    entrada: { ingreso: 40000, gastos: 5000, impuestos: 20, diasLibres: 30, diasSemana: 5, horasSemana: 25 },
    esperado: { tarifaHora: 47.83, tarifaDia: 239.13, facturacionMensual: 4583.33, facturacionAnual: 55000, horasAnio: 1150 },
  },
  {
    nombre: "Sin impuestos, gastos ni días libres",
    detalle: "52000 ÷ (52 × 40 = 2080 horas) = 25 por hora; 8 horas por día = 200.",
    fecha: "2026-10-13",
    entrada: { ingreso: 52000, gastos: 0, impuestos: 0, diasLibres: 0, diasSemana: 5, horasSemana: 40 },
    esperado: { tarifaHora: 25, tarifaDia: 200, facturacionAnual: 52000, horasAnio: 2080 },
  },
  {
    nombre: "Impuestos del 100 % son un error",
    detalle: "Con 100 % de impuestos no queda ingreso neto posible (división por cero).",
    fecha: "2026-10-13",
    entrada: { ingreso: 40000, gastos: 5000, impuestos: 100, diasLibres: 30, diasSemana: 5, horasSemana: 25 },
    esperaError: true,
  },
  {
    nombre: "Más días libres que días de trabajo es un error",
    detalle: "52 × 1 − 60 = −8 días de trabajo.",
    fecha: "2026-10-13",
    entrada: { ingreso: 40000, gastos: 5000, impuestos: 20, diasLibres: 60, diasSemana: 1, horasSemana: 8 },
    esperaError: true,
  },
];
