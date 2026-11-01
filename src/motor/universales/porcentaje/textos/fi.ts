import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosFi: TextosUi<UiPorcentaje> = {
  slug: "prosenttilaskuri",
  ui: () => ({
    modo: "Mitä haluat laskea?",
    modoParte: "Paljonko on X % luvusta Y?",
    modoProporcion: "Montako prosenttia X on luvusta Y?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y miinus X %",
    x: "Luku X",
    xAyuda: "Prosenttiluku. Jos valitset «Montako prosenttia X on luvusta Y?», X on osa.",
    y: "Luku Y",
    resultado: "Tulos",
    porcentaje: "Prosenttiosuus",
    diferencia: "Lisätty tai vähennetty määrä",
    errorYCero: "Y ei voi olla 0. Nollasta ei voi laskea prosenttiosuutta.",
    fraseParte: (x, y, r) => `${x} % luvusta ${y} on ${r}.`,
    fraseProporcion: (x, y, p) => `${x} on ${p} % luvusta ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % on ${r}. Lisäys on ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} miinus ${x} % on ${r}. Vähennys on ${d}.`,
  }),
};
