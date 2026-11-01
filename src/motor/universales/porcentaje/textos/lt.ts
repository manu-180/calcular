import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosLt: TextosUi<UiPorcentaje> = {
  slug: "procentu-skaiciuokle",
  ui: () => ({
    modo: "Ką norite apskaičiuoti?",
    modoParte: "Kiek yra X % nuo Y?",
    modoProporcion: "Kiek procentų nuo Y sudaro X?",
    modoAumento: "Y plius X %",
    modoRebaja: "Y minus X %",
    x: "Skaičius X",
    xAyuda: "Procentai. Jei pasirinksite „Kiek procentų nuo Y sudaro X?“, tai visumos dalis.",
    y: "Skaičius Y",
    resultado: "Rezultatas",
    porcentaje: "Procentai",
    diferencia: "Pridėta arba atimta suma",
    errorYCero: "Y negali būti 0: nuo nulio procentų apskaičiuoti negalima.",
    fraseParte: (x, y, r) => `${x} % nuo ${y} yra ${r}.`,
    fraseProporcion: (x, y, p) => `${x} yra ${p} % nuo ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plius ${x} % yra ${r}: pridedama ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % yra ${r}: atimama ${d}.`,
  }),
};
