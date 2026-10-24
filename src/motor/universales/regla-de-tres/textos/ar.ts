import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosAr: TextosUi<UiReglaDeTres> = textosArabes({
  slug: "rule-of-three",
  ui: () => ({
    tipo: "نوع التناسب",
    directa: "طردي (إذا زاد A زاد B)",
    inversa: "عكسي (إذا زاد A نقص B)",
    a: "A",
    aAyuda: "اقرأها هكذا: نسبة A إلى B مثل نسبة C إلى X. أدخل A وB وC.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "لا يمكن أن تكون هذه القيمة صفرًا، لأن الحساب يقسم عليها.",
    fraseDirecta: (a, b, c, x) => `إذا كان ${a} يقابل ${b}، فإن ${c} يقابل ${x}. الحساب: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `إذا كان ${a} يعطي ${b}، فإن ${c} يعطي ${x}. الحساب: ${a} × ${b} ÷ ${c}.`,
  }),
});
