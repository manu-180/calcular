import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/unfair-dismissal-compensation";

const RANGO = /^عدد الأشهر بين (\d+) و(\d+)\.$/;

export default definirTextos(calculadora, {
  calculadora: "om-en.unfair-dismissal-compensation",
  slug: "unfair-dismissal-compensation",
  campos: {
    salario: { etiqueta: "Last total monthly wage" },
    meses: { etiqueta: "Number of months you expect", ayuda: "The court sets it between the two limits, taking into account the worker's situation and length of service." },
  },
  filas: {
    estimado: { etiqueta: "Compensation for the months you chose" },
    minimo: { etiqueta: "Minimum compensation" },
    maximo: { etiqueta: "Maximum compensation" },
  },
  mensajes: {
    "أدخل آخر أجر شامل شهري.": "Enter the last total monthly wage.",
    "التعويض يحكم به القضاء إذا لم يقرر إعادة العامل إلى عمله، ويضاف إليه مكافأة نهاية الخدمة وأجر مدة الإخطار والاشتراكات التأمينية من تاريخ الفصل حتى الحكم النهائي.":
      "The court awards compensation if it does not order the worker back to work. The end-of-service gratuity, notice pay and insurance contributions from the dismissal to the final ruling are added on top.",
  },
  traducir: (t) => {
    const m = RANGO.exec(t);
    return m ? `The number of months goes from ${m[1]} to ${m[2]}.` : undefined;
  },
});
