import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosKo: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `${n}번째 사람`,
    personaAyuda: "각자 낸 금액을 넣으세요. 낸 돈은 없지만 비용을 나눠 낼 사람은 0을 넣으세요. 나머지 칸은 비워 두면 돼요.",
    total: "총비용",
    personas: "인원",
    cuota: "1인당 부담액",
    transferencias: "정산에 필요한 송금",
    tabla: "누가 누구에게 보낼까요",
    colDe: "보내는 사람",
    colPara: "받는 사람",
    colMonto: "금액",
    errorPocas: "비용을 나누려면 최소 두 명이 필요해요.",
    aMano: "정산할 게 없어요. 모두 같은 금액을 냈어요.",
  }),
};
