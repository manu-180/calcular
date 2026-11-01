import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosTh: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "ราคาเต็ม",
    descuento: "ส่วนลด (%)",
    segundoDescuento: "ส่วนลดเพิ่มเติม (%)",
    segundoDescuentoAyuda: "หากมีส่วนลดซ้อนอีกชั้น กรอกไว้ที่นี่",
    ahorro: "ประหยัดได้",
    final: "ราคาหลังหักส่วนลด",
    descuentoTotal: "ส่วนลดรวม",
    errorMayorA100: "ส่วนลดต้องไม่เกิน 100%",
    observacionDoble: (efectivo) => `ส่วนลดสองต่อไม่ได้นำมาบวกกันตรง ๆ เมื่อรวมกันแล้วลดไป ${efectivo}%`,
  }),
};
