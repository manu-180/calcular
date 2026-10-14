import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosEn: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "What do you want to work out?",
    modoParte: "What is X% of Y?",
    modoProporcion: "X is what percent of Y?",
    modoAumento: "Y plus X%",
    modoRebaja: "Y minus X%",
    x: "Number X",
    xAyuda: "The percentage. If you pick “X is what percent of Y?”, it is the part.",
    y: "Number Y",
    resultado: "Result",
    porcentaje: "Percentage",
    diferencia: "Amount added or taken off",
    errorYCero: "Y can't be 0: there is no percentage of zero.",
    fraseParte: (x, y, r) => `${x}% of ${y} is ${r}.`,
    fraseProporcion: (x, y, p) => `${x} is ${p}% of ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x}% is ${r}: ${d} is added.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x}% is ${r}: ${d} is taken off.`,
  }),
};
