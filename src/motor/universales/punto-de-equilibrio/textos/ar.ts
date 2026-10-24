import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosAr: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "التكاليف الثابتة في الشهر",
    fijosAyuda: "ما تدفعه حتى لو لم تبع شيئًا: الإيجار والرواتب الثابتة والفواتير والبرامج.",
    precio: "سعر بيع الوحدة",
    variable: "التكلفة المتغيرة للوحدة",
    variableAyuda: "ما تكلفك كل وحدة تبيعها: المواد والبضاعة والعمولات والشحن.",
    objetivo: "الربح المستهدف في الشهر (اختياري)",
    objetivoAyuda: "لتعرف كم يجب أن تبيع بعد تغطية تكاليفك.",
    unidades: "عدد الوحدات لبلوغ نقطة التعادل",
    facturacion: "المبيعات اللازمة لبلوغ نقطة التعادل",
    contribucion: "هامش المساهمة للوحدة",
    contribucionAyuda: "ما تتركه كل عملية بيع لتغطية التكاليف الثابتة: السعر ناقص التكلفة المتغيرة.",
    contribucionPct: "هامش المساهمة (%)",
    unidadesObjetivo: "عدد الوحدات لتحقيق الربح المستهدف",
    facturacionObjetivo: "المبيعات اللازمة لتحقيق الربح المستهدف",
    errorPrecio: "أدخل سعر بيع الوحدة الواحدة.",
    errorMargen: "التكلفة المتغيرة تساوي السعر أو تزيد عليه، فكل عملية بيع تخسر ولن تبلغ نقطة التعادل أبدًا. راجع السعر أو التكلفة.",
    observacionRedondeo: "عدد الوحدات مقرّب إلى الأعلى، لأنه لا يمكن بيع جزء من وحدة.",
  }),
};
