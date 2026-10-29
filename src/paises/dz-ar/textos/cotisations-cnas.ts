import { definirTextos } from "@/motor/edicion";
import cotisationsCnas from "../../dz/calculadoras/cotisations-cnas";

export default definirTextos(cotisationsCnas, {
  calculadora: "dz-ar.cotisations-cnas",
  slug: "cotisations-cnas",
  campos: {
    assiette: { etiqueta: "الأجر الشهري الخاضع للاشتراك" },
  },
  filas: {
    total: { etiqueta: "مجموع الاشتراك المدفوع للصندوق الوطني للتأمينات الاجتماعية" },
    salarie: { etiqueta: "الحصة المقتطعة من أجرك" },
    employeur: { etiqueta: "حصة صاحب العمل" },
    oeuvres: { etiqueta: "حصة صندوق الخدمات الاجتماعية" },
    tauxGlobal: { etiqueta: "النسبة الإجمالية" },
  },
  mensajes: {
    "Indiquez un salaire supérieur à zéro.": "أدخل أجرًا أكبر من الصفر.",
  },
});
