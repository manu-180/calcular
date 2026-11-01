import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosBg: TextosUi<UiInteresSimple> = {
  slug: "prosta-lihva",
  ui: () => ({
    capital: "Главница",
    tasa: "Годишен лихвен процент (%)",
    tiempo: "Срок",
    unidad: "Срокът е в",
    dias: "Дни",
    meses: "Месеци",
    anios: "Години",
    base: "Дни в годината (за срокове в дни)",
    baseAyuda: "Някои банки смятат годината за 360 дни. Ако не сте сигурни, оставете 365.",
    base365: "365 дни",
    base360: "360 дни (банкова година)",
    interes: "Лихва",
    montoFinal: "Главница плюс лихва",
    tasaPeriodo: "Лихвен процент за периода",
    errorCapital: "Въведете главница, по-голяма от нула.",
  }),
};
