import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosIs: TextosUi<UiPorcentaje> = {
  slug: "prosentureiknivel",
  ui: () => ({
    modo: "Hvað viltu reikna?",
    modoParte: "Hvað er X% af Y?",
    modoProporcion: "Hve mörg prósent er X af Y?",
    modoAumento: "Y plús X%",
    modoRebaja: "Y mínus X%",
    x: "Tala X",
    xAyuda: "Prósentan. Ef þú velur „Hve mörg prósent er X af Y?“ er þetta hlutinn.",
    y: "Tala Y",
    resultado: "Niðurstaða",
    porcentaje: "Prósenta",
    diferencia: "Upphæð sem bætist við eða dregst frá",
    errorYCero: "Y getur ekki verið 0. Það er ekki hægt að reikna prósentu af núlli.",
    fraseParte: (x, y, r) => `${x}% af ${y} er ${r}.`,
    fraseProporcion: (x, y, p) => `${x} er ${p}% af ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plús ${x}% er ${r}. Viðbótin er ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} mínus ${x}% er ${r}. Frádrátturinn er ${d}.`,
  }),
};
