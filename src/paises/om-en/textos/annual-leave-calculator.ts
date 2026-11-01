import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/annual-leave-calculator";
import { DIAS_MES } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.annual-leave-calculator",
  slug: "annual-leave-calculator",
  campos: {
    momento: { etiqueta: "When is the leave paid out?", opciones: { end: "When the job ends", during: "During the job, with the worker's written consent" } },
    basico: { etiqueta: "Monthly basic wage" },
    total: { etiqueta: "Total monthly wage", ayuda: "Basic wage plus all allowances." },
    saldo: { etiqueta: "Unused annual leave balance, in days" },
    diasMes: DIAS_MES,
  },
  filas: {
    pago: { etiqueta: "Pay for the leave balance" },
    diario: { etiqueta: "Day's pay used" },
    anual: { etiqueta: "Annual leave in the law" },
  },
  mensajes: {
    "أدخل الأجر الأساسي الشهري.": "Enter the monthly basic wage.",
    "الأجر الشامل لا يقل عن الأجر الأساسي.": "The total wage cannot be lower than the basic wage.",
    "يحتفظ العامل برصيد لا يزيد على 30 يومًا من الإجازة غير المستخدمة، ما لم يكن عدم استخدامها لمصلحة العمل.":
      "A worker keeps a balance of up to 30 days of unused leave, unless the leave was not taken because the work required it.",
    "أثناء الخدمة يُدفع الأجر الأساسي عن أيام الإجازة إذا وافق العامل كتابة، ولا يجوز له التنازل عن إجازته.":
      "During the job, the basic wage is paid for leave days only if the worker agrees in writing, and the worker cannot give up their leave.",
  },
});
