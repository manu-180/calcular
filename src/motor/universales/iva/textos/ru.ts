import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosRu: TextosUi<UiIva> = {
  slug: "kalkulyator-nds",
  ui: () => ({
    operacion: "Что нужно сделать?",
    agregar: "Начислить НДС на цену без налога",
    quitar: "Выделить НДС из цены, которая его уже включает",
    monto: "Цена",
    montoAyuda: "Без НДС, если вы начисляете налог; с НДС, если вы его выделяете.",
    otraTasa: "Другая ставка НДС (%)",
    otraTasaAyuda: "Необязательно. Если для товара или услуги действует пониженная ставка, введите ее здесь. Иначе применяется основная ставка.",
    neto: "Цена без НДС",
    impuesto: "Сумма НДС",
    total: "Цена с НДС",
    tasaUsada: "Примененная ставка",
    errorTasa: "Ставка НДС указана неверно.",
  }),
};
