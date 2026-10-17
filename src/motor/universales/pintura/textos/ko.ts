import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "리터" : "갤런");

export const textosKo: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "알고 있는 치수",
    modoMedidas: "벽 길이와 높이",
    modoSuperficie: "칠할 전체 면적",
    largo: (u) => `벽 길이 합계(${u})`,
    largoAyuda: "칠할 벽의 길이를 모두 더한 값이에요. 방 전체라면 둘레예요.",
    alto: (u) => `벽 높이(${u})`,
    superficie: (u) => `칠할 면적(${u})`,
    aberturas: (u) => `빼야 할 문과 창문 면적(${u})`,
    aberturasAyuda: "문 하나는 약 2m², 일반 창문은 1~2m² 정도예요.",
    manos: "칠하는 횟수",
    rendimiento: (u) => `페인트 도포 면적(${u})`,
    rendimientoAyuda: "통에 적힌 1회 도포 면적이에요. 모르면 기본값을 그대로 두세요.",
    recomendado: (u) => `살 페인트(${volumen(u)})`,
    recomendadoAyuda: "덧칠과 롤러에 남는 양을 생각해 10% 넉넉하게 잡았어요.",
    necesario: (u) => `정확한 필요량(${volumen(u)})`,
    neta: (u) => `칠할 면적(${u})`,
    errorMedidas: "벽 길이와 높이를 넣으세요.",
    errorSuperficie: "칠할 면적을 넣으세요.",
    errorAberturas: "문과 창문이 벽 전체를 차지할 수는 없어요.",
    errorRendimiento: "도포 면적은 0보다 커야 해요.",
  }),
};
