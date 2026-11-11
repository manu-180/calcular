import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosMk: TextosUi<UiDescuento> = {
  slug: "kalkulator-za-popust",
  ui: () => ({
    precio: "Првична цена",
    descuento: "Попуст (%)",
    segundoDescuento: "Дополнителен попуст (%)",
    segundoDescuentoAyuda: "Ако на намалената цена има уште еден попуст, внесете го овде.",
    ahorro: "Заштедувате",
    final: "Конечна цена",
    descuentoTotal: "Вкупен попуст",
    errorMayorA100: "Попустот не може да биде поголем од 100 %.",
    observacionDoble: (efectivo) => `Два последователни попуста не се собираат: заедно ја намалуваат цената за ${efectivo} %.`,
  }),
};
