import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosKm: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "គោលដៅប្រាក់សន្សំ",
    actual: "ប្រាក់សន្សំដែលមានស្រាប់ (មិនចាំបាច់)",
    meses: "ចំនួនខែដែលចង់ឈានដល់គោលដៅ",
    rendimiento: "ទិន្នផលប្រាក់សន្សំប្រចាំឆ្នាំ (%, មិនចាំបាច់)",
    rendimientoAyuda: "សម្រាប់ប្រាក់ក្នុងគណនី ឬការវិនិយោគដែលផ្តល់ការប្រាក់។ បើគ្មានទិន្នផល សូមទុកទទេ។",
    aporteMensual: "ប្រាក់ត្រូវសន្សំប្រចាំខែ",
    aporteSemanal: "គិតជាប្រចាំសប្តាហ៍",
    totalAportado: "ប្រាក់សន្សំសរុប",
    intereses: "ការប្រាក់ដែលទទួលបាន",
    errorMeta: "សូមបញ្ចូលគោលដៅប្រាក់សន្សំ។",
    yaLlegas: "ប្រាក់ដែលមានស្រាប់នឹងឈានដល់គោលដៅក្នុងរយៈពេលនេះ ដោយមិនចាំបាច់សន្សំបន្ថែម។",
  }),
};
