import { definirTextos } from "@/motor/edicion";
import calculIrgPrime from "../../dz/calculadoras/calcul-irg-prime";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(calculIrgPrime, {
  calculadora: "dz-ar.calcul-irg-prime",
  slug: "calcul-irg-prime",
  campos: {
    prime: { etiqueta: "المبلغ الإجمالي للمنحة أو المخلفات" },
    cotisable: {
      etiqueta: "المنحة خاضعة لاشتراك الضمان الاجتماعي",
      ayuda: "ألغِ الاختيار إذا كانت قسيمة أجرك لا تطبق اشتراكًا على هذه المنحة.",
    },
  },
  filas: {
    net: { etiqueta: "المنحة الصافية" },
    cnas: { etiqueta: "ناقص: اشتراك الضمان الاجتماعي" },
    imposable: { etiqueta: "المبلغ الخاضع للضريبة" },
    irg: { etiqueta: "ناقص: الضريبة على الدخل الإجمالي بالنسبة الثابتة" },
  },
  mensajes: MENSAJES_COMUNES,
});
