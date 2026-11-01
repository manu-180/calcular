import { definirCasos } from "@/motor/calculo";
import mma from "./mma";

const E = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_cur?geo=LT&sinceTimePeriod=2025&currency=EUR&format=JSON";

export default definirCasos(mma, [
  {
    nombre: "Visas etatas 2026 m.",
    origen: { tipo: "recalculado", url: E, detalle: "Eurostat: 2026-S1 ir S2 = 1153, 2025 = 1038. 1153 − 1038 = 115." },
    fecha: "2026-11-01",
    entrada: { etatas: 100, atlyginimas: null },
    esperado: { proporcija: 1153, mma: 1153, ankstesne: 1038, augimas: 115 },
  },
  {
    nombre: "Pusė etato su 700 eurų atlyginimu",
    origen: { tipo: "recalculado", url: E, detalle: "1153 × 50 % = 576,50; 700 − 576,50 = 123,50." },
    fecha: "2026-11-01",
    entrada: { etatas: 50, atlyginimas: 700 },
    esperado: { proporcija: 576.5, skirtumas: 123.5 },
  },
]);
