import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosJa: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `点数${n}`,
    notaAyuda: "点数や値を、その重みとあわせて入れてください。使わない行は空のままで大丈夫です。",
    peso: (n) => `重み${n}`,
    pesoAyuda: "パーセント、単位数、回数のどれでもかまいません。重みを入れなければ、すべて同じ重さで計算します。",
    ponderado: "加重平均",
    simple: "単純平均",
    cantidad: "値の数",
    sumaPesos: "重みの合計",
    errorSinNotas: "値を1つ以上入れてください。",
    errorFaltaPeso: "この値には重みがありません。重みを使う場合は、すべての値に入れてください。",
    errorFaltaNota: "この重みには値がありません。値を入れるか、重みを消してください。",
    errorPesosCero: "重みの合計が0です。少なくとも1つは0より大きくしてください。",
    sinPesos: "重みがない場合、加重平均は単純平均と同じです。",
  }),
};
