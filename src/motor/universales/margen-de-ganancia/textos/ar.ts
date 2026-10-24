import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosAr: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "ماذا تريد أن تحسب؟",
    modoPrecio: "هامش الربح من التكلفة والسعر",
    modoMargen: "السعر الذي يحقق هامش ربح مستهدفًا",
    modoMarkup: "السعر الذي يحقق نسبة إضافة مستهدفة على التكلفة",
    costo: "تكلفة الوحدة",
    costoAyuda: "ما تكلفه شراء الوحدة أو إنتاجها، دون الضريبة التي يدفعها العميل.",
    precio: "سعر البيع",
    precioAyuda: "فقط إذا كنت تحسب الهامش، ودون ضريبة.",
    objetivo: "الهامش أو نسبة الإضافة المستهدفة (%)",
    objetivoAyuda: "فقط إذا كنت تحسب السعر.",
    precioResultado: "سعر البيع",
    margen: "هامش الربح",
    margenAyuda: "الربح كنسبة مئوية من سعر البيع.",
    markup: "نسبة الإضافة على التكلفة",
    markupAyuda: "الربح كنسبة مئوية من التكلفة.",
    ganancia: "الربح لكل وحدة",
    errorCosto: "أدخل تكلفة الوحدة الواحدة.",
    errorFaltaPrecio: "أدخل سعر البيع لحساب هامش الربح.",
    errorFaltaObjetivo: "أدخل الهامش أو نسبة الإضافة التي تستهدفها.",
    errorMargen100: "يجب أن يكون الهامش أقل من 100%، فهذه النسبة تعني أن السعر كله ربح بلا أي تكلفة.",
    observacionPerdida: "بهذا السعر تبيع بأقل من التكلفة، أي أنك تخسر في كل عملية بيع.",
  }),
};
