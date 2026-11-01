import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosMn: TextosUi<UiDescuento> = {
  slug: "khongololt-tootsooluur",
  ui: () => ({
    precio: "Анхны үнэ",
    descuento: "Хөнгөлөлт (%)",
    segundoDescuento: "Нэмэлт хөнгөлөлт (%)",
    segundoDescuentoAyuda: "Хямдарсан үнэ дээр дахин хөнгөлөлт байвал энд оруулна уу.",
    ahorro: "Таны хэмнэх дүн",
    final: "Эцсийн үнэ",
    descuentoTotal: "Нийт хөнгөлөлт",
    errorMayorA100: "Хөнгөлөлт 100 хувиас их байж болохгүй.",
    observacionDoble: (efectivo) => `Дараалсан хоёр хөнгөлөлтийг шууд нэмдэггүй: хамтдаа үнийг ${efectivo} хувиар бууруулна.`,
  }),
};
