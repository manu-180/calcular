import { definirCasos } from "@/motor/calculo";
import dagrovebitiPensia from "./dagrovebiti-pensia";

const KANONI = "https://site-api.pensions.ge/uploads/docs/legislation/funded-pension-law-2026.pdf";

export default definirCasos(dagrovebitiPensia, [
  {
    nombre: "უკუგების გარეშე",
    origen: { tipo: "recalculado", url: KANONI, detalle: "1000: 60 ლარი თვეში × 120 თვე = 7200." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 1000, tseli: 10, ukugeba: 0, nashti: 0 },
    esperado: { dagrovili: 7200, tqveni: 2400, mogeba: 0, tvis: 60 },
  },
  {
    nombre: "წლიური 6%",
    origen: { tipo: "recalculado", url: KANONI, detalle: "60 × ((1,005^120 − 1) / 0,005) = 9832,76." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 1000, tseli: 10, ukugeba: 6, nashti: 0 },
    esperado: { dagrovili: 9832.76 },
    tolerancia: 0.02,
  },
]);
