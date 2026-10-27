import { definirTextos } from "@/motor/edicion";
import employerCost from "../../qa/calculadoras/employer-cost-calculator";
import { QATARI } from "../lib/comun";

export default definirTextos(employerCost, {
  calculadora: "qa-ar.employer-cost-calculator",
  slug: "employer-cost-calculator",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    vivienda: { etiqueta: "بدل السكن الشهري" },
    otros: { etiqueta: "بدلات شهرية أخرى" },
    qatari: { etiqueta: "الموظف مواطن قطري مسجل لدى الهيئة العامة للتقاعد والتأمينات الاجتماعية", ayuda: QATARI.ayuda },
    social: { etiqueta: "العلاوة الاجتماعية الشهرية" },
  },
  filas: {
    mensual: { etiqueta: "التكلفة الشهرية على صاحب العمل" },
    bruto: { etiqueta: "إجمالي الراتب الشهري" },
    grsia: { etiqueta: "اشتراك صاحب العمل في التأمينات الاجتماعية" },
    provision: { etiqueta: "مخصص مكافأة نهاية الخدمة الشهري" },
    anual: { etiqueta: "التكلفة السنوية على صاحب العمل" },
  },
  mensajes: {
    "Enter the monthly basic salary.": "أدخل الراتب الأساسي الشهري.",
    "For a Qatari employee, the employer pays its GRSIA share every month.": "عن الموظف القطري، يدفع صاحب العمل حصته في التأمينات الاجتماعية كل شهر.",
    "For an expatriate, there's no social insurance. The provision sets aside the minimum end-of-service gratuity month by month.":
      "لا توجد تأمينات اجتماعية عن العامل الوافد. المخصص يجنّب الحد الأدنى لمكافأة نهاية الخدمة شهرًا بعد شهر.",
    "Recruitment, visa, medical insurance, flights and housing provided in kind aren't included.":
      "تكاليف الاستقدام والتأشيرة والتأمين الصحي وتذاكر السفر والسكن العيني لا تدخل في الحساب.",
  },
});
