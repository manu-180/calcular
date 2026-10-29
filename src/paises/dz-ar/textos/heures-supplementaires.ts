import { definirTextos } from "@/motor/edicion";
import heuresSupplementaires from "../../dz/calculadoras/heures-supplementaires";

const PLAFOND = /^La loi limite les heures supplémentaires à ([\d,]+) % de la durée légale, soit ([\d,]+) heures par semaine\.$/;

export default definirTextos(heuresSupplementaires, {
  calculadora: "dz-ar.heures-supplementaires",
  slug: "heures-supplementaires",
  campos: {
    mensuel: { etiqueta: "الأجر الشهري الإجمالي" },
    heures: { etiqueta: "الساعات الإضافية المنجزة في الشهر" },
    majoration: {
      etiqueta: "نسبة الزيادة المطبقة",
      ayuda: "اتركها فارغة لتطبيق الحد الأدنى القانوني. قد تنص اتفاقيتك الجماعية على نسبة أعلى.",
    },
  },
  filas: {
    total: { etiqueta: "المبلغ الإجمالي للساعات الإضافية" },
    horaire: { etiqueta: "الأجر الساعي العادي" },
    base: { etiqueta: "أجر الساعات بالمعدل العادي" },
    majoration: { etiqueta: "الزيادة" },
    taux: { etiqueta: "نسبة الزيادة" },
  },
  mensajes: {
    "Indiquez un salaire mensuel supérieur à zéro.": "أدخل أجرًا شهريًا أكبر من الصفر.",
    "La majoration ne peut pas être inférieure au minimum légal.": "لا يمكن أن تقل الزيادة عن الحد الأدنى القانوني.",
  },
  traducir: (t) => {
    const m = PLAFOND.exec(t);
    return m ? `يحدد القانون الساعات الإضافية بنسبة ${m[1]} % من المدة القانونية، أي ${m[2]} ساعات في الأسبوع.` : undefined;
  },
});
