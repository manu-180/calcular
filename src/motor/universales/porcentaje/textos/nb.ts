import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosNb: TextosUi<UiPorcentaje> = {
  slug: "prosentkalkulator",
  ui: () => ({
    modo: "Hva vil du regne ut?",
    modoParte: "Hvor mye er X % av Y?",
    modoProporcion: "Hvor mange prosent er X av Y?",
    modoAumento: "Y pluss X %",
    modoRebaja: "Y minus X %",
    x: "Tall X",
    xAyuda: "Prosentsatsen. Velger du «Hvor mange prosent er X av Y?», er det delen.",
    y: "Tall Y",
    resultado: "Resultat",
    porcentaje: "Prosent",
    diferencia: "Beløp som legges til eller trekkes fra",
    errorYCero: "Y kan ikke være 0. Det går ikke å regne prosent av null.",
    fraseParte: (x, y, r) => `${x} % av ${y} er ${r}.`,
    fraseProporcion: (x, y, p) => `${x} er ${p} % av ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} pluss ${x} % blir ${r}. Det legges til ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % blir ${r}. Det trekkes fra ${d}.`,
  }),
};
