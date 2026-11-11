import { duracionKm } from "../../dias-entre-fechas/textos/km";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosKm: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "ថ្ងៃខែឆ្នាំកំណើត",
    referencia: "គណនាអាយុនៅថ្ងៃ",
    referenciaAyuda: "តម្លៃដើមគឺថ្ងៃនេះ។ ប្តូរទៅថ្ងៃផ្សេង ដើម្បីមើលអាយុនៅថ្ងៃនោះ។",
    edad: "អាយុ",
    anios: "អាយុ (ឆ្នាំ)",
    totalMeses: "គិតជាខែ",
    totalSemanas: "គិតជាសប្តាហ៍",
    totalDias: "គិតជាថ្ងៃ",
    proximo: "ថ្ងៃកំណើតបន្ទាប់",
    faltan: "នៅសល់ប៉ុន្មានថ្ងៃ",
    cumplira: "អាយុដែលនឹងគ្រប់",
    duracion: duracionKm,
    errorFutura: "ថ្ងៃកំណើតមិនអាចនៅក្រោយកាលបរិច្ឆេទដែលប្រើគណនាបានទេ។",
    cumpleHoy: (anios) => `ថ្ងៃនេះជាថ្ងៃកំណើត អាយុគ្រប់ ${anios} ឆ្នាំ។`,
    nota29: "អ្នកដែលកើតថ្ងៃទី 29 ខែកុម្ភៈ នៅឆ្នាំដែលមិនមែនជាឆ្នាំសកល ត្រូវបានរាប់ថ្ងៃកំណើតនៅថ្ងៃទី 28 ខែកុម្ភៈ។",
  }),
};
