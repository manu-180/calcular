import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosKo: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "무엇을 계산할까요?",
    calcRitmo: "페이스(거리와 기록으로)",
    calcTiempo: "기록(거리와 페이스로)",
    calcDistancia: "거리(기록과 페이스로)",
    distancia: "거리",
    distanciaAyuda: "대회 종목을 고르거나, “기타”를 골라 거리를 직접 넣으세요.",
    otra: "기타 거리",
    cincoK: "5km",
    diezK: "10km",
    media: "하프 마라톤",
    maraton: "풀코스 마라톤",
    distanciaOtra: (u) => `기타 거리(${u})`,
    horas: "기록: 시간",
    minutos: "기록: 분",
    segundos: "기록: 초",
    ritmoMin: (u) => `페이스: 1${u}당 분`,
    ritmoSeg: "페이스: 초",
    ritmo: (u) => `페이스(분/${u})`,
    tiempo: "완주 기록",
    distanciaRes: (u) => `거리(${u})`,
    velocidad: (u) => `평균 속도(${u})`,
    errorDistancia: "0보다 큰 거리를 넣으세요.",
    errorTiempo: "기록을 시간, 분, 초 중 하나 이상으로 넣으세요.",
    errorRitmo: "페이스를 거리 1단위당 분과 초로 넣으세요.",
  }),
};
