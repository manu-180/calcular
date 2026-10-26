import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosPl: TextosUi<UiInteresSimple> = {
  slug: "kalkulator-odsetek-prostych",
  ui: () => ({
    capital: "Kapitał",
    tasa: "Oprocentowanie roczne (%)",
    tiempo: "Okres",
    unidad: "Okres podajesz w",
    dias: "Dniach",
    meses: "Miesiącach",
    anios: "Latach",
    base: "Liczba dni w roku (przy okresie w dniach)",
    baseAyuda: "Niektóre banki liczą rok jako 360 dni. Jeśli nie wiesz, zostaw 365.",
    base365: "365 dni",
    base360: "360 dni (rok bankowy)",
    interes: "Odsetki",
    montoFinal: "Kapitał razem z odsetkami",
    tasaPeriodo: "Oprocentowanie za okres",
    errorCapital: "Wpisz kapitał większy od zera.",
  }),
};
