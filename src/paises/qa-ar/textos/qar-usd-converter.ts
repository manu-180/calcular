import { definirTextos } from "@/motor/edicion";
import converter from "../../qa/calculadoras/qar-usd-converter";

export default definirTextos(converter, {
  calculadora: "qa-ar.qar-usd-converter",
  slug: "qar-usd-converter",
  campos: {
    monto: { etiqueta: "المبلغ" },
    direccion: { etiqueta: "التحويل", opciones: { "usd-qar": "من الدولار الأمريكي إلى الريال القطري", "qar-usd": "من الريال القطري إلى الدولار الأمريكي" } },
  },
  filas: {
    resultado: { etiqueta: "المبلغ بعد التحويل" },
    qar: { etiqueta: "بالريال القطري" },
    usd: { etiqueta: "بالدولار الأمريكي" },
    tasa: { etiqueta: "السعر الرسمي (ريال لكل دولار)" },
  },
  mensajes: {
    "Enter an amount.": "أدخل مبلغًا.",
    "Banks and exchange houses add their own margin, so the rate you get can differ slightly.": "تضيف البنوك وشركات الصرافة هامشًا خاصًا بها، فقد يختلف السعر الذي تحصل عليه قليلًا.",
  },
});
