import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosSq: TextosUi<UiDescuento> = {
  slug: "kalkulator-zbritje",
  ui: () => ({
    precio: "Çmimi fillestar",
    descuento: "Zbritja (%)",
    segundoDescuento: "Zbritje shtesë (%)",
    segundoDescuentoAyuda: "Nëse mbi të parën zbatohet edhe një zbritje tjetër, vendoseni këtu.",
    ahorro: "Kurseni",
    final: "Çmimi përfundimtar",
    descuentoTotal: "Zbritja totale",
    errorMayorA100: "Një zbritje nuk mund të jetë më e madhe se 100%.",
    observacionDoble: (efectivo) => `Dy zbritje radhazi nuk mblidhen: së bashku e ulin çmimin me ${efectivo}%.`,
  }),
};
