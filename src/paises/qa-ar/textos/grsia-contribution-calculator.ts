import { definirTextos } from "@/motor/edicion";
import grsia from "../../qa/calculadoras/grsia-contribution-calculator";

export default definirTextos(grsia, {
  calculadora: "qa-ar.grsia-contribution-calculator",
  slug: "grsia-contribution-calculator",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    social: { etiqueta: "العلاوة الاجتماعية الشهرية" },
    vivienda: { etiqueta: "بدل السكن الشهري", ayuda: "إذا وفّر لك صاحب العمل سكنًا بدل البدل النقدي، فأدخل قيمة هذه الميزة." },
  },
  filas: {
    empleado: { etiqueta: "اشتراكك الشهري" },
    empleador: { etiqueta: "اشتراك صاحب العمل الشهري" },
    total: { etiqueta: "إجمالي ما يُدفع للهيئة شهريًا" },
    base: { etiqueta: "راتب حساب الاشتراك" },
    anual: { etiqueta: "إجمالي ما يُدفع للهيئة في السنة" },
  },
  mensajes: {
    "Enter your monthly basic salary.": "أدخل راتبك الأساسي الشهري.",
    "These contributions apply to Qatari employees aged 18 or over in a permanent job of at least one year.":
      "تسري هذه الاشتراكات على الموظفين القطريين الذين بلغوا 18 سنة ويشغلون وظيفة دائمة لا تقل مدتها عن سنة.",
    "Only part of the housing allowance counts, because the law caps it.": "لا يدخل في الاشتراك إلا جزء من بدل السكن، لأن القانون وضع له حدًا أعلى.",
    "The contribution salary is capped at the legal maximum.": "حُسب راتب الاشتراك على الحد الأعلى الذي حدده القانون.",
  },
});
