import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosBs: TextosUi<UiInteresSimple> = {
  slug: "prosta-kamata",
  ui: () => ({
    capital: "Glavnica",
    tasa: "Godišnja kamatna stopa (%)",
    tiempo: "Period",
    unidad: "Period je izražen u",
    dias: "Danima",
    meses: "Mjesecima",
    anios: "Godinama",
    base: "Broj dana u godini (za period u danima)",
    baseAyuda: "Neke banke računaju godinu kao 360 dana. Ako niste sigurni, ostavite 365.",
    base365: "365 dana",
    base360: "360 dana (bankarska godina)",
    interes: "Kamata",
    montoFinal: "Glavnica s kamatom",
    tasaPeriodo: "Stopa za period",
    errorCapital: "Unesite glavnicu veću od nule.",
  }),
};
