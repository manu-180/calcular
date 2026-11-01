import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosSr: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-procenata",
  ui: () => ({
    modo: "Šta želite da izračunate?",
    modoParte: "Koliko je X% od Y?",
    modoProporcion: "Koliko procenata od Y je X?",
    modoAumento: "Y uvećano za X%",
    modoRebaja: "Y umanjeno za X%",
    x: "Broj X",
    xAyuda: "Procenat. Ako izaberete „Koliko procenata od Y je X?“, to je deo celine.",
    y: "Broj Y",
    resultado: "Rezultat",
    porcentaje: "Procenat",
    diferencia: "Iznos koji se dodaje ili oduzima",
    errorYCero: "Y ne može biti 0: od nule se procenat ne može izračunati.",
    fraseParte: (x, y, r) => `${x}% od ${y} je ${r}.`,
    fraseProporcion: (x, y, p) => `${x} je ${p}% od ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} uvećano za ${x}% je ${r}: dodaje se ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} umanjeno za ${x}% je ${r}: oduzima se ${d}.`,
  }),
};
