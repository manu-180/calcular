import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosKo: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (u) => `몸무게(${u})`,
    altura: (u) => `키(${u})`,
    pies: "키: 피트(ft)",
    pulgadas: "키: 인치(in)",
    imc: "체질량지수(BMI)",
    categoria: "판정(WHO 기준)",
    pesoMin: (u) => `정상 체중 하한(${u})`,
    pesoMax: (u) => `정상 체중 상한(${u})`,
    rangoAyuda: "이 키에서 BMI가 정상 범위에 드는 몸무게예요.",
    bajo: "저체중",
    normal: "정상 체중",
    sobrepeso: "과체중",
    obesidad1: "1단계 비만",
    obesidad2: "2단계 비만",
    obesidad3: "3단계 비만",
    errorPeso: "몸무게는 0보다 커야 해요.",
    errorAltura: "키는 0보다 커야 해요.",
    aviso: "BMI는 성인을 위한 대략적인 기준이에요. 근육과 지방을 구분하지 못하고, 임신 중이거나 어린이에게는 똑같이 적용되지 않아요. 의사 등 전문가와의 상담을 대신하지 않아요.",
  }),
};
