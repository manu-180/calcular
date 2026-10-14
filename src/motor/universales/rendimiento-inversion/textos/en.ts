import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosEn: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "Amount invested",
    final: "Final value",
    finalAyuda: "What the investment is worth today, or what you got when you sold it.",
    cobrado: "Income received along the way (optional)",
    cobradoAyuda: "Dividends, interest or rent you collected and did not reinvest.",
    anios: "Years held",
    aniosAyuda: "Decimals are fine for part years, like a year and a half.",
    ganancia: "Gain",
    roi: "Total return (ROI)",
    cagr: "Annual return (CAGR)",
    cagrAyuda: "The yearly return that gives the same result when compounded year after year.",
    errorInicial: "Enter how much you invested at the start.",
    observacionCorto: "For less than a year, the annual return stretches a short result as if it repeated all year. Read it with care.",
    observacionInflacion: "To see whether you gained buying power, compare the annual return with inflation over the same period.",
  }),
};
