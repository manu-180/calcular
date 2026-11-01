import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosBg: TextosUi<UiDescuento> = {
  slug: "kalkulator-za-otstapka",
  ui: () => ({
    precio: "Първоначална цена",
    descuento: "Отстъпка (%)",
    segundoDescuento: "Допълнителна отстъпка (%)",
    segundoDescuentoAyuda: "Ако върху намалението има още една отстъпка, въведете я тук.",
    ahorro: "Спестявате",
    final: "Крайна цена",
    descuentoTotal: "Обща отстъпка",
    errorMayorA100: "Отстъпката не може да е повече от 100%.",
    observacionDoble: (efectivo) => `Две поредни отстъпки не се събират: заедно те намаляват цената с ${efectivo}%.`,
  }),
};
