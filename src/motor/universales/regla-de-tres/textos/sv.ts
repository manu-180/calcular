import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosSv: TextosUi<UiReglaDeTres> = {
  slug: "reguladetri",
  ui: () => ({
    tipo: "Typ av proportion",
    directa: "Direkt (när A ökar, ökar B)",
    inversa: "Omvänd (när A ökar, minskar B)",
    a: "A",
    aAyuda: "Läs det som: A förhåller sig till B som C till X. Fyll i A, B och C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Värdet kan inte vara 0, eftersom räkningen delar med det.",
    fraseDirecta: (a, b, c, x) => `Om ${a} motsvarar ${b}, motsvarar ${c} ${x}. Räkning: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Om ${a} ger ${b}, ger ${c} ${x}. Räkning: ${a} × ${b} ÷ ${c}.`,
  }),
};
