import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosHu: TextosUi<UiPorcentaje> = {
  slug: "szazalekszamitas",
  ui: () => ({
    modo: "Mit szeretnél kiszámolni?",
    modoParte: "Mennyi Y szám X százaléka?",
    modoProporcion: "X hány százaléka Y számnak?",
    modoAumento: "Y plusz X százalék",
    modoRebaja: "Y mínusz X százalék",
    x: "X szám",
    xAyuda: "A százalékláb. Ha azt választod, hogy „X hány százaléka Y számnak?”, akkor X a rész.",
    y: "Y szám",
    resultado: "Eredmény",
    porcentaje: "Százalék",
    diferencia: "Hozzáadott vagy levont összeg",
    errorYCero: "Y nem lehet nulla: a nullának nincs százaléka.",
    fraseParte: (x, y, r) => `Ha az alap ${y}, annak ${x} százaléka ${r}.`,
    fraseProporcion: (x, y, p) => `Ha az alap ${y}, akkor ${x} ennek ${p} százaléka.`,
    fraseAumento: (x, y, r, d) => `${y} plusz ${x} százalék: ${r}. A növekmény: ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} mínusz ${x} százalék: ${r}. A levont rész: ${d}.`,
  }),
};
