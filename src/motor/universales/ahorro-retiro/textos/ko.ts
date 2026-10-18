import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosKo: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "현재 나이",
    edadRetiro: "은퇴하고 싶은 나이",
    actual: "이미 모은 금액",
    aporte: "월 적립액",
    rendimiento: "실질 연 수익률(%)",
    rendimientoAyuda: "물가상승률을 뺀 투자 수익률이에요. 장기적으로 2~5%가 보수적인 가정이에요.",
    aniosRenta: "노후 자금을 쓸 기간(년)",
    aniosRentaAyuda: "이 저축을 몇 년에 걸쳐 쓸지예요.",
    capital: "은퇴 시점 자금",
    renta: "그 자금으로 매달 쓸 수 있는 금액",
    aportado: "넣은 돈 합계",
    intereses: "불어난 금액",
    tabla: "나이별 자금",
    colEdad: "나이",
    colAportado: "그때까지 넣은 돈",
    colSaldo: "자금",
    errorEdades: "은퇴 나이는 현재 나이보다 많아야 해요.",
    errorSinAhorro: "지금 모은 돈이나 월 적립액을 넣으세요.",
    observacionDineroDeHoy: "수익률에서 물가 상승분을 뺐기 때문에 금액은 현재 가치로 나타냈어요.",
    observacionPublica: "직접 모으는 돈만 계산해요. 국민연금 같은 공적 연금은 들어 있지 않아요.",
  }),
};
