import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosSl: TextosUi<UiReglaDeTres> = {
  slug: "sklepni-racun",
  ui: () => ({
    tipo: "Vrsta sorazmerja",
    directa: "Premo sorazmerje (ko A raste, raste tudi B)",
    inversa: "Obratno sorazmerje (ko A raste, B pada)",
    a: "A",
    aAyuda: "Beremo takole: A je proti B kot C proti X. Vnesite A, B in C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ta vrednost ne sme biti 0, ker račun deli z njo.",
    fraseDirecta: (a, b, c, x) => `Če številu ${a} ustreza ${b}, potem številu ${c} ustreza ${x}. Račun: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Če pri ${a} dobite ${b}, potem pri ${c} dobite ${x}. Račun: ${a} × ${b} ÷ ${c}.`,
  }),
};
