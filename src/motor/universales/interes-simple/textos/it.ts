import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosIt: TextosUi<UiInteresSimple> = {
  slug: "calcolo-interesse-semplice",
  ui: () => ({
    capital: "Capitale",
    tasa: "Tasso di interesse annuo (%)",
    tiempo: "Durata",
    unidad: "La durata è in",
    dias: "Giorni",
    meses: "Mesi",
    anios: "Anni",
    base: "Giorni in un anno (per durate in giorni)",
    baseAyuda: "Alcune banche contano l'anno come 360 giorni. Se non sei sicuro, lascia 365.",
    base365: "365 giorni (anno civile)",
    base360: "360 giorni (anno commerciale)",
    interes: "Interessi",
    montoFinal: "Montante (capitale più interessi)",
    tasaPeriodo: "Tasso del periodo",
    errorCapital: "Inserisci un capitale maggiore di zero.",
  }),
};
