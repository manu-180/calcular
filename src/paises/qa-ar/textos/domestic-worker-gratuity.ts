import { definirTextos } from "@/motor/edicion";
import domestic from "../../qa/calculadoras/domestic-worker-gratuity";
import { MENSAJES_COMUNES, SEMANAL } from "../lib/comun";

export default definirTextos(domestic, {
  calculadora: "qa-ar.domestic-worker-gratuity",
  slug: "domestic-worker-gratuity",
  campos: {
    salario: { etiqueta: "الأجر الشهري" },
    anios: { etiqueta: "سنوات الخدمة المحسوبة", ayuda: "لا تُحسب في المكافأة إلا الخدمة منذ 12 سبتمبر 2017، تاريخ العمل بقانون المستخدمين في المنازل." },
    semanasContrato: { etiqueta: "أسابيع الأجر عن كل سنة في العقد", ayuda: "اترك الحد الأدنى القانوني ما لم يمنح العقد أكثر منه." },
    metodoSemanal: { ...SEMANAL, ayuda: "يحدد القانون المكافأة بأسابيع من الأجر ولا يبين طريقة تحويل الأجر الشهري. استخدم الطريقة المتفق عليها مع صاحب العمل." },
  },
  filas: {
    gratuidad: { etiqueta: "مكافأة نهاية الخدمة" },
    semanas: { etiqueta: "أسابيع الأجر" },
    semanal: { etiqueta: "الأجر الأسبوعي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter the years of service.": "أدخل سنوات الخدمة.",
    "The gratuity is due after one full year of service.": "تُستحق المكافأة بعد سنة كاملة من الخدمة.",
    "A contract can't give less than the legal minimum, so the minimum is used.": "لا يجوز أن يمنح العقد أقل من الحد الأدنى القانوني، لذلك حُسبت المكافأة على الحد الأدنى.",
    "The employer can deduct money the worker owes it. A worker who is dismissed for breaching the law or the contract can lose the gratuity for that year.":
      "يحق لصاحب العمل أن يخصم ما يدين له به المستخدم. ومن يُفصل لإخلاله بالقانون أو بالعقد قد يفقد المكافأة عن السنة التي فُصل فيها.",
  },
});
