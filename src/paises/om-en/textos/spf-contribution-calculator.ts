import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/spf-contribution-calculator";
import { NACIONALIDAD } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.spf-contribution-calculator",
  slug: "spf-contribution-calculator",
  campos: {
    salario: { etiqueta: "Total monthly wage", ayuda: "Basic wage plus all allowances." },
    nacionalidad: NACIONALIDAD,
  },
  filas: {
    total: { etiqueta: "Total monthly contributions" },
    empleado: { etiqueta: "Employee share" },
    empleador: { etiqueta: "Employer share" },
    vejezEmpleado: { etiqueta: "Employee: old age, disability and death" },
    seguridadEmpleado: { etiqueta: "Employee: job security" },
    vejezEmpleador: { etiqueta: "Employer: old age, disability and death" },
    lesiones: { etiqueta: "Employer: work injuries and occupational diseases" },
    seguridadEmpleador: { etiqueta: "Employer: job security" },
    maternidad: { etiqueta: "Employer: maternity leave" },
    enfermedad: { etiqueta: "Employer: sick and non-ordinary leave" },
  },
  mensajes: {
    "أدخل الأجر الشهري الشامل.": "Enter the total monthly wage.",
    "لا تُسدد اليوم اشتراكات عن العامل غير العماني. يسري عليه فرع إصابات العمل بعد خمسة أعوام من صدور القانون (يوليو 2028)، وفرعا الأمومة والإجازات المرضية للفئات التي يحددها مجلس إدارة الصندوق.":
      "No contributions are paid today for non-Omani workers. The work injury branch covers them five years after the law was issued (July 2028), and the maternity and sick leave branches cover the groups the Fund's board decides.",
    "فرعا كبار السن وإصابات العمل محسوبان على سقف أجر الاشتراك. الفروع الأخرى على الأجر كله.":
      "Old age and work injury are worked out on the contribution wage cap. The other branches are on the whole wage.",
  },
});
