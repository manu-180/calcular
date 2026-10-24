import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosKo: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "모으고 싶은 금액",
    actual: "이미 모은 금액(선택)",
    meses: "목표까지 남은 개월 수",
    rendimiento: "저축의 연 수익률(%, 선택)",
    rendimientoAyuda: "이자가 붙는 계좌나 투자에 넣어 둔다면 넣으세요. 이자가 없다면 비워 두면 돼요.",
    aporteMensual: "매달 모아야 할 금액",
    aporteSemanal: "주 단위로는",
    totalAportado: "직접 넣는 금액 합계",
    intereses: "이자 수익",
    errorMeta: "모으고 싶은 금액을 넣으세요.",
    yaLlegas: "지금 모은 돈만으로도 그 기간 안에 목표에 닿아요. 더 넣지 않아도 돼요.",
  }),
};
