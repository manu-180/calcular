import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosKo: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "원금",
    tasa: "연 이자율(%)",
    tiempo: "기간",
    unidad: "기간 단위",
    dias: "일",
    meses: "개월",
    anios: "년",
    base: "1년 일수(일 단위로 계산할 때)",
    baseAyuda: "1년을 360일로 계산하는 금융회사도 있어요. 잘 모르겠다면 365를 그대로 두세요.",
    base365: "365일",
    base360: "360일",
    interes: "이자",
    montoFinal: "원금과 이자 합계",
    tasaPeriodo: "기간 이자율",
    errorCapital: "0보다 큰 원금을 넣으세요.",
  }),
};
