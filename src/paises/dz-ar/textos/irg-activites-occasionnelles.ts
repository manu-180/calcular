import { definirTextos } from "@/motor/edicion";
import irgActivitesOccasionnelles from "../../dz/calculadoras/irg-activites-occasionnelles";

export default definirTextos(irgActivitesOccasionnelles, {
  calculadora: "dz-ar.irg-activites-occasionnelles",
  slug: "irg-activites-occasionnelles",
  campos: {
    montant: { etiqueta: "الأجرة الإجمالية" },
    activite: { etiqueta: "طبيعة النشاط" },
  },
  filas: {
    retenue: { etiqueta: "الاقتطاع من المصدر (الضريبة على الدخل الإجمالي)" },
    taux: { etiqueta: "النسبة المطبقة" },
    net: { etiqueta: "المبلغ المدفوع بعد الاقتطاع" },
  },
  mensajes: {
    "Indiquez une rémunération supérieure à zéro.": "أدخل أجرة أكبر من الصفر.",
  },
});
