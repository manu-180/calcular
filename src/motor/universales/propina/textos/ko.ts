import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosKo: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "계산서 금액",
    porcentaje: "팁(%)",
    porcentajeAyuda: "팁 문화는 나라와 가게마다 달라요. 적당하다고 생각하는 비율을 고르세요.",
    personas: "나눠 낼 사람 수",
    redondear: "1인당 금액 올림",
    redondearAyuda: "모두 딱 떨어지는 금액을 내도록 올려요. 올린 만큼은 팁에 더해져요.",
    propina: "팁",
    total: "팁 포함 합계",
    porPersona: "1인당 금액",
    propinaEfectiva: "올림 후 팁",
    errorPersonas: "내는 사람이 최소 한 명은 있어야 해요.",
    observacionRedondeo: (efectiva) => `올림을 하면 팁은 계산서 금액의 ${efectiva}%가 돼요.`,
  }),
};
