import { definirTextos } from "@/motor/edicion";
import minimumWage from "../../qa/calculadoras/minimum-wage";

export default definirTextos(minimumWage, {
  calculadora: "qa-ar.minimum-wage",
  slug: "minimum-wage",
  campos: {
    basico: { etiqueta: "الأجر الأساسي الشهري" },
    casa: { etiqueta: "يوفر صاحب العمل سكنًا ملائمًا" },
    vivienda: { etiqueta: "بدل السكن الشهري" },
    comidaDada: { etiqueta: "يوفر صاحب العمل الغذاء" },
    comida: { etiqueta: "بدل الغذاء الشهري" },
  },
  filas: {
    estado: { etiqueta: "النتيجة" },
    falta: { etiqueta: "النقص الشهري" },
    minimo: { etiqueta: "الحد الأدنى للأجر الشهري في حالتك" },
  },
  mensajes: {
    "Enter your monthly basic wage.": "أدخل أجرك الأساسي الشهري.",
    "Below the minimum wage": "أقل من الحد الأدنى للأجور",
    "Meets the minimum wage": "يستوفي الحد الأدنى للأجور",
    "The minimum applies to workers under the Labour Law and to domestic workers. An agreement for higher pay always prevails.":
      "يسري الحد الأدنى على العمال الخاضعين لقانون العمل وعلى المستخدمين في المنازل، ويبقى أي اتفاق على أجر أعلى نافذًا.",
    "The basic wage is below the legal minimum.": "الأجر الأساسي أقل من الحد الأدنى القانوني.",
    "Without housing provided, the housing allowance is below the legal minimum.": "مع عدم توفير السكن، بدل السكن أقل من الحد الأدنى القانوني.",
    "Without food provided, the food allowance is below the legal minimum.": "مع عدم توفير الغذاء، بدل الغذاء أقل من الحد الأدنى القانوني.",
  },
});
