import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/notice-period";
import { DIAS_MES } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.notice-period",
  slug: "notice-period",
  campos: {
    pago: { etiqueta: "How the wage is paid", opciones: { monthly: "Monthly wage", other: "Daily, weekly or piece-rate wage" } },
    contrato: { etiqueta: "Notice period in the contract, in days", ayuda: "Leave it at zero if the contract sets none. The longer period applies." },
    aviso: { etiqueta: "Date the written notice was given" },
    cumplidos: { etiqueta: "Notice days actually worked", ayuda: "If the contract ends before the notice runs out, the other side is owed compensation for the rest." },
    salario: { etiqueta: "Last total monthly wage" },
    diasMes: DIAS_MES,
  },
  filas: {
    dias: { etiqueta: "Notice period" },
    fin: { etiqueta: "Last day of notice" },
    legal: { etiqueta: "Legal minimum" },
    faltan: { etiqueta: "Notice days not worked" },
    compensacion: { etiqueta: "Compensation for the days not worked" },
  },
  mensajes: {
    "أدخل آخر أجر شامل شهري.": "Enter the last total monthly wage.",
    "الأيام التي عملها أكثر من مدة الإخطار.": "The days worked are more than the notice period.",
    "إذا كان العامل في إجازة عند تسليم إخطار صاحب العمل، يبدأ الإخطار من اليوم التالي لانتهاء الإجازة.":
      "If the worker is on leave when the employer gives notice, the notice starts the day after the leave ends.",
    "خلال الإخطار من صاحب العمل يحق للعامل التغيب عشر ساعات مدفوعة الأجر في الأسبوع للبحث عن عمل جديد.":
      "During notice from the employer, the worker may take ten paid hours off a week to look for a new job.",
  },
});
