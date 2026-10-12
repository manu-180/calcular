import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-por-despido";

export default definirCasos(indemnizacion, [
  {
    nombre: "Tres años justos con $300, garantía estimada",
    origen: {
      tipo: "recalculado",
      detalle:
        "LOTTT arts. 92 y 142. Integral 11,33; garantía 186 días = 2.107,38; retroactivo 90 días = 1.019,70. Prestaciones: el mayor, 2.107,38. Indemnización igual: 2.107,38. Total 4.214,76.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2023-01-01", fechaSalida: "2025-12-31", diasUtilidades: 30, garantia: null },
    esperado: { prestacionesUsd: 2107.38, indemnizacionUsd: 2107.38, totalUsd: 4214.76, totalBs: null },
  },
  {
    nombre: "Garantía real menor: indemnización sobre el retroactivo",
    origen: { tipo: "recalculado", detalle: "Garantía cargada 800; retroactivo 1.019,70 es mayor. Indemnización 1.019,70; total 2.039,40." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2023-01-01", fechaSalida: "2025-12-31", diasUtilidades: 30, garantia: 800 },
    esperado: { prestacionesUsd: 1019.7, indemnizacionUsd: 1019.7, totalUsd: 2039.4 },
  },
  {
    nombre: "Dos meses en bolívares: 5 días por mes",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 142 e: menos de tres meses, 5 días por mes. Bs 3.000 / 30 = 100; integral 100 + 100×30/360 + 100×15/360 = 112,50. 2 meses × 5 = 10 días = 1.125. Indemnización igual; total 2.250.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 3000, fechaIngreso: "2026-07-01", fechaSalida: "2026-08-31", diasUtilidades: 30, garantia: null },
    esperado: { prestacionesBs: 1125, indemnizacionBs: 1125, totalBs: 2250, totalUsd: null },
  },
]);
