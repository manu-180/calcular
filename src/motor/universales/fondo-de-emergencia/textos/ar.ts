import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosAr: TextosUi<UiFondoDeEmergencia> = textosArabes({
  slug: "emergency-fund",
  ui: () => ({
    gastos: "المصروفات الأساسية في الشهر",
    gastosAyuda: "ما لا يمكنك التوقف عن دفعه: السكن والطعام والفواتير والمواصلات والصحة وأقساط الديون.",
    meses: "عدد أشهر المصروفات المطلوب تغطيتها",
    mesesAyuda: "من 3 إلى 6 أشهر إذا كان دخلك ثابتًا، وأكثر إذا كان متغيرًا أو كان للأسرة دخل واحد فقط.",
    actual: "ما ادّخرته حتى الآن (اختياري)",
    aporte: "ما يمكنك ادخاره كل شهر (اختياري)",
    meta: "صندوق الطوارئ المقترح",
    falta: "المبلغ المتبقي للادخار",
    mesesParaLlegar: "عدد الأشهر لإكماله",
    cobertura: "عدد الأشهر التي تغطيها مدخراتك اليوم",
    errorGastos: "أدخل مصروفاتك الأساسية لشهر واحد.",
    yaCubierto: "اكتمل صندوق الطوارئ. ما تدّخره من الآن يمكن أن يذهب إلى أهداف أخرى.",
    sinAporte: "أدخل المبلغ الذي يمكنك ادخاره كل شهر لتعرف كم يستغرق إكمال الصندوق.",
    observacionDonde: "احتفظ به في حساب منفصل يمكنك السحب منه في اليوم نفسه ويحافظ على قيمته، مثل حساب التوفير أو صندوق أسواق النقد.",
  }),
});
