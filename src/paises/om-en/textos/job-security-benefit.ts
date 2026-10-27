import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/job-security-benefit";

export default definirTextos(calculadora, {
  calculadora: "om-en.job-security-benefit",
  slug: "job-security-benefit",
  campos: {
    promedio: { etiqueta: "Your average monthly wage over the last two years", ayuda: "The total wage subject to contributions, with no cap." },
    meses: { etiqueta: "Months you expect to be out of work" },
  },
  filas: {
    mensual: { etiqueta: "Monthly job security allowance" },
    meses: { etiqueta: "Months paid" },
    total: { etiqueta: "Total allowance" },
  },
  mensajes: {
    "أدخل متوسط أجرك الشهري.": "Enter your average monthly wage.",
    "بدل الأمان الوظيفي للعمانيين المؤمن عليهم في فرع تأمين الأمان الوظيفي. شروط الاستحقاق ومدد الاشتراك اللازمة تبينها اللائحة التنفيذية وتقررها وزارة العمل.":
      "The job security allowance is for Omanis insured in the job security branch. The executive regulations set who qualifies and the contribution periods needed, and the Ministry of Labour decides each case.",
    "النسبة من متوسط أجرك أقل من الحد الأدنى للبدل، فيُصرف الحد الأدنى.": "The share of your average wage is below the minimum allowance, so the minimum is paid.",
    "يُصرف البدل لمدة أقصاها ستة أشهر متصلة أو متقطعة.": "The allowance is paid for up to six months, in one stretch or in parts.",
  },
});
