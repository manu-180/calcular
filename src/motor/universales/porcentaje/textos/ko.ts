import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosKo: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "무엇을 계산할까요?",
    modoParte: "Y의 X%는 얼마?",
    modoProporcion: "X는 Y의 몇 %?",
    modoAumento: "Y에 X% 더하기",
    modoRebaja: "Y에서 X% 빼기",
    x: "숫자 X",
    xAyuda: "퍼센트 값이에요. “X는 Y의 몇 %?”를 고르면 부분에 해당하는 숫자를 넣으세요.",
    y: "숫자 Y",
    resultado: "결과",
    porcentaje: "비율",
    diferencia: "늘어나거나 줄어든 양",
    errorYCero: "Y에는 0을 넣을 수 없어요. 0에 대한 비율은 구할 수 없기 때문이에요.",
    fraseParte: (x, y, r) => `${y}의 ${x}%: ${r}`,
    fraseProporcion: (x, y, p) => `${y} 중 ${x}의 비율은 ${p}%예요.`,
    fraseAumento: (x, y, r, d) => `${y}에 ${x}%를 더한 값: ${r} (${d} 증가)`,
    fraseRebaja: (x, y, r, d) => `${y}에서 ${x}%를 뺀 값: ${r} (${d} 감소)`,
  }),
};
