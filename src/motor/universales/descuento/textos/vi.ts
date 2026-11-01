import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosVi: TextosUi<UiDescuento> = {
  slug: "tinh-giam-gia",
  ui: () => ({
    precio: "Giá ban đầu",
    descuento: "Giảm giá (%)",
    segundoDescuento: "Giảm thêm (%)",
    segundoDescuentoAyuda: "Nếu còn một mức giảm nữa sau mức giảm đầu tiên, nhập vào đây.",
    ahorro: "Bạn tiết kiệm được",
    final: "Giá sau giảm",
    descuentoTotal: "Tổng mức giảm",
    errorMayorA100: "Mức giảm không được lớn hơn 100%.",
    observacionDoble: (efectivo) => `Hai mức giảm liên tiếp không được cộng thẳng vào nhau: tổng cộng giá giảm ${efectivo}%.`,
  }),
};
