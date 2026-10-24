import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosAr: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "المبلغ الأصلي",
    tasa: "معدل الفائدة السنوي (%)",
    tiempo: "المدة",
    unidad: "وحدة المدة",
    dias: "أيام",
    meses: "أشهر",
    anios: "سنوات",
    base: "عدد أيام السنة (للمدد بالأيام)",
    baseAyuda: "بعض البنوك تحسب السنة 360 يومًا. إذا لم تكن متأكدًا، اترك 365.",
    base365: "365 يومًا",
    base360: "360 يومًا (السنة المصرفية)",
    interes: "الفائدة",
    montoFinal: "المبلغ الأصلي مع الفائدة",
    tasaPeriodo: "معدل الفائدة عن المدة",
    errorCapital: "أدخل مبلغًا أصليًا أكبر من صفر.",
  }),
};
