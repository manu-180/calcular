import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosJa: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "比例の種類",
    directa: "正比例（Aが増えるとBも増える）",
    inversa: "反比例（Aが増えるとBは減る）",
    a: "A",
    aAyuda: "「AとBの関係は、CとXの関係と同じ」と考えます。A、B、Cを入れてください。",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "この値に0は入れられません。計算でこの値で割るためです。",
    fraseDirecta: (a, b, c, x) => `${a}が${b}なら、${c}は${x}です。計算式：${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `${a}で${b}なら、${c}では${x}です。計算式：${a} × ${b} ÷ ${c}`,
  }),
};
