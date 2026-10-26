import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosHe: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "סוג היחס",
    directa: "יחס ישר (כש-A עולה, גם B עולה)",
    inversa: "יחס הפוך (כש-A עולה, B יורד)",
    a: "A",
    aAyuda: "קוראים את זה כך: A ל-B כמו C ל-X. הזינו את A, B ו-C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "הערך הזה לא יכול להיות 0: החישוב מחלק בו.",
    fraseDirecta: (a, b, c, x) => `אם ${a} מתאים ל-${b}, אז ${c} מתאים ל-${x}. החישוב: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `אם ${a} נותן ${b}, אז ${c} נותן ${x}. החישוב: ${a} × ${b} ÷ ${c}.`,
  }),
};
