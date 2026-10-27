import { definirTextos } from "@/motor/edicion";
import congesPayes from "../../dz/calculadoras/conges-payes";

export default definirTextos(congesPayes, {
  calculadora: "dz-ar.conges-payes",
  slug: "conges-payes",
  campos: {
    mois: {
      etiqueta: "أشهر العمل خلال فترة المرجع",
      ayuda: "تمتد الفترة من أول يوليو من السنة السابقة إلى 30 يونيو من سنة العطلة. وتعادل 24 يوم عمل أو 4 أسابيع عمل شهرًا واحدًا.",
    },
    sud: { etiqueta: "تعمل في ولاية من ولايات الجنوب", ayuda: "تُحدَّد المناطق المعنية عن طريق التنظيم." },
  },
  filas: {
    total: { etiqueta: "أيام العطلة المدفوعة الأجر" },
    principal: { etiqueta: "العطلة الرئيسية" },
    supplementaire: { etiqueta: "العطلة الإضافية للجنوب (الحد الأدنى)" },
  },
  mensajes: {
    "Indiquez un nombre de mois entre 0 et 12.": "أدخل عدد أشهر بين 0 و12.",
    "Le congé se compte en jours calendaires. Les conventions collectives peuvent l'allonger pour les travaux pénibles ou dangereux et fixent les modalités du congé supplémentaire du Sud.":
      "تُحسب العطلة بالأيام التقويمية. ويمكن للاتفاقيات الجماعية تمديدها للأعمال الشاقة أو الخطيرة، وهي تحدد كيفيات العطلة الإضافية للجنوب.",
  },
});
