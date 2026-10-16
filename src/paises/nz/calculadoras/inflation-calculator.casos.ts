import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const STATS = "https://www.stats.govt.nz/information-releases/consumers-price-index-june-2026-quarter/";

export default definirCasos(calculadora, [
  {
    nombre: "June 2025 quarter to June 2026 quarter",
    origen: {
      tipo: "oficial",
      url: STATS,
      detalle: "Stats NZ: CPI all groups June 2025 quarter = 1306, June 2026 quarter = 1359; the CPI rose 4.1% in the 12 months to June 2026. 1,000 × 1359 / 1306 = 1,040.58.",
    },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2025-05-10", hasta: "2026-06-30" },
    esperado: { actualizado: 1040.58, diferencia: 40.58, indiceInicial: 1306, indiceFinal: 1359, trimestreFinal: "June 2026 quarter" },
  },
  {
    nombre: "March 2020 quarter to today stops at the latest CPI",
    origen: { tipo: "recalculado", url: STATS, detalle: "March 2020 quarter = 1052. Latest published June 2026 quarter = 1359. 1,000 × 1359 / 1052 = 1,291.83." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2020-01-15", hasta: "2026-10-14" },
    esperado: { actualizado: 1291.83, trimestreInicial: "March 2020 quarter", trimestreFinal: "June 2026 quarter" },
  },
  {
    nombre: "Start quarter not published yet",
    origen: { tipo: "recalculado", detalle: "The September 2026 quarter CPI is not out on 14 October 2026." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2026-08-01", hasta: "2026-10-14" },
    esperaError: true,
  },
]);
