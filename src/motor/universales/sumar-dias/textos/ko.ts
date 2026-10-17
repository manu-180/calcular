import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosKo: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "기준일",
    operacion: "계산",
    sumar: "며칠 후",
    restar: "며칠 전",
    dias: "일수",
    tipo: "날짜 세는 방법",
    corridos: "달력 기준",
    habiles: "평일 기준(월요일~금요일)",
    resultado: "계산된 날짜",
    diaSemana: "요일",
    diasCorridos: "달력 기준 총 일수",
    nombresDias: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    errorDias: "일수는 100년 이내의 정수로 넣어 주세요.",
    notaHabiles: "평일 기준은 토요일과 일요일을 건너뛰지만 공휴일은 건너뛰지 않아요. 중간에 공휴일이 있다면 그만큼 더하세요.",
  }),
};
