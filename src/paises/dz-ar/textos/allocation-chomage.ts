import { definirTextos } from "@/motor/edicion";
import allocationChomage from "../../dz/calculadoras/allocation-chomage";

export default definirTextos(allocationChomage, {
  calculadora: "dz-ar.allocation-chomage",
  slug: "allocation-chomage",
  campos: {
    dejaPercus: { etiqueta: "أشهر المنحة التي تقاضيتها" },
  },
  filas: {
    mensuel: { etiqueta: "منحة البطالة الشهرية" },
    annuel: { etiqueta: "المبلغ على 12 شهرًا" },
    restants: { etiqueta: "الأشهر المتبقية على الأكثر" },
    montantRestant: { etiqueta: "المبلغ المتبقي على الأكثر" },
    maximum: { etiqueta: "أقصى مدة للدفع" },
  },
  mensajes: {
    "Indiquez un nombre de mois compris dans la durée maximale.": "أدخل عدد أشهر لا يتجاوز المدة القصوى.",
    "La durée maximale suppose le renouvellement accordé et l'année supplémentaire obtenue. Le renouvellement dépend du respect des engagements : valider l'inscription tous les six mois, répondre aux convocations de l'ANEM et ne pas refuser une offre d'emploi adaptée.":
      "تفترض المدة القصوى الحصول على التجديد وعلى السنة الإضافية. ويتوقف التجديد على احترام الالتزامات: تأكيد التسجيل كل ستة أشهر، والاستجابة لاستدعاءات الوكالة الوطنية للتشغيل، وعدم رفض عرض عمل مناسب.",
  },
});
