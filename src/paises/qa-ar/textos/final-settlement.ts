import { definirTextos } from "@/motor/edicion";
import finalSettlement from "../../qa/calculadoras/final-settlement";
import { MENSAJES_COMUNES, SEMANAL } from "../lib/comun";

export default definirTextos(finalSettlement, {
  calculadora: "qa-ar.final-settlement",
  slug: "final-settlement",
  campos: {
    basico: { etiqueta: "آخر راتب أساسي شهري" },
    anios: { etiqueta: "سنوات الخدمة المتصلة" },
    vacaciones: { etiqueta: "أسابيع الإجازة السنوية غير المستخدمة" },
    pendiente: { etiqueta: "أجر لم يُدفع بعد", ayuda: "أيام العمل في الشهر الأخير وأي أجر سابق لم تتسلمه." },
    preaviso: {
      etiqueta: "الإخطار",
      opciones: {
        cumplido: "مُنح الإخطار كاملًا أو عُمل به",
        empleador: "أنهى صاحب العمل العقد دون إخطار",
        empleado: "تركت العمل دون إخطار",
      },
    },
    articulo61: { etiqueta: "فُصلت لأحد الأسباب الجسيمة الواردة في المادة 61" },
    metodoSemanal: SEMANAL,
  },
  filas: {
    total: { etiqueta: "مستحقات نهاية الخدمة" },
    gratuidad: { etiqueta: "مكافأة نهاية الخدمة" },
    vacaciones: { etiqueta: "مقابل الإجازة غير المستخدمة" },
    preaviso: { etiqueta: "التعويض عن الإخطار" },
    pendiente: { etiqueta: "الأجر غير المدفوع" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter your years of service.": "أدخل سنوات خدمتك.",
    "A dismissal under Article 61 loses the gratuity and the notice period.": "الفصل وفق المادة 61 يُسقط المكافأة ومدة الإخطار.",
    "There's no gratuity before one full year of service.": "لا تُستحق المكافأة قبل سنة كاملة من الخدمة.",
    "Leaving without notice means you owe the employer the basic salary for the notice period, so it's taken off the total.":
      "ترك العمل دون إخطار يُلزمك بأن تدفع لصاحب العمل الأجر الأساسي عن مدة الإخطار، لذلك خُصم من المجموع.",
    "This uses the legal minimum gratuity. The employer may deduct money you owe it.": "استُخدم هنا الحد الأدنى القانوني للمكافأة. ويحق لصاحب العمل أن يخصم ما تدين له به.",
  },
});
