import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/overtime-calculator";
import { DIAS_MES } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.overtime-calculator",
  slug: "overtime-calculator",
  campos: {
    basico: { etiqueta: "Monthly basic wage" },
    tipo: {
      etiqueta: "When the overtime was worked",
      opciones: { day: "Daytime hours", night: "Night hours (9 pm to 5 am)", rest: "Weekly rest day or public holiday" },
    },
    urgente: {
      etiqueta: "Overtime without the worker's consent (stocktaking, an accident or unusual pressure)",
      ayuda: "The cases where article 72 allows overtime without consent. They are paid at a higher rate.",
    },
    horas: { etiqueta: "Number of overtime hours" },
    dias: { etiqueta: "Number of rest days or holidays worked" },
    horasDia: { etiqueta: "Normal working hours per day", ayuda: "Eight hours in the law, and six hours for Muslim workers in Ramadan." },
    diasMes: DIAS_MES,
  },
  filas: {
    pago: { etiqueta: "Overtime pay" },
    porUnidad: { etiqueta: "Per overtime hour or day" },
    hora: { etiqueta: "Basic hourly wage" },
    recargo: { etiqueta: "Premium applied" },
  },
  mensajes: {
    "أدخل الأجر الأساسي الشهري.": "Enter the monthly basic wage.",
    "يجب أن يوافق العامل على العمل الإضافي، إلا في الحالات التي تعددها المادة 72.": "The worker has to agree to overtime, except in the cases listed in article 72.",
    "ساعات العمل العادية التي أدخلتها أكثر من الحد اليومي في قانون العمل.": "The normal hours you entered are above the daily limit in the Labour Law.",
    "ويجوز بدل المبلغ تعويض العامل بيومي راحة عن كل يوم عمل في الإجازات الرسمية.": "Instead of the payment, the worker may get two rest days for each public holiday worked.",
    "ويجوز بدل المبلغ منح العامل يوم راحة تعويضيًا عن كل يوم عمل.": "Instead of the payment, the worker may get one day off for each day worked.",
  },
});
