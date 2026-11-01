import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosSl: TextosUi<UiVariacion> = {
  slug: "odstotna-sprememba",
  ui: () => ({
    inicial: "Začetna vrednost",
    final: "Nova vrednost",
    variacion: "Odstotna sprememba",
    diferencia: "Razlika",
    vuelta: "Vrnitev na začetno vrednost",
    vueltaAyuda: "Za koliko bi se morala nova vrednost spremeniti, da bi se vrnila na začetno.",
    errorInicialCero: "Začetna vrednost ne sme biti 0, ker od nič odstotne spremembe ni mogoče izračunati.",
    subio: (p) => `Vrednost se je povečala za ${p} %.`,
    bajo: (p) => `Vrednost se je zmanjšala za ${p} %.`,
    igual: "Ni spremembe: obe vrednosti sta enaki.",
  }),
};
