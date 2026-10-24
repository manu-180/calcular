import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosAr: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "المبلغ المستثمر",
    final: "القيمة النهائية",
    finalAyuda: "قيمة الاستثمار اليوم، أو ما حصلت عليه عند بيعه.",
    cobrado: "العوائد المحصّلة خلال المدة (اختياري)",
    cobradoAyuda: "توزيعات الأرباح أو الفوائد أو الإيجارات التي حصّلتها ولم تُعِد استثمارها.",
    anios: "مدة الاستثمار بالسنوات",
    aniosAyuda: "يمكنك استخدام الكسور لجزء من السنة، مثل سنة ونصف.",
    ganancia: "الربح",
    roi: "العائد الإجمالي (ROI)",
    cagr: "العائد السنوي (CAGR)",
    cagrAyuda: "العائد السنوي الذي يعطي النتيجة نفسها إذا تراكم سنة بعد سنة.",
    errorInicial: "أدخل المبلغ الذي استثمرته في البداية.",
    observacionCorto: "مع مدة أقل من سنة، يمدّ العائد السنوي نتيجة قصيرة كأنها تتكرر طوال السنة، فاقرأه بحذر.",
    observacionInflacion: "لتعرف هل زادت قدرتك الشرائية، قارن العائد السنوي بمعدل التضخم في الفترة نفسها.",
  }),
};
