import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosJa: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "元の価格",
    descuento: "割引率（%）",
    segundoDescuento: "追加の割引率（%）",
    segundoDescuentoAyuda: "さらに割引が重なる場合は、ここに入力してください。",
    ahorro: "割引額",
    final: "割引後の価格",
    descuentoTotal: "合計の割引率",
    errorMayorA100: "割引率は100%を超えられません。",
    observacionDoble: (efectivo) => `2回続けて割り引いても、割引率は単純に足し算になりません。合計の割引率は${efectivo}%です。`,
  }),
};
