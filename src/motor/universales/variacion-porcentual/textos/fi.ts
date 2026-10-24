import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosFi: TextosUi<UiVariacion> = {
  slug: "prosenttimuutos",
  ui: () => ({
    inicial: "Alkuperäinen arvo",
    final: "Uusi arvo",
    variacion: "Muutos prosentteina",
    diferencia: "Erotus",
    vuelta: "Paluu alkuperäiseen",
    vueltaAyuda: "Montako prosenttia uuden arvon pitää muuttua, jotta se palaa alkuperäiseen arvoon.",
    errorInicialCero: "Alkuperäinen arvo ei voi olla 0. Prosenttimuutosta ei voi laskea nollasta.",
    subio: (p) => `Arvo on noussut ${p} %.`,
    bajo: (p) => `Arvo on laskenut ${p} %.`,
    igual: "Ei muutosta. Arvot ovat yhtä suuret.",
  }),
};
