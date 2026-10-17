import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosEn: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "Type of proportion",
    directa: "Direct (when A goes up, B goes up)",
    inversa: "Inverse (when A goes up, B goes down)",
    a: "A",
    aAyuda: "Read it as: A is to B as C is to X. Enter A, B and C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "This value can't be 0: the sum divides by it.",
    fraseDirecta: (a, b, c, x) => `If ${a} is to ${b}, then ${c} is to ${x}. Sum: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `If ${a} gives ${b}, then ${c} gives ${x}. Sum: ${a} × ${b} ÷ ${c}.`,
  }),
};
