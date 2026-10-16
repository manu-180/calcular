import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosKo: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `이동 거리(${u})`,
    idaYVuelta: "왕복",
    tipoConsumo: "연비 표시 방식",
    l100: "100km당 리터",
    kml: "리터당 km(km/L)",
    consumo: "연비",
    consumoMpg: "연비(마일/갤런)",
    consumoAyuda: "차량 설명서나 트립 컴퓨터에서 확인할 수 있어요. 보통 고속도로 연비가 시내 연비보다 좋아요.",
    precio: (u) => (u === "L" ? "리터당 가격" : "갤런당 가격"),
    personas: "비용을 나눌 인원",
    costo: "주유비",
    porPersona: "1인당",
    combustible: (u) => (u === "L" ? "필요한 연료(리터)" : "필요한 연료(갤런)"),
    distanciaTotal: (u) => `총 거리(${u})`,
    costoPorDistancia: (u) => `1${u}당 비용`,
    errorConsumo: "연비는 0보다 커야 해요.",
    errorPersonas: "인원은 최소 한 명이어야 해요.",
  }),
};
