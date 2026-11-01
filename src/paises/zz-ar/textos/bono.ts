import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-ar.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "الراتب الشهري الإجمالي" },
    meses: { etiqueta: "الأشهر التي عملتها في نصف السنة" },
    region: { etiqueta: "منطقة العمل" },
    regimen: { etiqueta: "حجم الشركة", opciones: { general: "شركة متوسطة أو كبيرة", pequena: "شركة صغيرة" } },
  },
  filas: {
    base: { etiqueta: "الراتب المعتمد في الحساب" },
    bono: { etiqueta: "المكافأة" },
    bonificacion: { etiqueta: "المبلغ الإضافي" },
    total: { etiqueta: "إجمالي ما تحصل عليه" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "عدد الأشهر من 1 إلى 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "راتبك أقل من الحد الأدنى في منطقتك، لذلك تُحسب المكافأة على أساس الحد الأدنى.",
  },
});
