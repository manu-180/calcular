import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosJa: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "貯めたい金額",
    actual: "すでに貯めている金額（任意）",
    meses: "達成までの月数",
    rendimiento: "貯金の年利回り（%、任意）",
    rendimientoAyuda: "利息のつく口座や運用に置く場合に入れてください。利息がつかなければ空欄のままで大丈夫です。",
    aporteMensual: "毎月貯める金額",
    aporteSemanal: "1週間あたりにすると",
    totalAportado: "自分で入れる金額の合計",
    intereses: "得られる利息",
    errorMeta: "貯めたい金額を入れてください。",
    yaLlegas: "今ある貯金だけで、その期間内に目標に届きます。追加の積立は必要ありません。",
  }),
};
