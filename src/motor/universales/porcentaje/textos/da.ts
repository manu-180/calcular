import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosDa: TextosUi<UiPorcentaje> = {
  slug: "procentberegner",
  ui: () => ({
    modo: "Hvad vil du regne ud?",
    modoParte: "Hvor meget er X % af Y?",
    modoProporcion: "Hvor mange procent er X af Y?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y minus X %",
    x: "Tal X",
    xAyuda: "Procentsatsen. Vælger du «Hvor mange procent er X af Y?», er det delen.",
    y: "Tal Y",
    resultado: "Resultat",
    porcentaje: "Procent",
    diferencia: "Beløb, der lægges til eller trækkes fra",
    errorYCero: "Y kan ikke være 0. Man kan ikke regne procent af nul.",
    fraseParte: (x, y, r) => `${x} % af ${y} er ${r}.`,
    fraseProporcion: (x, y, p) => `${x} er ${p} % af ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % giver ${r}. Der lægges ${d} til.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % giver ${r}. Der trækkes ${d} fra.`,
  }),
};
