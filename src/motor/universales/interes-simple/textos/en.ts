import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosEn: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "Principal",
    tasa: "Annual interest rate (%)",
    tiempo: "Time",
    unidad: "Time is in",
    dias: "Days",
    meses: "Months",
    anios: "Years",
    base: "Days in a year (for terms in days)",
    baseAyuda: "Some banks count a year as 360 days. If you are not sure, leave 365.",
    base365: "365 days",
    base360: "360 days (banker's year)",
    interes: "Interest",
    montoFinal: "Principal plus interest",
    tasaPeriodo: "Rate for the period",
    errorCapital: "Enter a principal greater than zero.",
  }),
};
