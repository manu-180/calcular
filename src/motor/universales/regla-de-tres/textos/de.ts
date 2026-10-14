import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosDe: TextosUi<UiReglaDeTres> = {
  slug: "dreisatz",
  ui: () => ({
    tipo: "Art des Dreisatzes",
    directa: "Proportional (je mehr A, desto mehr B)",
    inversa: "Antiproportional (je mehr A, desto weniger B)",
    a: "A",
    aAyuda: "Lesen Sie es so: A verhält sich zu B wie C zu X. Tragen Sie A, B und C ein.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Dieser Wert darf nicht 0 sein, weil durch ihn geteilt wird.",
    fraseDirecta: (a, b, c, x) => `Wenn ${a} zu ${b} gehört, gehört ${c} zu ${x}. Rechnung: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Wenn ${a} zu ${b} führt, führt ${c} zu ${x}. Rechnung: ${a} × ${b} ÷ ${c}.`,
  }),
};
