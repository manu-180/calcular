import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosKo: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `점수 ${n}`,
    notaAyuda: "점수나 값을 가중치와 함께 넣으세요. 쓰지 않는 줄은 비워 두면 돼요.",
    peso: (n) => `가중치 ${n}`,
    pesoAyuda: "퍼센트, 학점, 반영 횟수 모두 괜찮아요. 가중치를 넣지 않으면 모든 값을 똑같이 계산해요.",
    ponderado: "가중 평균",
    simple: "단순 평균",
    cantidad: "값의 개수",
    sumaPesos: "가중치 합계",
    errorSinNotas: "값을 하나 이상 넣으세요.",
    errorFaltaPeso: "이 값에 가중치가 없어요. 가중치를 쓴다면 모든 값에 넣어 주세요.",
    errorFaltaNota: "이 가중치에 값이 없어요. 값을 넣거나 가중치를 지워 주세요.",
    errorPesosCero: "가중치 합계가 0이에요. 하나 이상은 0보다 커야 해요.",
    sinPesos: "가중치가 없으면 가중 평균은 단순 평균과 같아요.",
  }),
};
