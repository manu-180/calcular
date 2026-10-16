import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosKo: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "초기 금액",
    aporte: "월 적립액(선택)",
    aporteAyuda: "매달 더 넣을 금액이에요. 매달 말에 더해져요.",
    tasa: "연 이자율(%)",
    anios: "기간(년)",
    capitalizacion: "복리 주기",
    anual: "매년",
    semestral: "반년마다",
    trimestral: "분기마다",
    mensual: "매달",
    diaria: "매일",
    saldo: "최종 금액",
    aportado: "넣은 돈 합계",
    intereses: "이자 수익",
    tabla: "연도별 불어나는 모습",
    colAnio: "연차",
    colAportado: "넣은 돈",
    colIntereses: "이자",
    colSaldo: "연말 잔액",
    errorSinDinero: "초기 금액이나 월 적립액을 넣으세요.",
    observacionIntereses: (porcentaje) => `최종 금액의 ${porcentaje}%가 이자예요.`,
  }),
};
