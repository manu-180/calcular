import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosKo: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "급여",
    periodo: "급여 기준",
    hora: "시간",
    dia: "일",
    semana: "주",
    quincena: "반달(연 24회)",
    mes: "월",
    anio: "연",
    horasSemana: "주당 근무 시간",
    diasSemana: "주당 근무 일수",
    semanasAnio: "1년 중 급여를 받는 주 수",
    semanasAnioAyuda: "유급휴가가 있다면 52예요. 일한 주만큼만 받는다면 나머지 주를 빼세요.",
    porHora: "시급",
    porDia: "일급",
    porSemana: "주급",
    porQuincena: "반달 급여",
    porMes: "월급",
    porAnio: "연봉",
    errorHoras: "주당 근무 시간을 넣으세요.",
    errorSemanas: "급여를 받는 주 수는 0보다 커야 해요.",
    observacionBruto: "같은 금액을 다른 기준으로 바꾼 거예요. 상여금은 더하지 않았고 세금도 빼지 않았어요.",
  }),
};
