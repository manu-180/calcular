import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosDa: TextosUi<UiInteresSimple> = {
  slug: "renteberegner",
  ui: () => ({
    capital: "Beløb",
    tasa: "Årlig rente (%)",
    tiempo: "Tid",
    unidad: "Tiden angives i",
    dias: "Dage",
    meses: "Måneder",
    anios: "År",
    base: "Dage pr. år (ved tid i dage)",
    baseAyuda: "Nogle banker regner året som 360 dage. Er du i tvivl, så lad det stå på 365.",
    base365: "365 dage",
    base360: "360 dage (bankår)",
    interes: "Rente",
    montoFinal: "Beløb plus rente",
    tasaPeriodo: "Rente for perioden",
    errorCapital: "Skriv et beløb, der er større end nul.",
  }),
};
