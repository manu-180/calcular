import { definirTextos } from "@/motor/edicion";
import gratuity from "../../qa/calculadoras/gratuity-calculator";
import { MENSAJES_COMUNES, SEMANAL } from "../lib/comun";

export default definirTextos(gratuity, {
  calculadora: "qa-ar.gratuity-calculator",
  slug: "gratuity-calculator",
  campos: {
    basico: { etiqueta: "آخر راتب أساسي شهري", ayuda: "الراتب الأساسي وحده، دون بدل السكن أو النقل أو غيرهما." },
    anios: { etiqueta: "سنوات الخدمة المتصلة", ayuda: "استخدم الكسور لجزء السنة: ست سنوات وستة أشهر تساوي 6.5." },
    semanasContrato: { etiqueta: "أسابيع الأجر الأساسي عن كل سنة في عقدك", ayuda: "اترك الحد الأدنى القانوني ما لم يمنحك عقدك أكثر منه." },
    metodoSemanal: SEMANAL,
  },
  filas: {
    gratuidad: { etiqueta: "مكافأة نهاية الخدمة" },
    semanas: { etiqueta: "أسابيع الأجر الأساسي" },
    semanal: { etiqueta: "الأجر الأساسي الأسبوعي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter your years of service.": "أدخل سنوات خدمتك.",
    "Gratuity is due only after one full year of service, so nothing is due yet.": "لا تُستحق المكافأة إلا بعد سنة كاملة من الخدمة، فلا يُستحق شيء حتى الآن.",
    "Your contract can't give less than the legal minimum, so the minimum is used.": "لا يجوز أن يمنحك العقد أقل من الحد الأدنى القانوني، لذلك حُسبت المكافأة على الحد الأدنى.",
    "An employer may deduct money you owe it. Dismissal for one of the serious reasons in Article 61 of the Labour Law loses the gratuity.":
      "يحق لصاحب العمل أن يخصم ما تدين له به. والفصل لأحد الأسباب الجسيمة الواردة في المادة 61 من قانون العمل يُسقط المكافأة.",
  },
});
