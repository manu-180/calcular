import { definirTextos } from "@/motor/edicion";
import takeHomePay from "../../qa/calculadoras/take-home-pay";
import { MENSAJES_COMUNES, QATARI } from "../lib/comun";

export default definirTextos(takeHomePay, {
  calculadora: "qa-ar.take-home-pay",
  slug: "take-home-pay",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    vivienda: { etiqueta: "بدل السكن الشهري" },
    otros: { etiqueta: "بدلات شهرية أخرى", ayuda: "بدل النقل أو الهاتف أو أي بدل آخر يُصرف مع الراتب." },
    qatari: QATARI,
    social: { etiqueta: "العلاوة الاجتماعية الشهرية", ayuda: "تدخل في راتب حساب الاشتراك مع الراتب الأساسي وبدل السكن." },
  },
  filas: {
    neto: { etiqueta: "صافي الراتب الشهري" },
    bruto: { etiqueta: "إجمالي الراتب الشهري" },
    base: { etiqueta: "راتب حساب الاشتراك" },
    aporte: { etiqueta: "اشتراكك في التأمينات الاجتماعية" },
    anual: { etiqueta: "صافي الراتب في 12 شهرًا" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter your monthly basic salary.": "أدخل راتبك الأساسي الشهري.",
    "Only part of your housing allowance counts for GRSIA, because the law caps it.": "لا يدخل في الاشتراك إلا جزء من بدل السكن، لأن القانون وضع له حدًا أعلى.",
    "Your contribution is worked out on the maximum contribution salary.": "حُسب اشتراكك على الحد الأعلى لراتب حساب الاشتراك.",
    "Your employer pays its own GRSIA share on top. It doesn't come out of your pay.": "يدفع صاحب العمل حصته في الاشتراك من ماله، ولا تُخصم من راتبك.",
    "Expatriate employees don't pay social insurance, and Qatar doesn't tax salaries, so your take-home pay matches your gross pay.":
      "العامل الوافد لا يدفع اشتراكات التأمينات الاجتماعية، ولا تُفرض في قطر ضريبة على الرواتب، فيبقى صافي راتبك مساويًا لإجماليه.",
    "Loan instalments, advances or other deductions in your contract aren't included.": "أقساط القروض والسلف وأي استقطاعات أخرى في عقدك لا تدخل في الحساب.",
  },
});
