import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sa.dependent-fee-calculator",
  h1: "حاسبة رسوم المرافقين",
  title: "حساب رسوم المرافقين للمقيمين في السعودية",
  description: "احسب المقابل المالي على المرافقين عن مدة الإقامة: عدد المرافقين × المبلغ الشهري × عدد الأشهر.",
  intro: [
    "يدفع المقيم العامل في القطاع الخاص مقابلًا ماليًا شهريًا عن كل مرافق مسجل على إقامته.",
    "أدخل عدد المرافقين وعدد الأشهر، فيظهر لك المبلغ المطلوب.",
  ],
  comoSeCalcula: [
    "المقابل المالي = عدد المرافقين × {{sa.dependent-fee}} × عدد الأشهر.",
  ],
  faq: [],
  glosario: [{ termino: "المرافق", definicion: "فرد من أسرة المقيم مسجل على إقامته." }],
});
