import { definirCasos } from "@/motor/calculo";
import prestaciones from "./prestaciones-sociales";

export default definirCasos(prestaciones, [
  {
    nombre: "Tres años justos con $300, sin garantía cargada",
    origen: {
      tipo: "recalculado",
      detalle:
        "LOTTT art. 142. Diario 300/30 = 10. Bono del 4.º año: 15 + 3 = 18. Integral: 10 + 10×30/360 + 10×18/360 = 11,33. Garantía: 12 trimestres × 15 = 180 + adicionales 2 + 4 = 186 días × 11,33 = 2.107,38. Retroactivo: 3 × 30 = 90 × 11,33 = 1.019,70. Se paga el mayor.",
    },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2023-01-01", fechaSalida: "2025-12-31", diasUtilidades: 30, garantia: null },
    esperado: {
      salarioIntegralUsd: 11.33,
      diasGarantia: 186,
      garantiaUsd: 2107.38,
      diasRetroactivo: 90,
      retroactivoUsd: 1019.7,
      totalUsd: 2107.38,
      totalBs: null,
    },
  },
  {
    nombre: "Garantía real menor que el retroactivo: se paga el retroactivo",
    origen: { tipo: "recalculado", detalle: "Mismo caso con garantía depositada de 800: máx(800; 1.019,70) = 1.019,70." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2023-01-01", fechaSalida: "2025-12-31", diasUtilidades: 30, garantia: 800 },
    esperado: { garantiaUsd: 800, retroactivoUsd: 1019.7, totalUsd: 1019.7 },
  },
  {
    nombre: "Un año y seis meses y un día: la fracción cuenta como año",
    origen: {
      tipo: "recalculado",
      detalle:
        "1 año, 6 meses, 1 día: fracción mayor de seis meses, 2 años × 30 = 60 días. Bono del 2.º año: 16. Integral: 10 + 0,8333 + 0,4444 = 11,28. Retroactivo 60 × 11,28 = 676,80. Garantía cargada 500: se paga 676,80.",
    },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2025-01-01", fechaSalida: "2026-07-01", diasUtilidades: 30, garantia: 500 },
    esperado: { diasGarantia: 105, diasRetroactivo: 60, retroactivoUsd: 676.8, totalUsd: 676.8 },
  },
  {
    nombre: "Menos de tres meses: 5 días por mes o fracción",
    origen: { tipo: "recalculado", detalle: "Art. 142 e. 1 mes y 15 días = 2 meses × 5 = 10 días. Integral: 10 + 10×30/360 + 10×15/360 = 11,25. 10 × 11,25 = 112,50." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2026-08-01", fechaSalida: "2026-09-15", diasUtilidades: 30, garantia: null },
    esperado: { diasRetroactivo: 10, totalUsd: 112.5, garantiaUsd: null },
  },
  {
    nombre: "Un año con el salario mínimo en bolívares",
    origen: {
      tipo: "recalculado",
      detalle: "Bs 130 / 30 = 4,3333. Bono del 2.º año: 16. Integral: 4,3333 + 0,3611 + 0,1926 = 4,89. Garantía 4 trimestres × 15 = 60 × 4,89 = 293,40. Retroactivo 30 × 4,89 = 146,70.",
    },
    fecha: "2026-10-08",
    entrada: { moneda: "VES", salario: 130, fechaIngreso: "2025-01-01", fechaSalida: "2025-12-31", diasUtilidades: 30, garantia: null },
    esperado: { salarioIntegralBs: 4.89, garantiaBs: 293.4, retroactivoBs: 146.7, totalBs: 293.4, totalUsd: null },
  },
  {
    nombre: "Días de utilidades por debajo del mínimo de ley",
    origen: { tipo: "recalculado", detalle: "Art. 131: mínimo 30 días." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2023-01-01", fechaSalida: "2025-12-31", diasUtilidades: 20, garantia: null },
    esperaError: true,
  },
]);
