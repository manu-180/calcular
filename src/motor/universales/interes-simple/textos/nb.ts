import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosNb: TextosUi<UiInteresSimple> = {
  slug: "rentekalkulator",
  ui: () => ({
    capital: "Beløp",
    tasa: "Rente per år (%)",
    tiempo: "Tid",
    unidad: "Tiden oppgis i",
    dias: "Dager",
    meses: "Måneder",
    anios: "År",
    base: "Dager per år (når tiden er i dager)",
    baseAyuda: "Noen banker regner året som 360 dager. Er du usikker, lar du det stå på 365.",
    base365: "365 dager",
    base360: "360 dager (bankår)",
    interes: "Renter",
    montoFinal: "Beløp pluss renter",
    tasaPeriodo: "Rente for perioden",
    errorCapital: "Skriv inn et beløp som er større enn null.",
  }),
};
