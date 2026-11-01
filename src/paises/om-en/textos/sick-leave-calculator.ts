import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/sick-leave-calculator";
import { DIAS_MES, NACIONALIDAD } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.sick-leave-calculator",
  slug: "sick-leave-calculator",
  campos: {
    salario: { etiqueta: "Total monthly wage", ayuda: "Basic wage plus all allowances." },
    previos: { etiqueta: "Sick leave days already taken this year" },
    dias: { etiqueta: "Days of the current sick leave" },
    nacionalidad: NACIONALIDAD,
    diasMes: DIAS_MES,
  },
  filas: {
    total: { etiqueta: "Pay owed for the leave" },
    empleador: { etiqueta: "Paid by the employer" },
    fondo: { etiqueta: "Paid by the Social Protection Fund" },
    sinPago: { etiqueta: "Unpaid days" },
    diario: { etiqueta: "Total daily wage" },
  },
  mensajes: {
    "أدخل الأجر الشامل الشهري.": "Enter the total monthly wage.",
    "أدخل عدد أيام الإجازة.": "Enter the number of leave days.",
    "يثبت المرض بشهادة طبية. للإجازة المرضية حد سنوي، ونسبة الأجر تنقص كلما طالت المدة.":
      "Illness is proven with a medical certificate. Sick leave has a yearly limit, and the share of pay goes down the longer it lasts.",
    "للعماني تغطي جهة العمل أجر الأيام السبعة الأولى بكامله، ويغطي صندوق الحماية الاجتماعية باقي المدة من فرع تأمين الإجازات المرضية.":
      "For Omani workers, the employer pays the first seven days in full and the Social Protection Fund pays the rest from the sick leave insurance branch.",
    "بعض الأيام تتجاوز الحد السنوي للإجازة المرضية، فلا يُحسب لها أجر.": "Some days go beyond the yearly sick leave limit, so no pay is counted for them.",
  },
});
