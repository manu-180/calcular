import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

// La definición pasa los símbolos latinos; en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = {
  m: "م",
  ft: "قدم",
  "m²": "م²",
  "ft²": "قدم²",
  "m²/L": "م²/لتر",
  "ft²/gal": "قدم²/غالون",
};
const unidad = (u: string) => UNIDAD[u] ?? u;
const volumen = (u: string) => (u === "L" ? "باللتر" : "بالغالون");

export const textosAr: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "ما القياسات التي لديك؟",
    modoMedidas: "طول الجدران وارتفاعها",
    modoSuperficie: "المساحة الإجمالية",
    largo: (u) => `الطول الإجمالي للجدران (${unidad(u)})`,
    largoAyuda: "مجموع أطوال كل الجدران التي ستطليها. وفي الغرفة يساوي محيطها.",
    alto: (u) => `ارتفاع الجدار (${unidad(u)})`,
    superficie: (u) => `المساحة المراد طلاؤها (${unidad(u)})`,
    aberturas: (u) => `مساحة الأبواب والنوافذ التي لا تُطلى (${unidad(u)})`,
    aberturasAyuda: "مساحة الباب نحو 2 م² (21 قدمًا مربعًا)، والنافذة العادية من 1 إلى 2 م².",
    manos: "عدد طبقات الطلاء",
    rendimiento: (u) => `تغطية الطلاء (${unidad(u)})`,
    rendimientoAyuda: "تجدها على العبوة: المساحة التي يغطيها الطلاء في الطبقة الواحدة. وإذا لم تعرفها فاترك القيمة المقترحة.",
    recomendado: (u) => `كمية الطلاء التي تشتريها (${volumen(u)})`,
    recomendadoAyuda: "تشمل 10% إضافية للترميمات وما يبقى في الرولة.",
    necesario: (u) => `الكمية الدقيقة (${volumen(u)})`,
    neta: (u) => `المساحة المراد طلاؤها (${unidad(u)})`,
    errorMedidas: "أدخل طول الجدران وارتفاعها.",
    errorSuperficie: "أدخل المساحة المراد طلاؤها.",
    errorAberturas: "لا يمكن أن تشغل الأبواب والنوافذ الجدار كله.",
    errorRendimiento: "يجب أن تكون التغطية أكبر من 0.",
  }),
};
