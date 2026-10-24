import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosKo: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "알고 있는 이율",
    nominalAEfectiva: "명목 연이율(실효 연이율로 환산)",
    efectivaANominal: "실효 연이율(명목 연이율로 환산)",
    tasa: "연이율(%)",
    tasaAyuda: "상품 안내나 계약서에 적힌 그대로 넣으세요.",
    capitalizacion: "복리 주기",
    capitalizacionAyuda: "이자가 원금에 더해지는 주기예요. 대출과 신용카드는 보통 매달이에요.",
    mensual: "매달(1년에 12번)",
    trimestral: "분기마다(1년에 4번)",
    semestral: "반년마다(1년에 2번)",
    diaria: "매일(1년에 365번)",
    efectiva: "실효 연이율",
    nominal: "명목 연이율",
    periodica: "기간당 이율",
    errorNegativa: "이율은 음수일 수 없어요. 0 이상의 숫자를 넣으세요.",
    observacionDiferencia: (puntos) => `이자에도 이자가 붙어서 실효 연이율이 명목 연이율보다 ${puntos}%포인트 높아요.`,
  }),
};
