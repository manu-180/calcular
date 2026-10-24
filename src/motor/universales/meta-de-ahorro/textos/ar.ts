import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosAr: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "كم تريد أن تدّخر؟",
    actual: "ما ادّخرته حتى الآن (اختياري)",
    meses: "عدد الأشهر للوصول إلى الهدف",
    rendimiento: "العائد السنوي على المدخرات (%، اختياري)",
    rendimientoAyuda: "إذا كان المال في حساب أو استثمار يدرّ عائدًا. اتركه فارغًا إذا لم يكن له عائد.",
    aporteMensual: "المبلغ الذي تحتاج إلى ادخاره كل شهر",
    aporteSemanal: "أي كل أسبوع",
    totalAportado: "إجمالي ما تودعه",
    intereses: "العائد المكتسب",
    errorMeta: "أدخل المبلغ الذي تريد ادخاره.",
    yaLlegas: "ما لديك الآن يكفي للوصول إلى الهدف في هذه المدة من دون إيداعات جديدة.",
  }),
};
