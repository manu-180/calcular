import { definirTextos } from "@/motor/edicion";
import annualLeave from "../../qa/calculadoras/annual-leave";
import { MENSAJES_COMUNES, SEMANAL } from "../lib/comun";

export default definirTextos(annualLeave, {
  calculadora: "qa-ar.annual-leave",
  slug: "annual-leave",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    anios: { etiqueta: "مجموع سنوات خدمتك لدى صاحب العمل" },
    meses: { etiqueta: "الأشهر التي عملتها في سنة الإجازة الحالية", ayuda: "12 للسنة الكاملة. جزء السنة يمنح إجازة بنسبته." },
    tomadas: { etiqueta: "أسابيع الإجازة التي أخذتها هذه السنة" },
    metodoSemanal: SEMANAL,
  },
  filas: {
    pendientes: { etiqueta: "الإجازة المتبقية لك" },
    pago: { etiqueta: "أجر الإجازة المتبقية" },
    derecho: { etiqueta: "الإجازة المستحقة هذه السنة" },
    porAnio: { etiqueta: "الإجازة عن سنة كاملة" },
    semanal: { etiqueta: "الأجر الأساسي الأسبوعي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter the months you worked this year.": "أدخل الأشهر التي عملتها هذه السنة.",
    "Annual leave is due after one full year of continuous service.": "تُستحق الإجازة السنوية بعد سنة كاملة من الخدمة المتصلة.",
    "You've taken more leave than you've earned so far this year.": "أخذت إجازة أكثر مما استحققته حتى الآن في هذه السنة.",
    "Leave is paid on your basic salary. If your contract ends before you take it, the employer pays the unused weeks in cash.":
      "يُدفع أجر الإجازة على أساس راتبك الأساسي. وإذا انتهى عقدك قبل أن تأخذها، يدفع لك صاحب العمل الأسابيع المتبقية نقدًا.",
  },
});
