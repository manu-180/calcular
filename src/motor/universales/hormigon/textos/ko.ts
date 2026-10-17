import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosKo: TextosUi<UiHormigon> = {
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `길이(${u})`,
    ancho: (u) => `너비(${u})`,
    espesor: (u) => `두께(${u})`,
    espesorAyuda: "마당이나 통로 바닥은 보통 10cm, 주차장은 12~15cm 정도예요.",
    margen: "여유분(%)",
    margenAyuda: "바닥 요철과 흘리는 양을 생각한 여유분이에요. 보통 5~10%예요.",
    bolsa: (u) => `시멘트 한 포 무게(${u})`,
    volumen: (u) => `정확한 부피(${u})`,
    volumenTotal: (u) => `필요한 콘크리트(${u})`,
    volumenPies: "필요한 콘크리트(세제곱피트)",
    cemento: (u) => `시멘트(${u})`,
    bolsas: "시멘트 포대 수",
    arena: (u) => `모래(${u})`,
    piedra: (u) => `자갈(${u})`,
    agua: (u) => (u === "L" ? "물(리터)" : "물(갤런)"),
    errorMedida: "이 치수는 0보다 커야 해요.",
    aviso: "재료량은 일반적인 1:2:3 배합(1m³당 시멘트 약 350kg)을 기준으로 한 참고값이에요. 배합, 공사 내용, 지역 자재에 따라 달라지니 시공하는 분과 꼭 확인하세요.",
  }),
};
