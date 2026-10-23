import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosKo: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "마지막 생리 시작일",
    fumAyuda: "출혈이 시작된 날이에요. 끝난 날이 아니에요.",
    ciclo: "생리 주기(일)",
    cicloAyuda: "생리 첫날부터 다음 생리 전날까지예요. 매번 다르다면 평균을 넣으세요.",
    ovulacion: "예상 배란일",
    fertilDesde: "가임기 시작",
    fertilHasta: "가임기 끝",
    proxima: "다음 생리 예정일",
    tabla: "다음 주기",
    colRegla: "생리",
    colDesde: "가임기 시작",
    colHasta: "가임기 끝",
    colOvulacion: "배란일",
    errorCiclo: "생리 주기는 21일에서 45일 사이로 넣어 주세요.",
    aviso: "주기가 규칙적인 분을 위한 추정치예요. 피임 방법이 아니고, 의사 등 전문가와의 상담을 대신하지 않아요.",
  }),
};
