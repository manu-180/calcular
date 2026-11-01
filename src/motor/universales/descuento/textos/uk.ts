import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosUk: TextosUi<UiDescuento> = {
  slug: "kalkuliator-znyzhky",
  ui: () => ({
    precio: "Початкова ціна",
    descuento: "Знижка (%)",
    segundoDescuento: "Додаткова знижка (%)",
    segundoDescuentoAyuda: "Якщо зверху діє ще одна знижка, введіть її тут.",
    ahorro: "Ваша економія",
    final: "Ціна зі знижкою",
    descuentoTotal: "Загальна знижка",
    errorMayorA100: "Знижка не може перевищувати 100%.",
    observacionDoble: (efectivo) => `Дві знижки поспіль не додаються: разом вони зменшують ціну на ${efectivo}%.`,
  }),
};
