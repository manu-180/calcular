import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosRu: TextosUi<UiPropina> = {
  slug: "chaevye",
  ui: () => ({
    cuenta: "Сумма счета",
    porcentaje: "Чаевые (%)",
    porcentajeAyuda: "Обычаи зависят от страны и от заведения. Выберите процент, который считаете уместным.",
    personas: "Сколько человек платят",
    redondear: "Округлить долю каждого вверх",
    redondearAyuda: "Чтобы каждый заплатил круглую сумму. Разница уйдет в чаевые.",
    propina: "Чаевые",
    total: "Итого с чаевыми",
    porPersona: "С каждого",
    propinaEfectiva: "Чаевые после округления",
    errorPersonas: "Платить должен хотя бы один человек.",
    observacionRedondeo: (efectiva) => `После округления чаевые составляют ${efectiva}% от счета.`,
  }),
};
