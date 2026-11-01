import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosIs: TextosUi<UiInteresSimple> = {
  slug: "einfaldir-vextir",
  ui: () => ({
    capital: "Upphæð",
    tasa: "Ársvextir (%)",
    tiempo: "Tími",
    unidad: "Tímaeining",
    dias: "Dagar",
    meses: "Mánuðir",
    anios: "Ár",
    base: "Dagar á ári (ef tíminn er í dögum)",
    baseAyuda: "Sumir bankar reikna árið sem 360 daga. Ef þú ert ekki viss skaltu halda þig við 365.",
    base365: "365 dagar",
    base360: "360 dagar (bankaár)",
    interes: "Vextir",
    montoFinal: "Upphæð með vöxtum",
    tasaPeriodo: "Vextir á tímabilinu",
    errorCapital: "Sláðu inn upphæð sem er hærri en núll.",
  }),
};
