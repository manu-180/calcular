import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosBg: TextosUi<UiReglaDeTres> = {
  slug: "troyno-pravilo",
  ui: () => ({
    tipo: "Вид пропорция",
    directa: "Права (когато A расте, B също расте)",
    inversa: "Обратна (когато A расте, B намалява)",
    a: "A",
    aAyuda: "Чете се така: A се отнася към B, както C към X. Въведете A, B и C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Тази стойност не може да е 0, защото сметката се дели на нея.",
    fraseDirecta: (a, b, c, x) => `Ако на ${a} отговаря ${b}, то на ${c} отговаря ${x}. Сметка: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ако ${a} дава ${b}, то ${c} дава ${x}. Сметка: ${a} × ${b} ÷ ${c}.`,
  }),
};
