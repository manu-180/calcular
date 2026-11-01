import { definirTextos } from "@/motor/edicion";
import calculSalaireNet from "../../dz/calculadoras/calcul-salaire-net";
import { BRUT, HANDICAPE, MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(calculSalaireNet, {
  calculadora: "dz-ar.calcul-salaire-net",
  slug: "calcul-salaire-net",
  campos: {
    brut: BRUT,
    special: HANDICAPE,
  },
  filas: {
    net: { etiqueta: "الأجر الصافي الشهري" },
    cnas: { etiqueta: "ناقص: اشتراك الضمان الاجتماعي" },
    irg: { etiqueta: "ناقص: الضريبة على الدخل الإجمالي المقتطعة من المصدر" },
    retenues: { etiqueta: "مجموع الاقتطاعات" },
    imposable: { etiqueta: "الأجر الخاضع للضريبة" },
    netAnnuel: { etiqueta: "الأجر الصافي على 12 شهرًا" },
    partNet: { etiqueta: "نسبة ما تتقاضاه من الأجر الإجمالي" },
  },
  mensajes: MENSAJES_COMUNES,
});
