import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosRu: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulyator-marzhi",
  ui: () => ({
    modo: "Что нужно рассчитать?",
    modoPrecio: "Маржу по себестоимости и цене",
    modoMargen: "Цену для нужной маржи",
    modoMarkup: "Цену для нужной наценки",
    costo: "Себестоимость единицы",
    costoAyuda: "Сколько стоит купить или произвести одну единицу товара, без НДС, который платит покупатель.",
    precio: "Цена продажи",
    precioAyuda: "Только если вы считаете маржу. Без НДС.",
    objetivo: "Нужная маржа или наценка (%)",
    objetivoAyuda: "Только если вы считаете цену.",
    precioResultado: "Цена продажи",
    margen: "Маржа",
    margenAyuda: "Прибыль в процентах от цены продажи.",
    markup: "Наценка",
    markupAyuda: "Прибыль в процентах от себестоимости.",
    ganancia: "Прибыль с единицы",
    errorCosto: "Введите себестоимость одной единицы.",
    errorFaltaPrecio: "Введите цену продажи, чтобы рассчитать маржу.",
    errorFaltaObjetivo: "Введите маржу или наценку, которую вы хотите получить.",
    errorMargen100: "Маржа должна быть меньше 100%. Иначе вся цена была бы прибылью без всякой себестоимости.",
    observacionPerdida: "По такой цене вы продаете ниже себестоимости и теряете деньги на каждой продаже.",
  }),
};
