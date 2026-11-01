import { definirTextos } from "@/motor/edicion";
import pensionDeRetraite from "../../dz/calculadoras/pension-de-retraite";

const N = "(\\d+(?:[.,]\\d+)?)";
const DROIT = new RegExp(`^Le droit à pension suppose ${N} ans au moins \\(${N} ans révolus pour une femme qui le demande\\) et ${N} ans de travail\\.`);
const PLAFOND = new RegExp(`^La loi limite aussi le montant net de la pension à ${N} %`);
const DUREE = new RegExp(`^Avec moins de ${N} ans de travail,`);

export default definirTextos(pensionDeRetraite, {
  calculadora: "dz-ar.pension-de-retraite",
  slug: "pension-de-retraite",
  campos: {
    salaire: { etiqueta: "متوسط الأجر الشهري المرجعي", ayuda: "الأجر الشهري الإجمالي الخاضع للاشتراك الذي يعتمده الصندوق الوطني للتقاعد أساسًا للحساب." },
    annees: { etiqueta: "السنوات المصادق عليها" },
    trimestres: { etiqueta: "الفصول الإضافية المصادق عليها", ayuda: "فصول سنة غير مكتملة، من 0 إلى 3." },
  },
  filas: {
    mensuelle: { etiqueta: "معاش التقاعد الشهري الإجمالي التقديري" },
    annuelle: { etiqueta: "المعاش على 12 شهرًا" },
    taux: { etiqueta: "نسبة المعاش" },
    duree: { etiqueta: "المدة المصادق عليها المعتمدة" },
    anneesUtiles: { etiqueta: "السنوات اللازمة لبلوغ النسبة القصوى" },
  },
  mensajes: {
    "Indiquez un salaire de référence supérieur à zéro.": "أدخل أجرًا مرجعيًا أكبر من الصفر.",
  },
  traducir: (t) => {
    let m = DROIT.exec(t);
    if (m) {
      return `يشترط الحق في المعاش بلوغ ${m[1]} سنة على الأقل (${m[2]} سنة كاملة للمرأة التي تطلب ذلك) و${m[3]} سنة من العمل. ثم يطبق الصندوق الوطني للتقاعد الاقتطاعات على المعاش.`;
    }
    m = PLAFOND.exec(t);
    if (m) return `ويحدد القانون كذلك المبلغ الصافي للمعاش بما لا يتجاوز ${m[1]} % من الأجر الصافي من الاشتراكات والضريبة.`;
    m = DUREE.exec(t);
    if (m) return `بأقل من ${m[1]} سنة من العمل، لا يتوفر شرط المدة للحصول على معاش التقاعد.`;
    return undefined;
  },
});
