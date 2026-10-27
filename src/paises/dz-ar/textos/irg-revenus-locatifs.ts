import { definirTextos } from "@/motor/edicion";
import irgRevenusLocatifs from "../../dz/calculadoras/irg-revenus-locatifs";

export default definirTextos(irgRevenusLocatifs, {
  calculadora: "dz-ar.irg-revenus-locatifs",
  slug: "irg-revenus-locatifs",
  campos: {
    loyer: { etiqueta: "الإيجار الشهري الخام" },
    mois: { etiqueta: "الأشهر المؤجرة في السنة" },
    usage: { etiqueta: "نوع الإيجار" },
  },
  filas: {
    irg: { etiqueta: "الضريبة على إيجارات السنة" },
    annuel: { etiqueta: "الإيجارات الخام للسنة" },
    taux: { etiqueta: "النسبة المطبقة" },
    mensuel: { etiqueta: "الضريبة عن كل شهر مؤجر" },
    net: { etiqueta: "الإيجارات بعد الضريبة" },
  },
  mensajes: {
    "Indiquez un loyer supérieur à zéro.": "أدخل إيجارًا أكبر من الصفر.",
    "Sous le plafond, cet impôt est libératoire : vous n'avez rien d'autre à payer au titre de l'IRG sur ces loyers.":
      "دون السقف تكون هذه الضريبة محررة، فلا شيء آخر عليك دفعه بعنوان الضريبة على الدخل الإجمالي عن هذه الإيجارات.",
    "Au-dessus du plafond, la retenue est provisoire. Elle s'impute sur l'IRG global calculé avec le barème progressif.":
      "فوق السقف يكون الاقتطاع مؤقتًا، ويُخصم من الضريبة على الدخل الإجمالي المحسوبة حسب الجدول التصاعدي.",
  },
});
