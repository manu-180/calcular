import { definirTextos } from "@/motor/edicion";
import noticePeriod from "../../qa/calculadoras/notice-period";

export default definirTextos(noticePeriod, {
  calculadora: "qa-ar.notice-period",
  slug: "notice-period",
  campos: {
    anios: { etiqueta: "سنوات الخدمة" },
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    trabajados: { etiqueta: "أيام الإخطار التي عملتها", ayuda: "اتركها صفرًا إذا انتهى العقد دون أي إخطار." },
  },
  filas: {
    meses: { etiqueta: "مدة الإخطار" },
    faltan: { etiqueta: "أيام الإخطار التي لم تُعمل" },
    compensacion: { etiqueta: "التعويض عن مدة الإخطار الناقصة" },
  },
  mensajes: {
    "Enter the monthly basic salary.": "أدخل الراتب الأساسي الشهري.",
    "The same notice applies whether the employee or the employer ends the contract.": "مدة الإخطار واحدة سواء أنهى العقد العامل أو صاحب العمل.",
    "Whoever ends the contract without the full notice pays the other side the basic salary for the missing part.":
      "من ينهي العقد دون مراعاة مدة الإخطار كاملة يدفع للطرف الآخر الأجر الأساسي عن المدة الناقصة.",
  },
});
