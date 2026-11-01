import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosHr: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-postotaka",
  ui: () => ({
    modo: "Što želite izračunati?",
    modoParte: "Koliko je X % od Y?",
    modoProporcion: "Koliko posto od Y je X?",
    modoAumento: "Y uvećano za X %",
    modoRebaja: "Y umanjeno za X %",
    x: "Broj X",
    xAyuda: "Postotak. Ako odaberete „Koliko posto od Y je X?”, to je dio cjeline.",
    y: "Broj Y",
    resultado: "Rezultat",
    porcentaje: "Postotak",
    diferencia: "Iznos koji se dodaje ili oduzima",
    errorYCero: "Y ne može biti 0: od nule se postotak ne može izračunati.",
    fraseParte: (x, y, r) => `${x} % od ${y} iznosi ${r}.`,
    fraseProporcion: (x, y, p) => `${x} je ${p} % od ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} uvećano za ${x} % iznosi ${r}: dodaje se ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} umanjeno za ${x} % iznosi ${r}: oduzima se ${d}.`,
  }),
};
