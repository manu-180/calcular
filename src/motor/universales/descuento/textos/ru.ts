import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosRu: TextosUi<UiDescuento> = {
  slug: "kalkulyator-skidki",
  ui: () => ({
    precio: "Цена без скидки",
    descuento: "Скидка (%)",
    segundoDescuento: "Дополнительная скидка (%)",
    segundoDescuentoAyuda: "Если сверху действует еще одна скидка, укажите ее здесь.",
    ahorro: "Экономия",
    final: "Цена со скидкой",
    descuentoTotal: "Итоговая скидка",
    errorMayorA100: "Скидка не может быть больше 100%.",
    observacionDoble: (efectivo) => `Две скидки подряд не складываются: вместе они дают ${efectivo}%.`,
  }),
};
