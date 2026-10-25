import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosUk: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkuliator-marzhi",
  ui: () => ({
    modo: "Що ви хочете розрахувати?",
    modoPrecio: "Маржу за собівартістю і ціною",
    modoMargen: "Ціну для бажаної маржі",
    modoMarkup: "Ціну для бажаної націнки",
    costo: "Собівартість одиниці",
    costoAyuda: "Скільки коштує купити або виготовити одну одиницю, без ПДВ чи іншого податку, який сплачує покупець.",
    precio: "Ціна продажу",
    precioAyuda: "Лише якщо ви розраховуєте маржу. Без податку з продажу.",
    objetivo: "Бажана маржа чи націнка (%)",
    objetivoAyuda: "Лише якщо ви розраховуєте ціну.",
    precioResultado: "Ціна продажу",
    margen: "Маржа",
    margenAyuda: "Прибуток у відсотках від ціни продажу.",
    markup: "Націнка",
    markupAyuda: "Прибуток у відсотках від собівартості.",
    ganancia: "Прибуток з одиниці",
    errorCosto: "Введіть собівартість однієї одиниці.",
    errorFaltaPrecio: "Введіть ціну продажу, щоб розрахувати маржу.",
    errorFaltaObjetivo: "Введіть маржу чи націнку, якої ви хочете досягти.",
    errorMargen100: "Маржа має бути меншою за 100%: інакше вся ціна була б прибутком без жодних витрат.",
    observacionPerdida: "За такої ціни ви продаєте нижче собівартості і втрачаєте гроші з кожного продажу.",
  }),
};
