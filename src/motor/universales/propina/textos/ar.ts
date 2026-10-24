import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosAr: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "قيمة الفاتورة",
    porcentaje: "البقشيش (%)",
    porcentajeAyuda: "تختلف العادات من بلد إلى آخر ومن مكان إلى آخر. اختر النسبة التي تراها مناسبة.",
    personas: "عدد الأشخاص الذين يدفعون",
    redondear: "تقريب حصة كل شخص إلى الأعلى",
    redondearAyuda: "ليدفع كل شخص مبلغًا صحيحًا بلا كسور، ويذهب الفرق إلى البقشيش.",
    propina: "البقشيش",
    total: "الإجمالي مع البقشيش",
    porPersona: "حصة كل شخص",
    propinaEfectiva: "البقشيش بعد التقريب",
    errorPersonas: "يجب أن يدفع شخص واحد على الأقل.",
    observacionRedondeo: (efectiva) => `بعد التقريب إلى الأعلى أصبح البقشيش ${efectiva}% من قيمة الفاتورة.`,
  }),
};
