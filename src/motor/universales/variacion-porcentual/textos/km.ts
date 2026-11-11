import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosKm: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "តម្លៃដំបូង",
    final: "តម្លៃចុងក្រោយ",
    variacion: "ភាគរយនៃការប្រែប្រួល",
    diferencia: "ផលសង",
    vuelta: "ដើម្បីត្រឡប់ទៅតម្លៃដំបូង",
    vueltaAyuda: "តម្លៃចុងក្រោយត្រូវប្រែប្រួលប៉ុន្មានភាគរយ ទើបត្រឡប់ទៅស្មើតម្លៃដំបូង។",
    errorInicialCero: "តម្លៃដំបូងមិនអាចស្មើ 0 ទេ ព្រោះមិនអាចគិតភាគរយនៃការប្រែប្រួលពីសូន្យបាន។",
    subio: (p) => `កើនឡើង ${p}%`,
    bajo: (p) => `ថយចុះ ${p}%`,
    igual: "មិនប្រែប្រួល តម្លៃទាំងពីរស្មើគ្នា",
  }),
};
