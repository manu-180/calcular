import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosHy: TextosUi<UiVariacion> = {
  slug: "tokosayin-popokhutyun",
  ui: () => ({
    inicial: "Սկզբնական արժեք",
    final: "Վերջնական արժեք",
    variacion: "Տոկոսային փոփոխություն",
    diferencia: "Տարբերություն",
    vuelta: "Սկզբնական արժեքին վերադառնալու համար",
    vueltaAyuda: "Որքան պետք է փոխվի վերջնական արժեքը, որպեսզի վերադառնա սկզբնականին։",
    errorInicialCero: "Սկզբնական արժեքը չի կարող 0 լինել, քանի որ զրոյից տոկոսային փոփոխություն չի հաշվարկվում։",
    subio: (p) => `Աճ՝ ${p}%։`,
    bajo: (p) => `Նվազում՝ ${p}%։`,
    igual: "Փոփոխություն չկա՝ երկու արժեքները նույնն են։",
  }),
};
