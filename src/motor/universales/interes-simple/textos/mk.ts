import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosMk: TextosUi<UiInteresSimple> = {
  slug: "kalkulator-za-prosta-kamata",
  ui: () => ({
    capital: "Главнина",
    tasa: "Годишна каматна стапка (%)",
    tiempo: "Рок",
    unidad: "Рокот е во",
    dias: "Денови",
    meses: "Месеци",
    anios: "Години",
    base: "Денови во годината (за рокови во денови)",
    baseAyuda: "Некои банки ја сметаат годината за 360 дена. Ако не сте сигурни, оставете 365.",
    base365: "365 дена",
    base360: "360 дена (банкарска година)",
    interes: "Камата",
    montoFinal: "Главнина плус камата",
    tasaPeriodo: "Каматна стапка за периодот",
    errorCapital: "Внесете главнина поголема од нула.",
  }),
};
