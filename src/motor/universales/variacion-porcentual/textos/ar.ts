import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosAr: TextosUi<UiVariacion> = textosArabes({
  slug: "percentage-change",
  ui: () => ({
    inicial: "القيمة الأولى",
    final: "القيمة الأخيرة",
    variacion: "التغير بالنسبة المئوية",
    diferencia: "الفرق",
    vuelta: "للعودة إلى القيمة الأولى",
    vueltaAyuda: "مقدار التغير الذي تحتاجه القيمة الأخيرة لتعود إلى القيمة الأولى.",
    errorInicialCero: "لا يمكن أن تكون القيمة الأولى صفرًا، فلا يُحسب تغير بالنسبة المئوية من الصفر.",
    subio: (p) => `ارتفعت القيمة بنسبة ${p}%.`,
    bajo: (p) => `انخفضت القيمة بنسبة ${p}%.`,
    igual: "لا تغيير، فالقيمتان متساويتان.",
  }),
});
