import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosAr: TextosUi<UiAhorroRetiro> = textosArabes({
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "عمرك اليوم",
    edadRetiro: "العمر الذي تريد أن تتقاعد فيه",
    actual: "ما ادّخرته حتى الآن",
    aporte: "الإيداع الشهري",
    rendimiento: "العائد السنوي الحقيقي (%)",
    rendimientoAyuda: "ما يكسبه الاستثمار فوق التضخم. من 2% إلى 5% افتراض حذر على المدى الطويل.",
    aniosRenta: "عدد سنوات التقاعد التي تريد تغطيتها",
    aniosRentaAyuda: "عدد السنوات التي تريد أن تصرف فيها من هذه المدخرات.",
    capital: "المدخرات عند التقاعد",
    renta: "الدخل الشهري من هذه المدخرات",
    aportado: "إجمالي الإيداعات",
    intereses: "إجمالي النمو",
    tabla: "نمو المدخرات حسب العمر",
    colEdad: "العمر",
    colAportado: "الإيداعات حتى الآن",
    colSaldo: "المدخرات",
    errorEdades: "يجب أن يكون عمر التقاعد أكبر من عمرك اليوم.",
    errorSinAhorro: "أدخل مدخراتك الحالية أو إيداعًا شهريًا.",
    observacionDineroDeHoy: "المبالغ بقيمة المال اليوم، لأن العائد الحقيقي يستبعد التضخم.",
    observacionPublica: "هذه مدخراتك الخاصة فقط. لا تشمل معاش التقاعد من التأمينات الاجتماعية أو أي صندوق تقاعد قد تحصل عليه.",
  }),
});
