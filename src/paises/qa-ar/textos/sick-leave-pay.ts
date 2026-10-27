import { definirTextos } from "@/motor/edicion";
import sickLeave from "../../qa/calculadoras/sick-leave-pay";
import { MENSAJES_COMUNES, SEMANAL } from "../lib/comun";

export default definirTextos(sickLeave, {
  calculadora: "qa-ar.sick-leave-pay",
  slug: "sick-leave-pay",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    meses: { etiqueta: "الأشهر منذ التحاقك بصاحب العمل" },
    semanas: { etiqueta: "أسابيع الإجازة المرضية في سنة الخدمة الحالية", ayuda: "بشهادة من طبيب يعتمده صاحب العمل." },
    metodoSemanal: SEMANAL,
  },
  filas: {
    pago: { etiqueta: "أجر الإجازة المرضية عن المدة" },
    completas: { etiqueta: "أسابيع بأجر كامل" },
    medias: { etiqueta: "أسابيع بنصف الأجر" },
    sinPago: { etiqueta: "أسابيع بدون أجر" },
    semanal: { etiqueta: "الأجر الأساسي الأسبوعي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter the weeks of sick leave.": "أدخل أسابيع الإجازة المرضية.",
    "Paid sick leave starts after three months with the employer.": "تبدأ الإجازة المرضية المدفوعة بعد ثلاثة أشهر من الالتحاق بصاحب العمل.",
    "After the twelfth week, the employer may end the contract if a specialist confirms you can't return to work.":
      "بعد نهاية الأسبوع الثاني عشر يجوز لصاحب العمل إنهاء العقد إذا أثبت تقرير الطبيب المختص عجزك عن العودة إلى العمل.",
  },
});
