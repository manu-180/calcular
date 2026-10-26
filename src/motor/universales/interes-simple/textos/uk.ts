import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosUk: TextosUi<UiInteresSimple> = {
  slug: "prosti-vidsotky",
  ui: () => ({
    capital: "Сума",
    tasa: "Річна відсоткова ставка (%)",
    tiempo: "Строк",
    unidad: "Одиниця строку",
    dias: "Дні",
    meses: "Місяці",
    anios: "Роки",
    base: "Днів у році (для строку в днях)",
    baseAyuda: "Деякі банки вважають рік рівним 360 дням. Якщо не впевнені, залиште 365.",
    base365: "365 днів",
    base360: "360 днів (банківський рік)",
    interes: "Відсотки",
    montoFinal: "Сума разом із відсотками",
    tasaPeriodo: "Ставка за період",
    errorCapital: "Введіть суму, більшу за нуль.",
  }),
};
