import { definirTextos } from "@/motor/edicion";
import indemniteArretMaladie from "../../dz/calculadoras/indemnite-arret-maladie";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(indemniteArretMaladie, {
  calculadora: "dz-ar.indemnite-arret-maladie",
  slug: "indemnite-arret-maladie",
  campos: {
    brut: { etiqueta: "الأجر الإجمالي الشهري", ayuda: "الأجر الخاضع للاشتراك، قبل اقتطاع الضمان الاجتماعي والضريبة على الدخل الإجمالي." },
    jours: { etiqueta: "أيام التوقف عن العمل", ayuda: "كل أيام التوقف، سواء كانت أيام عمل أم لا." },
    plein: { etiqueta: "مرض طويل المدة أو استشفاء" },
  },
  filas: {
    total: { etiqueta: "التعويضات اليومية عن مدة التوقف" },
    journalier: { etiqueta: "الأجر اليومي الصافي" },
    joursReduits: { etiqueta: "الأيام المعوَّضة بالنسبة المخفضة" },
    montantReduit: { etiqueta: "المبلغ بالنسبة المخفضة" },
    joursPleins: { etiqueta: "الأيام المعوَّضة بالنسبة الكاملة" },
    montantPlein: { etiqueta: "المبلغ بالنسبة الكاملة" },
    perte: { etiqueta: "الفرق مع الأجر الصافي للفترة" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Indiquez au moins un jour d'arrêt.": "أدخل يوم توقف واحدًا على الأقل.",
    "L'indemnité est due pour chaque jour de l'arrêt, ouvrable ou non, à condition que la CNAS ait reçu l'arrêt de travail dans les délais. Le salaire journalier retenu est le salaire net mensuel divisé par trente.":
      "تُستحق التعويضة عن كل يوم من أيام التوقف، سواء كان يوم عمل أم لا، بشرط أن يتسلم الصندوق الوطني للتأمينات الاجتماعية شهادة التوقف عن العمل في الآجال. والأجر اليومي المعتمد هو الأجر الصافي الشهري مقسومًا على ثلاثين.",
  },
});
