import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

const textos: TextosUi<UiPorcentaje> = {
  slug: "prozentrechner",
  ui: () => ({
    modo: "Was möchten Sie berechnen?",
    modoParte: "Wie viel sind X % von Y?",
    modoProporcion: "Wie viel Prozent sind X von Y?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y minus X %",
    x: "Zahl X",
    xAyuda: "Der Prozentsatz. Bei „Wie viel Prozent sind X von Y?“ ist X der Anteil.",
    y: "Zahl Y",
    resultado: "Ergebnis",
    porcentaje: "Prozentsatz",
    diferencia: "Aufschlag oder Abzug",
    errorYCero: "Y darf nicht 0 sein. Von null lässt sich kein Prozentsatz berechnen.",
    fraseParte: (x, y, r) => `${x} % von ${y} sind ${r}.`,
    fraseProporcion: (x, y, p) => `${x} sind ${p} % von ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % ergibt ${r}. Aufgeschlagen werden ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % ergibt ${r}. Abgezogen werden ${d}.`,
  }),
};

export const textosDe = textosConSuiza(textos);
