import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosAr: TextosUi<UiDescuento> = textosArabes({
  slug: "discount",
  ui: () => ({
    precio: "السعر الأصلي",
    descuento: "نسبة الخصم (%)",
    segundoDescuento: "خصم إضافي (%)",
    segundoDescuentoAyuda: "إذا كان هناك خصم آخر فوق الخصم الأول، فأدخله هنا.",
    ahorro: "المبلغ الذي توفّره",
    final: "السعر النهائي",
    descuentoTotal: "إجمالي الخصم",
    errorMayorA100: "لا يمكن أن تزيد نسبة الخصم على 100%.",
    observacionDoble: (efectivo) => `الخصمان المتتاليان لا يُجمعان ببساطة، فهما معًا يخفضان السعر بنسبة ${efectivo}%.`,
  }),
});
