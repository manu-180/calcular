import { definirTextos } from "@/motor/edicion";
import calculTva from "../../dz/calculadoras/calcul-tva";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(calculTva, {
  calculadora: "dz-ar.calcul-tva",
  slug: "calcul-tva",
  campos: {
    montant: { etiqueta: "المبلغ" },
    sens: {
      etiqueta: "ماذا تريد أن تحسب؟",
      opciones: {
        ajouter: "إضافة الرسم (المبلغ خارج الرسم)",
        retirer: "استخراج الرسم (المبلغ بكل الرسوم)",
      },
    },
    taux: {
      etiqueta: "نسبة الرسم على القيمة المضافة",
      opciones: {
        normal: "النسبة العادية",
        reduit: "النسبة المخفضة (العمليات الواردة في المادة 23 من قانون الرسوم على رقم الأعمال)",
      },
    },
  },
  filas: {
    tva: { etiqueta: "مبلغ الرسم على القيمة المضافة" },
    ht: { etiqueta: "المبلغ خارج الرسم" },
    ttc: { etiqueta: "المبلغ بكل الرسوم" },
    taux: { etiqueta: "النسبة المطبقة" },
  },
  mensajes: MENSAJES_COMUNES,
});
