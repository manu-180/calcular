import { definirTextos } from "@/motor/edicion";
import calculSalaireBrut from "../../dz/calculadoras/calcul-salaire-brut";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(calculSalaireBrut, {
  calculadora: "dz-ar.calcul-salaire-brut",
  slug: "calcul-salaire-brut",
  campos: {
    net: { etiqueta: "الأجر الصافي الشهري المطلوب" },
    special: { etiqueta: "عامل معوق", ayuda: "إعاقة حركية أو ذهنية، أو كفيف، أو أصم أبكم." },
  },
  filas: {
    brut: { etiqueta: "الأجر الإجمالي الشهري اللازم" },
    cnas: { etiqueta: "اشتراك الضمان الاجتماعي" },
    irg: { etiqueta: "الضريبة على الدخل الإجمالي المقتطعة من المصدر" },
    net: { etiqueta: "الأجر الصافي المحصل" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Indiquez un salaire net supérieur à zéro.": "أدخل أجرًا صافيًا أكبر من الصفر.",
  },
});
