import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosSq: TextosUi<UiInteresSimple> = {
  slug: "kalkulator-interes-i-thjeshte",
  ui: () => ({
    capital: "Shuma fillestare (kapitali)",
    tasa: "Norma vjetore e interesit (%)",
    tiempo: "Periudha",
    unidad: "Periudha është në",
    dias: "Ditë",
    meses: "Muaj",
    anios: "Vite",
    base: "Numri i ditëve në një vit (për periudha në ditë)",
    baseAyuda: "Disa banka e llogaritin vitin me 360 ditë. Nëse nuk jeni të sigurt, lini 365.",
    base365: "365 ditë",
    base360: "360 ditë (vit bankar)",
    interes: "Interesi",
    montoFinal: "Kapitali plus interesi",
    tasaPeriodo: "Norma për periudhën e zgjedhur",
    errorCapital: "Vendosni një shumë më të madhe se zero.",
  }),
};
