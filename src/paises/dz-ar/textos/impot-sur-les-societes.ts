import { definirTextos } from "@/motor/edicion";
import impotSurLesSocietes from "../../dz/calculadoras/impot-sur-les-societes";

export default definirTextos(impotSurLesSocietes, {
  calculadora: "dz-ar.impot-sur-les-societes",
  slug: "impot-sur-les-societes",
  campos: {
    benefice: { etiqueta: "الربح الخاضع للضريبة للسنة المالية" },
    activite: { etiqueta: "نشاط المؤسسة" },
    reinvesti: {
      etiqueta: "حصة الربح المعاد استثمارها (اختياري)",
      ayuda: "الأرباح المعاد استثمارها وفق شروط المادة 142 مكرر من قانون الضرائب المباشرة.",
    },
  },
  filas: {
    ibs: { etiqueta: "الضريبة على أرباح الشركات المستحقة" },
    taux: { etiqueta: "نسبة النشاط" },
    ibsNormal: { etiqueta: "الضريبة على الربح غير المعاد استثماره" },
    ibsReduit: { etiqueta: "الضريبة بالنسبة المخفضة على الحصة المعاد استثمارها" },
    tauxEffectif: { etiqueta: "النسبة الفعلية" },
    apresImpot: { etiqueta: "الربح بعد الضريبة" },
  },
  mensajes: {
    "Indiquez un bénéfice supérieur à zéro.": "أدخل ربحًا أكبر من الصفر.",
    "La part réinvestie ne peut pas dépasser le bénéfice.": "لا يمكن أن تتجاوز الحصة المعاد استثمارها الربح.",
  },
});
