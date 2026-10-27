import { definirTextos } from "@/motor/edicion";
import corporate from "../../qa/calculadoras/corporate-tax-calculator";

export default definirTextos(corporate, {
  calculadora: "qa-ar.corporate-tax-calculator",
  slug: "corporate-tax-calculator",
  campos: {
    renta: { etiqueta: "الدخل الخاضع للضريبة عن السنة", ayuda: "إجمالي الدخل بعد التكاليف واجبة الخصم والخسائر المرحلة." },
    qatari: { etiqueta: "حصة القطريين في الأرباح", ayuda: "الأشخاص الطبيعيون القطريون المقيمون والشركات المملوكة بالكامل لقطريين. حصتهم معفاة." },
  },
  filas: {
    impuesto: { etiqueta: "ضريبة الدخل المستحقة" },
    gravable: { etiqueta: "الحصة الخاضعة للضريبة من الدخل" },
    efectiva: { etiqueta: "النسبة الفعلية على كامل الدخل" },
  },
  mensajes: {
    "Enter the taxable income.": "أدخل الدخل الخاضع للضريبة.",
    "Petroleum operations and petrochemical industries pay at least 35% under their agreements. Large multinational groups may also owe a 15% minimum tax.":
      "العمليات البترولية والصناعات البتروكيماوية تخضع لنسبة لا تقل عن 35% وفق اتفاقياتها. وقد تخضع المجموعات متعددة الجنسيات الكبيرة أيضًا لضريبة دنيا بنسبة 15%.",
    "Even an exempt taxpayer has to file a tax return.": "يلتزم المكلف بتقديم الإقرار الضريبي حتى لو كان معفى.",
  },
});
