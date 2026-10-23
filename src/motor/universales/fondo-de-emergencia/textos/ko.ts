import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosKo: TextosUi<UiFondoDeEmergencia> = {
  slug: "emergency-fund",
  ui: () => ({
    gastos: "월 필수 생활비",
    gastosAyuda: "멈출 수 없는 지출이에요. 주거비, 식비, 공과금, 교통비, 의료비, 대출 상환액 등.",
    meses: "대비할 개월 수",
    mesesAyuda: "소득이 안정적이라면 3~6개월, 소득이 들쭉날쭉하거나 외벌이라면 그보다 길게 잡으세요.",
    actual: "이미 모아 둔 금액(선택)",
    aporte: "매달 모을 수 있는 금액(선택)",
    meta: "권장 비상금",
    falta: "더 모아야 할 금액",
    mesesParaLlegar: "다 모으는 데 걸리는 개월 수",
    cobertura: "지금 모은 돈으로 버틸 수 있는 개월 수",
    errorGastos: "한 달 필수 생활비를 넣으세요.",
    yaCubierto: "비상금이 다 모였어요. 앞으로 모으는 돈은 다른 목표에 쓰면 돼요.",
    sinAporte: "매달 모을 수 있는 금액을 넣으면 얼마나 걸리는지 알려 드려요.",
    observacionDonde: "당일에 찾을 수 있고 원금이 줄지 않는 별도 계좌(예: 파킹통장, 수시입출금 통장)에 넣어 두세요.",
  }),
};
