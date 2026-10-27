import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/inflation-calculator";

export default definirTextos(calculadora, {
  calculadora: "om-en.inflation-calculator",
  slug: "inflation-calculator",
  campos: {
    importe: { etiqueta: "Amount" },
    anios: { etiqueta: "Number of years", ayuda: "An estimate that assumes today's inflation rate stays the same." },
  },
  filas: {
    futuro: { etiqueta: "What the amount equals after these years" },
    poder: { etiqueta: "Buying power of the amount after these years" },
    haceUnAnio: { etiqueta: "What an amount from a year ago is worth today" },
    tasa: { etiqueta: "Annual inflation (latest rate)" },
    mes: { etiqueta: "Month of the data" },
  },
  mensajes: {
    "أدخل المبلغ.": "Enter the amount.",
    "التقدير للسنوات القادمة افتراضي. التضخم يتغير من شهر إلى آخر، والنسبة المستخدمة هي آخر نسبة سنوية نشرها المركز الوطني للإحصاء والمعلومات.":
      "The estimate for the coming years is an assumption. Inflation changes from month to month, and the rate used is the latest annual rate published by the National Centre for Statistics and Information.",
  },
});
