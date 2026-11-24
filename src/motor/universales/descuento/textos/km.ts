import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosKm: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "តម្លៃដើម",
    descuento: "ការបញ្ចុះតម្លៃ (%)",
    segundoDescuento: "ការបញ្ចុះតម្លៃបន្ថែម (%)",
    segundoDescuentoAyuda: "បើមានការបញ្ចុះតម្លៃមួយជាន់ទៀត សូមបញ្ចូលនៅទីនេះ។",
    ahorro: "សន្សំបាន",
    final: "តម្លៃក្រោយបញ្ចុះ",
    descuentoTotal: "ការបញ្ចុះតម្លៃសរុប",
    errorMayorA100: "ការបញ្ចុះតម្លៃមិនអាចលើសពី 100% ទេ។",
    observacionDoble: (efectivo) => `ការបញ្ចុះតម្លៃពីរជាន់មិនបូកគ្នាត្រង់ៗទេ។ សរុបមកបញ្ចុះបាន ${efectivo}%។`,
  }),
};
