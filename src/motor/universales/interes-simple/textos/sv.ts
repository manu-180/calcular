import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosSv: TextosUi<UiInteresSimple> = {
  slug: "rantekalkylator",
  ui: () => ({
    capital: "Belopp",
    tasa: "Årsränta (%)",
    tiempo: "Tid",
    unidad: "Tiden anges i",
    dias: "Dagar",
    meses: "Månader",
    anios: "År",
    base: "Dagar per år (vid tid i dagar)",
    baseAyuda: "Vissa banker räknar året som 360 dagar. Är du osäker, låt det stå 365.",
    base365: "365 dagar",
    base360: "360 dagar (bankår)",
    interes: "Ränta",
    montoFinal: "Belopp plus ränta",
    tasaPeriodo: "Ränta för perioden",
    errorCapital: "Fyll i ett belopp som är större än noll.",
  }),
};
