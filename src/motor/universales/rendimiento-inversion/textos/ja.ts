import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosJa: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "投資した金額",
    final: "最終的な評価額",
    finalAyuda: "今の評価額、または売却して受け取った金額です。",
    cobrado: "途中で受け取った収益（任意）",
    cobradoAyuda: "再投資せずに受け取った配当、利息、家賃収入などです。",
    anios: "保有した年数",
    aniosAyuda: "1年半のように、小数で入れても大丈夫です。",
    ganancia: "利益",
    roi: "投資利益率（ROI）",
    cagr: "年平均利回り（CAGR）",
    cagrAyuda: "毎年複利でくり返したときに同じ結果になる、1年あたりの利回りです。",
    errorInicial: "最初に投資した金額を入れてください。",
    observacionCorto: "1年未満の場合、年平均利回りは短期間の結果を1年続いたものとして引き伸ばしています。慎重に見てください。",
    observacionInflacion: "購買力が増えたかどうかを知るには、年平均利回りを同じ期間のインフレ率と比べてください。",
  }),
};
