import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosKo: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "정가",
    descuento: "할인율(%)",
    segundoDescuento: "추가 할인율(%)",
    segundoDescuentoAyuda: "할인이 한 번 더 들어가면 여기에 넣으세요.",
    ahorro: "할인 금액",
    final: "할인가",
    descuentoTotal: "총 할인율",
    errorMayorA100: "할인율은 100%를 넘을 수 없어요.",
    observacionDoble: (efectivo) => `할인을 두 번 연달아 받아도 할인율을 그냥 더하면 안 돼요. 두 할인을 합치면 ${efectivo}% 할인이에요.`,
  }),
};
