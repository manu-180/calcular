import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/pension-calculator";

export default definirTextos(calculadora, {
  calculadora: "om-en.pension-calculator",
  slug: "pension-calculator",
  campos: {
    promedio: { etiqueta: "Your average monthly contribution wage" },
    anios: { etiqueta: "Years of actual service" },
    edad: { etiqueta: "Age at retirement" },
    sexo: { etiqueta: "Sex", opciones: { male: "Man", female: "Woman" } },
  },
  filas: {
    pension: { etiqueta: "Estimated monthly pension" },
    tasa: { etiqueta: "Pension as a share of average wage before reduction" },
    reduccion: { etiqueta: "Early retirement reduction" },
    sinReduccion: { etiqueta: "Retirement age without reduction" },
  },
  mensajes: {
    "أدخل متوسط أجرك الشهري.": "Enter your average monthly wage.",
    "أدخل سنوات الخدمة.": "Enter the years of service.",
    "بهذا العمر ومدة الخدمة لا يجوز طلب التقاعد المبكر: يلزم 20 عامًا من الخدمة قبل السن بخمسة أعوام على الأكثر، أو 30 عامًا دون اشتراط سن.":
      "With this age and service you cannot ask for early retirement: you need 20 years of service no more than five years before the age, or 30 years at any age.",
    "تقدير مبسط: القانون يعيد تقييم الأجور سنويًا بمتوسط نمو الأجور، ويحسب مدة الخدمة السابقة لعام 2024 على الراتب الأخير المعاد تقييمه، وقد يضمن حدًا أدنى نقديًا لمن له مدة في النظام السابق.":
      "A simplified estimate: the law revalues wages every year by average wage growth, works out service before 2024 on the revalued last salary, and may guarantee a cash minimum for people with service in the old scheme.",
  },
});
