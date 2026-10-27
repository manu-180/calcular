import { definirTextos } from "@/motor/edicion";
import sugar from "../../qa/calculadoras/sugar-tax-calculator";

export default definirTextos(sugar, {
  calculadora: "qa-ar.sugar-tax-calculator",
  slug: "sugar-tax-calculator",
  campos: {
    azucar: { etiqueta: "إجمالي السكر في كل 100 مل (غرام)" },
    soloArtificial: { etiqueta: "محليات صناعية فقط دون سكر مضاف" },
    ml: { etiqueta: "حجم العلبة أو الزجاجة (مل)" },
    unidades: { etiqueta: "عدد العلب أو الزجاجات" },
  },
  filas: {
    total: { etiqueta: "الضريبة الانتقائية على كل الكمية" },
    tramo: { etiqueta: "فئة السكر" },
    porLitro: { etiqueta: "الضريبة لكل لتر" },
    porUnidad: { etiqueta: "الضريبة لكل علبة أو زجاجة" },
    litros: { etiqueta: "مجموع اللترات" },
  },
  mensajes: {
    "Enter the size of each can or bottle.": "أدخل حجم العلبة أو الزجاجة.",
    "Exempt: low sugar": "معفاة: منخفضة السكر",
    "Exempt: artificial sweeteners only": "معفاة: محليات صناعية فقط",
    "High sugar": "عالية السكر",
    "Medium sugar": "متوسطة السكر",
  },
});
