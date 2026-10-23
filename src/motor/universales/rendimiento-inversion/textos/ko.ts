import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosKo: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "투자 금액",
    final: "최종 평가액",
    finalAyuda: "지금의 평가액, 또는 팔아서 받은 금액이에요.",
    cobrado: "중간에 받은 수익(선택)",
    cobradoAyuda: "재투자하지 않고 받은 배당, 이자, 임대료 등이에요.",
    anios: "보유 기간(년)",
    aniosAyuda: "1년 반처럼 소수로 넣어도 돼요.",
    ganancia: "수익",
    roi: "투자수익률(ROI)",
    cagr: "연평균 수익률(CAGR)",
    cagrAyuda: "해마다 복리로 반복했을 때 같은 결과가 나오는 1년 수익률이에요.",
    errorInicial: "처음에 투자한 금액을 넣으세요.",
    observacionCorto: "1년이 안 되는 기간이라면 연평균 수익률은 짧은 기간의 결과를 1년 내내 이어진 것처럼 늘린 값이에요. 주의해서 보세요.",
    observacionInflacion: "구매력이 늘었는지 보려면 연평균 수익률을 같은 기간의 물가상승률과 비교하세요.",
  }),
};
