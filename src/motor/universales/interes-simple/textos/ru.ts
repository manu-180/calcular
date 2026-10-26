import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosRu: TextosUi<UiInteresSimple> = {
  slug: "prostye-protsenty",
  ui: () => ({
    capital: "Сумма",
    tasa: "Годовая процентная ставка (%)",
    tiempo: "Срок",
    unidad: "Срок указан в",
    dias: "Днях",
    meses: "Месяцах",
    anios: "Годах",
    base: "Дней в году (для срока в днях)",
    baseAyuda: "Некоторые банки считают год равным 360 дням. Если не уверены, оставьте 365.",
    base365: "365 дней",
    base360: "360 дней (банковский год)",
    interes: "Проценты",
    montoFinal: "Сумма вместе с процентами",
    tasaPeriodo: "Ставка за срок",
    errorCapital: "Введите сумму больше нуля.",
  }),
};
