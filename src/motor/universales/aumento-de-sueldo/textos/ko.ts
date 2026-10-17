import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosKo: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "지금 월급",
    sueldoAyuda: "세전이든 실수령액이든 편한 쪽으로 넣으세요. 결과도 같은 기준으로 나와요.",
    aumentoPorcentaje: "인상률(%)",
    aumentoMonto: "인상 금액(선택)",
    aumentoMontoAyuda: "인상이 정해진 금액이라면 여기에 넣으세요. 비율 대신 이 금액으로 계산해요.",
    inflacion: "기간 중 물가상승률(%, 선택)",
    inflacionAyuda: "지난 인상 이후의 물가상승률이에요. 월급으로 살 수 있는 게 늘었는지 줄었는지 알 수 있어요.",
    sueldosAnio: "1년 급여 지급 횟수",
    sueldosAnioAyuda: "월급이라면 12예요. 상여금을 월 단위로 받는다면 그만큼 더하세요.",
    nuevo: "인상 후 월급",
    diferenciaMensual: "월 차이",
    diferenciaAnual: "연 차이",
    porcentaje: "인상률",
    real: "실질 인상률(물가 반영)",
    realAyuda: "새 월급으로 예전 월급보다 얼마나 더 살 수 있는지 나타내요.",
    errorSueldo: "지금 월급을 넣으세요.",
    errorSinAumento: "인상을 비율이나 금액으로 넣으세요.",
    observacionGana: (puntos) => `물가 상승보다 더 올랐어요. 월급으로 살 수 있는 게 ${puntos}% 늘었어요.`,
    observacionPierde: (puntos) => `인상이 물가 상승을 못 따라갔어요. 월급으로 살 수 있는 게 ${puntos}% 줄었어요.`,
    observacionIgual: "인상률이 물가상승률과 같아요. 월급으로 살 수 있는 건 예전과 똑같아요.",
  }),
};
