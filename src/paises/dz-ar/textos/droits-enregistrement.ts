import { definirTextos } from "@/motor/edicion";
import droitsEnregistrement from "../../dz/calculadoras/droits-enregistrement";

export default definirTextos(droitsEnregistrement, {
  calculadora: "dz-ar.droits-enregistrement",
  slug: "droits-enregistrement",
  campos: {
    prix: { etiqueta: "سعر العقار", ayuda: "السعر المصرح به في العقد." },
    operation: {
      etiqueta: "نوع العقد",
      opciones: { vente: "بيع مباشر", promesse: "وعد بالبيع ثم عقد البيع" },
    },
  },
  filas: {
    total: { etiqueta: "حقوق التسجيل" },
    vente: { etiqueta: "الحق على عقد البيع" },
    promesse: { etiqueta: "الحق على الوعد بالبيع" },
    concretisation: { etiqueta: "الحق على العقد الذي يجسد الوعد" },
    taux: { etiqueta: "النسبة الإجمالية" },
  },
  mensajes: {
    "Indiquez un prix supérieur à zéro.": "أدخل سعرًا أكبر من الصفر.",
  },
});
