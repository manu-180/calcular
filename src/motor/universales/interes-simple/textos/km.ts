import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosKm: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "ប្រាក់ដើម",
    tasa: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",
    tiempo: "រយៈពេល",
    unidad: "ឯកតានៃរយៈពេល",
    dias: "ថ្ងៃ",
    meses: "ខែ",
    anios: "ឆ្នាំ",
    base: "ចំនួនថ្ងៃក្នុងមួយឆ្នាំ (សម្រាប់រយៈពេលគិតជាថ្ងៃ)",
    baseAyuda: "ធនាគារខ្លះគិតមួយឆ្នាំស្មើនឹង 360 ថ្ងៃ។ បើមិនប្រាកដ សូមប្រើ 365។",
    base365: "365 ថ្ងៃ",
    base360: "360 ថ្ងៃ (ឆ្នាំធនាគារ)",
    interes: "ការប្រាក់",
    montoFinal: "ប្រាក់ដើមរួមទាំងការប្រាក់",
    tasaPeriodo: "អត្រាការប្រាក់ពេញមួយរយៈពេល",
    errorCapital: "សូមបញ្ចូលប្រាក់ដើមធំជាងសូន្យ។",
  }),
};
