// Textos que se repiten en varias calculadoras de Argelia (campos y mensajes de src/paises/dz/lib).
import { OBS_ASSIETTE } from "../../dz/lib/irg";

export const BRUT = {
  etiqueta: "الأجر الإجمالي الشهري",
  ayuda: "الأجر القاعدي والمنح والتعويضات المدفوعة كل شهر، قبل أي اقتطاع.",
};

export const HANDICAPE = {
  etiqueta: "عامل معوق",
  ayuda: "إعاقة حركية أو ذهنية، أو كفيف، أو أصم أبكم: يطبَّق تخفيض إضافي من الضريبة على الدخل الإجمالي على الأجور المتواضعة.",
};

export const MENSAJES_COMUNES = {
  [OBS_ASSIETTE]:
    "يفترض الحساب أن الأجر الإجمالي كله خاضع لاشتراك الضمان الاجتماعي وللضريبة على الدخل الإجمالي. إذا كان جزء من أجرك غير خاضع لهما، فستختلف قسيمة أجرك.",
  "Indiquez un salaire brut supérieur à zéro.": "أدخل أجرًا إجماليًا أكبر من الصفر.",
  "Indiquez un prix de cession supérieur à zéro.": "أدخل سعر تنازل أكبر من الصفر.",
  "Indiquez un montant supérieur à zéro.": "أدخل مبلغًا أكبر من الصفر.",
};
