import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosJa: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "計算したい内容",
    modoParte: "YのX%はいくつ？",
    modoProporcion: "XはYの何%？",
    modoAumento: "YにX%を足す",
    modoRebaja: "YからX%を引く",
    x: "数値X",
    xAyuda: "パーセントの値です。「XはYの何%？」を選んだ場合は、部分にあたる数値を入れてください。",
    y: "数値Y",
    resultado: "答え",
    porcentaje: "割合",
    diferencia: "増えた分、減った分",
    errorYCero: "Yに0は入れられません。0に対する割合は計算できないためです。",
    fraseParte: (x, y, r) => `${y}の${x}%は${r}です。`,
    fraseProporcion: (x, y, p) => `${x}は${y}の${p}%です。`,
    fraseAumento: (x, y, r, d) => `${y}に${x}%を足すと${r}です（${d}増えます）。`,
    fraseRebaja: (x, y, r, d) => `${y}から${x}%を引くと${r}です（${d}減ります）。`,
  }),
};
