import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/salary-calculator";
import { NACIONALIDAD } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.salary-calculator",
  slug: "salary-calculator",
  campos: {
    basico: { etiqueta: "Monthly basic wage" },
    bdl: { etiqueta: "Monthly allowances", ayuda: "Such as housing and transport allowance. All of them count towards the contribution wage." },
    nacionalidad: NACIONALIDAD,
  },
  filas: {
    neto: { etiqueta: "Monthly take-home pay" },
    bruto: { etiqueta: "Total wage" },
    descuento: { etiqueta: "Social Protection Fund deduction" },
    vejez: { etiqueta: "Of which old age, disability and death" },
    seguridad: { etiqueta: "Of which job security" },
    anual: { etiqueta: "Take-home pay per year" },
  },
  mensajes: {
    "أدخل الأجر الأساسي الشهري.": "Enter the monthly basic wage.",
    "الحسم المحسوب هنا هو حصتك في اشتراكات صندوق الحماية الاجتماعية. أقساط القروض والسلف وأي حسومات أخرى في عقدك لا تدخل في الحساب.":
      "The deduction here is your share of Social Protection Fund contributions. Loan and advance repayments or any other deductions in your contract are not included.",
    "العامل غير العماني لا يُحسم من أجره اشتراك في صندوق الحماية الاجتماعية.": "Non-Omani workers have no Social Protection Fund contribution taken from their wage.",
    "حُسب اشتراك فرع كبار السن على سقف أجر الاشتراك، أما الأمان الوظيفي فيُحسب على الأجر كله.":
      "The old age contribution was worked out on the contribution wage cap. Job security is worked out on the whole wage.",
  },
});
