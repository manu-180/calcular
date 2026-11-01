import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosHr: TextosUi<UiInteresSimple> = {
  slug: "jednostavna-kamata",
  ui: () => ({
    capital: "Glavnica",
    tasa: "Godišnja kamatna stopa (%)",
    tiempo: "Razdoblje",
    unidad: "Razdoblje je izraženo u",
    dias: "Danima",
    meses: "Mjesecima",
    anios: "Godinama",
    base: "Broj dana u godini (za razdoblje u danima)",
    baseAyuda: "Neke banke računaju godinu kao 360 dana. Ako niste sigurni, ostavite 365.",
    base365: "365 dana",
    base360: "360 dana (bankarska godina)",
    interes: "Kamata",
    montoFinal: "Glavnica s kamatom",
    tasaPeriodo: "Stopa za razdoblje",
    errorCapital: "Unesite glavnicu veću od nule.",
  }),
};
