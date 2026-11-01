import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosHu: TextosUi<UiInteresSimple> = {
  slug: "kamat-kalkulator",
  ui: () => ({
    capital: "Tőke",
    tasa: "Éves kamat (%)",
    tiempo: "Időtartam",
    unidad: "Az időtartam mértékegysége",
    dias: "Nap",
    meses: "Hónap",
    anios: "Év",
    base: "Napok száma egy évben (napokban megadott időtartamnál)",
    baseAyuda: "Egyes bankok 360 napos évvel számolnak. Ha nem vagy biztos benne, hagyd 365 napon.",
    base365: "365 nap",
    base360: "360 nap (banki év)",
    interes: "Kamat",
    montoFinal: "Tőke a kamattal együtt",
    tasaPeriodo: "Kamatláb az időszakra",
    errorCapital: "Nullánál nagyobb tőkét adj meg.",
  }),
};
