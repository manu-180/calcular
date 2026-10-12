import { definirCasos } from "@/motor/calculo";
import intereses from "./intereses-prestaciones";

export default definirCasos(intereses, [
  {
    nombre: "Un año en la contabilidad de la empresa, tasa de agosto 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bcv.org.ve/estadisticas/tasas-de-interes",
      detalle: "Tasa de prestaciones de agosto 2026: 47,46 % (Gaceta 43.464). Bs 10.000 × 47,46 % = 4.746 al año; 395,50 por mes.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", garantia: 10000, donde: "contabilidad", meses: 12 },
    esperado: { tasa: 47.46, mesTasa: "agosto de 2026", mensualBs: 395.5, totalBs: 4746, totalUsd: null },
  },
  {
    nombre: "Garantía sin depositar: tasa activa por tres meses",
    origen: { tipo: "recalculado", detalle: "Tasa activa de agosto 2026: 58,93 %. 10.000 × 58,93 % / 12 = 491,08 por mes; × 3 = 1.473,25." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", garantia: 10000, donde: "sin-deposito", meses: 3 },
    esperado: { tasa: 58.93, mensualBs: 491.08, totalBs: 1473.25 },
  },
  {
    nombre: "Garantía en dólares con la tasa de julio 2026",
    origen: { tipo: "recalculado", detalle: "Al 15/07/2026 el último punto cargado es julio: 47,52 %. $2.000 × 47,52 % / 12 = 79,20 por mes." },
    fecha: "2026-07-15",
    entrada: { moneda: "USD", garantia: 2000, donde: "contabilidad", meses: 1 },
    esperado: { tasa: 47.52, mensualUsd: 79.2, totalUsd: 79.2 },
  },
]);
