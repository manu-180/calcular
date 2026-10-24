import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosAr: TextosUi<UiAumentoDeSueldo> = textosArabes({
  slug: "pay-raise",
  ui: () => ({
    sueldo: "الراتب الشهري الحالي",
    sueldoAyuda: "الإجمالي أو الصافي، كما تفضّل. النتيجة تأتي على الأساس نفسه.",
    aumentoPorcentaje: "نسبة الزيادة (%)",
    aumentoMonto: "الزيادة كمبلغ (اختياري)",
    aumentoMontoAyuda: "إذا كانت زيادتك مبلغًا ثابتًا فأدخله هنا، وسيُستخدم بدل النسبة.",
    inflacion: "التضخم خلال الفترة (%، اختياري)",
    inflacionAyuda: "التضخم منذ آخر زيادة، لتعرف هل يشتري راتبك أكثر مما كان يشتري أم أقل.",
    sueldosAnio: "عدد الرواتب في السنة",
    sueldosAnioAyuda: "12 للراتب الشهري، و13 أو 14 إذا كنت تحصل كل سنة على راتب شهر إضافي.",
    nuevo: "الراتب الشهري الجديد",
    diferenciaMensual: "الفرق في الشهر",
    diferenciaAnual: "الفرق في السنة",
    porcentaje: "نسبة الزيادة",
    real: "الزيادة الحقيقية (بعد التضخم)",
    realAyuda: "كم يشتري راتبك الجديد أكثر من راتبك السابق.",
    errorSueldo: "أدخل راتبك الحالي.",
    errorSinAumento: "أدخل الزيادة كنسبة أو كمبلغ.",
    observacionGana: (puntos) => `زيادتك تفوق التضخم، فراتبك يشتري ${puntos}% أكثر مما كان يشتري.`,
    observacionPierde: (puntos) => `زيادتك أقل من التضخم، فراتبك يشتري ${puntos}% أقل مما كان يشتري.`,
    observacionIgual: "زيادتك تساوي التضخم، فراتبك يشتري ما كان يشتريه من قبل.",
  }),
});
