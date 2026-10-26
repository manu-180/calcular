import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosSv: TextosUi<UiPorcentaje> = {
  slug: "procentraknare",
  ui: () => ({
    modo: "Vad vill du räkna ut?",
    modoParte: "Hur mycket är X % av Y?",
    modoProporcion: "Hur många procent är X av Y?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y minus X %",
    x: "Tal X",
    xAyuda: "Procentsatsen. Väljer du «Hur många procent är X av Y?» är det delen.",
    y: "Tal Y",
    resultado: "Resultat",
    porcentaje: "Procent",
    diferencia: "Belopp som läggs till eller dras av",
    errorYCero: "Y kan inte vara 0. Det går inte att räkna procent av noll.",
    fraseParte: (x, y, r) => `${x} % av ${y} är ${r}.`,
    fraseProporcion: (x, y, p) => `${x} är ${p} % av ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % blir ${r}. Det läggs till ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % blir ${r}. Det dras av ${d}.`,
  }),
};
