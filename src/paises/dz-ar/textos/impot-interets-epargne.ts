import { definirTextos } from "@/motor/edicion";
import impotInteretsEpargne from "../../dz/calculadoras/impot-interets-epargne";

export default definirTextos(impotInteretsEpargne, {
  calculadora: "dz-ar.impot-interets-epargne",
  slug: "impot-interets-epargne",
  campos: {
    interets: { etiqueta: "الفوائد الإجمالية للسنة" },
    placement: {
      etiqueta: "نوع التوظيف",
      opciones: { livret: "دفتر أو حساب ادخار", depot: "إيداع لأجل أو سند صندوق أو دين آخر" },
    },
  },
  filas: {
    net: { etiqueta: "الفوائد الصافية المدفوعة" },
    retenue: { etiqueta: "الاقتطاع من المصدر" },
    liberatoire: { etiqueta: "منه اقتطاع محرِّر" },
    credit: { etiqueta: "منه قرض ضريبي" },
    tauxMoyen: { etiqueta: "متوسط نسبة الاقتطاع" },
  },
  mensajes: {
    "Indiquez un montant d'intérêts supérieur à zéro.": "أدخل مبلغ فوائد أكبر من الصفر.",
    "La retenue sur la fraction au-delà du seuil est un crédit d'impôt : ces intérêts entrent dans la déclaration annuelle de revenus et la retenue s'impute sur l'impôt dû.":
      "الاقتطاع على الجزء الذي يتجاوز العتبة قرض ضريبي: تدخل هذه الفوائد في التصريح السنوي بالمداخيل ويُخصم الاقتطاع من الضريبة المستحقة.",
    "La retenue est un crédit d'impôt : les intérêts entrent dans la déclaration annuelle de revenus et la retenue s'impute sur l'impôt dû.":
      "الاقتطاع قرض ضريبي: تدخل الفوائد في التصريح السنوي بالمداخيل ويُخصم الاقتطاع من الضريبة المستحقة.",
  },
});
