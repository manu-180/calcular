import { contenidoArabe } from "../../comun/arabe";
import { pluralAr } from "../../../i18n/arabe";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { DIAS_AR, duracionAr } from "../../dias-entre-fechas/textos/ar";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "حاسبة العمر",
    title: tituloQueEntre(`حاسبة العمر في ${ctx.nombrePais}`, "حاسبة العمر بالسنوات والأشهر والأيام", "حاسبة العمر"),
    description: "احسب عمرك بالضبط بالسنوات والأشهر والأيام، وعدد الأيام التي عشتها، والمدة الباقية على عيد ميلادك القادم.",
    intro: [
      "أدخل تاريخ ميلادك، فترى عمرك بالضبط اليوم، وكذلك بالأشهر والأسابيع والأيام.",
      "غيّر التاريخ الثاني لتعرف عمر شخص في يوم معين، أو العمر الذي سيبلغه.",
    ],
    comoSeCalcula: [
      "تحسب الأشهر الكاملة من الميلاد حتى التاريخ المختار، وكل 12 شهرًا سنة واحدة.",
      "الأيام الباقية بعد آخر شهر كامل هي أيام العمر.",
      "السنوات الكبيسة تُحتسب بأيامها الـ366.",
    ],
    ejemplo: [
      `من وُلد في ${fechaLarga(ctx.locale, nac)} كان عمره في ${fechaLarga(ctx.locale, ref)}: ${duracionAr(Math.floor(meses / 12), meses % 12, dias)}.`,
      `أي ما مجموعه ${pluralAr(total, DIAS_AR, formatearNumero(ctx, total))}.`,
    ],
    faq: [
      {
        pregunta: "كيف يُحسب العمر بالضبط؟",
        respuesta: "تُحسب السنوات الكاملة أولًا، ثم الأشهر الكاملة منذ آخر عيد ميلاد، ثم الأيام الباقية.",
      },
      {
        pregunta: "ماذا عن المولودين في 29 فبراير؟",
        respuesta: "في السنوات غير الكبيسة تعتمد هذه الحاسبة يوم 28 فبراير عيدًا للميلاد. وبعض القوانين تعتمد يوم 1 مارس بدلًا منه.",
      },
      {
        pregunta: "كم يومًا عشت حتى الآن؟",
        respuesta: "انظر إلى صف «بالأيام». فهو يعدّ كل الأيام من الميلاد حتى التاريخ المختار، دون احتساب ذلك اليوم الأخير.",
      },
    ],
    glosario: [
      { termino: "العمر", definicion: "عدد السنوات الكاملة منذ الميلاد." },
      { termino: "السنة الكبيسة", definicion: "سنة من 366 يومًا فيها يوم 29 فبراير. تأتي كل أربع سنوات، باستثناء بعض سنوات رأس القرن." },
    ],
  };
});
