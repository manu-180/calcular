import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosNl: TextosUi<UiInteresSimple> = {
  slug: "enkelvoudige-rente-berekenen",
  ui: () => ({
    capital: "Hoofdsom",
    tasa: "Rente per jaar (%)",
    tiempo: "Looptijd",
    unidad: "Looptijd in",
    dias: "Dagen",
    meses: "Maanden",
    anios: "Jaren",
    base: "Dagen in een jaar (bij een looptijd in dagen)",
    baseAyuda: "Sommige banken rekenen een jaar als 360 dagen. Weet je het niet zeker, laat dan 365 staan.",
    base365: "365 dagen",
    base360: "360 dagen (bankjaar)",
    interes: "Rente",
    montoFinal: "Hoofdsom plus rente",
    tasaPeriodo: "Rente over de periode",
    errorCapital: "Vul een hoofdsom in die groter is dan nul.",
  }),
};
