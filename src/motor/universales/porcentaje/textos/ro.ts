import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosRo: TextosUi<UiPorcentaje> = {
  slug: "calculator-procente",
  ui: () => ({
    modo: "Ce doriți să calculați?",
    modoParte: "Cât înseamnă X% din Y?",
    modoProporcion: "Ce procent din Y reprezintă X?",
    modoAumento: "Y plus X%",
    modoRebaja: "Y minus X%",
    x: "Numărul X",
    xAyuda: "Procentul. Dacă alegeți „Ce procent din Y reprezintă X?”, este partea.",
    y: "Numărul Y",
    resultado: "Rezultat",
    porcentaje: "Procent",
    diferencia: "Suma adăugată sau scăzută",
    errorYCero: "Y nu poate fi 0: nu există procent din zero.",
    fraseParte: (x, y, r) => `${x}% din ${y} înseamnă ${r}.`,
    fraseProporcion: (x, y, p) => `${x} reprezintă ${p}% din ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x}% înseamnă ${r}: se adaugă ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x}% înseamnă ${r}: se scad ${d}.`,
  }),
};
