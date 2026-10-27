import { definirTextos } from "@/motor/edicion";
import impotSurDividendes from "../../dz/calculadoras/impot-sur-dividendes";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(impotSurDividendes, {
  calculadora: "dz-ar.impot-sur-dividendes",
  slug: "impot-sur-dividendes",
  campos: {
    dividendes: { etiqueta: "الأرباح الإجمالية الموزعة" },
  },
  filas: {
    retenue: { etiqueta: "الاقتطاع من المصدر (الضريبة على الدخل الإجمالي)" },
    net: { etiqueta: "الأرباح الصافية المقبوضة" },
    taux: { etiqueta: "نسبة الاقتطاع" },
  },
  mensajes: MENSAJES_COMUNES,
});
