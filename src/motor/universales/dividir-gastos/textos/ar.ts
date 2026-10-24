import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosAr: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `الشخص ${n}`,
    personaAyuda: "أدخل ما دفعه كل شخص. إذا لم يدفع أحدهم شيئًا لكنه يشارك في التكلفة فأدخل 0، واترك الباقي فارغًا.",
    total: "إجمالي المصروف",
    personas: "عدد الأشخاص",
    cuota: "حصة كل شخص",
    transferencias: "عدد الدفعات لتسوية الحساب",
    tabla: "من يدفع لمن",
    colDe: "يدفع",
    colPara: "يستلم",
    colMonto: "المبلغ",
    errorPocas: "تحتاج إلى شخصين على الأقل لتقسيم التكلفة.",
    aMano: "الحساب متساوٍ، فقد دفع الجميع المبلغ نفسه.",
  }),
};
