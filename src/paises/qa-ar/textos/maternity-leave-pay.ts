import { definirTextos } from "@/motor/edicion";
import maternity from "../../qa/calculadoras/maternity-leave-pay";
import { DIARIO, MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(maternity, {
  calculadora: "qa-ar.maternity-leave-pay",
  slug: "maternity-leave-pay",
  campos: {
    salario: { etiqueta: "الأجر الشهري", ayuda: "الراتب الأساسي مضافًا إليه البدلات المنتظمة." },
    anios: { etiqueta: "سنوات الخدمة لدى صاحب العمل" },
    metodoDiario: DIARIO,
  },
  filas: {
    pago: { etiqueta: "الأجر خلال إجازة الوضع" },
    dias: { etiqueta: "أيام الإجازة بأجر كامل" },
    despues: { etiqueta: "الحد الأدنى للأيام بعد الوضع" },
    diario: { etiqueta: "الأجر اليومي" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter your monthly wage.": "أدخلي أجرك الشهري.",
    "Paid maternity leave needs a full year with the employer.": "تشترط إجازة الوضع المدفوعة إتمام سنة كاملة لدى صاحب العمل.",
    "If health problems after the birth keep you off work longer, you can take unpaid leave of up to 60 days with a medical certificate.":
      "إذا منعتك حالتك الصحية بعد الوضع من العودة إلى العمل، تُعدّين في إجازة بدون أجر لا تزيد على 60 يومًا بشهادة طبية.",
  },
});
