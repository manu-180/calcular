import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosDe: TextosUi<UiInteresSimple> = {
  slug: "zinsrechner",
  ui: () => ({
    capital: "Kapital",
    tasa: "Zinssatz pro Jahr (%)",
    tiempo: "Laufzeit",
    unidad: "Einheit der Laufzeit",
    dias: "Tage",
    meses: "Monate",
    anios: "Jahre",
    base: "Tage pro Jahr (bei Laufzeit in Tagen)",
    baseAyuda: "Manche Banken rechnen das Jahr mit 360 Tagen. Wenn Sie unsicher sind, lassen Sie 365 stehen.",
    base365: "365 Tage",
    base360: "360 Tage (kaufmännisches Jahr)",
    interes: "Zinsen",
    montoFinal: "Kapital plus Zinsen",
    tasaPeriodo: "Zinssatz für den Zeitraum",
    errorCapital: "Geben Sie ein Kapital über null ein.",
  }),
};
