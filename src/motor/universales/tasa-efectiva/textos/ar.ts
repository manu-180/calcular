import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosAr: TextosUi<UiTasaEfectiva> = textosArabes({
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "ما المعدل الذي لديك؟",
    nominalAEfectiva: "معدل اسمي (تحويله إلى معدل فعلي)",
    efectivaANominal: "معدل فعلي (تحويله إلى معدل اسمي)",
    tasa: "المعدل السنوي (%)",
    tasaAyuda: "أدخله كما هو مكتوب في العرض أو في العقد.",
    capitalizacion: "دورية احتساب الفائدة",
    capitalizacionAyuda: "عدد مرات إضافة الفائدة إلى الرصيد. في القروض وبطاقات الائتمان تُضاف عادة كل شهر.",
    mensual: "شهرية (12 مرة في السنة)",
    trimestral: "ربع سنوية (4 مرات في السنة)",
    semestral: "نصف سنوية (مرتان في السنة)",
    diaria: "يومية (365 مرة في السنة)",
    efectiva: "المعدل السنوي الفعلي",
    nominal: "المعدل السنوي الاسمي",
    periodica: "المعدل في كل فترة",
    errorNegativa: "لا يمكن أن يكون المعدل سالبًا. أدخل رقمًا من 0 فأكثر.",
    observacionDiferencia: (puntos) => `المعدل الفعلي أعلى من الاسمي بمقدار ${puntos} نقطة مئوية، لأن الفائدة تُحتسب أيضًا على الفوائد السابقة.`,
  }),
});
