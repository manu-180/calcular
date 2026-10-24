import { duracionKo } from "../../dias-entre-fechas/textos/ko";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosKo: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "생년월일",
    referencia: "기준일",
    referenciaAyuda: "기본은 오늘이에요. 다른 날짜로 바꾸면 그날의 나이를 볼 수 있어요.",
    edad: "나이",
    anios: "만 나이",
    totalMeses: "개월로",
    totalSemanas: "주로",
    totalDias: "일로",
    proximo: "다음 생일",
    faltan: "생일까지 남은 날",
    cumplira: "다음 생일에",
    duracion: duracionKo,
    errorFutura: "생년월일은 기준일보다 뒤일 수 없어요.",
    cumpleHoy: (anios) => `오늘이 생일이에요. 만 ${anios}세가 됐어요.`,
    nota29: "2월 29일생은 윤년이 아닌 해에는 2월 28일을 생일로 계산해요.",
  }),
};
