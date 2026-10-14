import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosEn: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "Original price",
    descuento: "Discount (%)",
    segundoDescuento: "Extra discount (%)",
    segundoDescuentoAyuda: "If there is a further discount on top, enter it here.",
    ahorro: "You save",
    final: "Final price",
    descuentoTotal: "Total discount",
    errorMayorA100: "A discount can't be more than 100%.",
    observacionDoble: (efectivo) => `Two discounts in a row don't add up: together they take ${efectivo}% off.`,
  }),
};
