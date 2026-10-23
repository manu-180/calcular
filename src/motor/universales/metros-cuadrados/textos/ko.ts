import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosKo: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `구역 ${n}: 모양`,
    formaAyuda: "ㄱ자형이거나 모양이 불규칙한 방은 여러 구역으로 나눠서 더하세요.",
    ninguna: "사용 안 함",
    rectangulo: "직사각형 또는 정사각형",
    triangulo: "삼각형",
    circulo: "원",
    medidaA: (n, u) => `구역 ${n}: 길이, 밑변 또는 지름(${u})`,
    medidaAAyuda: "직사각형은 가로와 세로, 삼각형은 밑변과 높이, 원은 지름만 넣으세요.",
    medidaB: (n, u) => `구역 ${n}: 너비 또는 높이(${u})`,
    total: (u) => `전체 면적(${u})`,
    equivale: (u) => `${u}로 환산`,
    parcial: (n, u) => `구역 ${n}(${u})`,
    errorMedida: "이 치수가 비어 있거나 0이에요.",
  }),
};
