import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionUz } from "../../dias-entre-fechas/textos/uz";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Yosh kalkulyatori",
    title: tituloQueEntre(`Yosh kalkulyatori: ${ctx.nombrePais}`, "Yosh kalkulyatori", "Yoshni hisoblash"),
    description: "Aniq yoshingizni yil, oy va kunlarda hisoblang: necha kun yashaganingiz va keyingi tugʻilgan kuningizgacha qancha qolgani.",
    intro: [
      "Tugʻilgan sanangizni kiriting. Bugungi aniq yoshingiz oylarda, haftalarda va kunlarda ham koʻrinadi.",
      "Ikkinchi sanani oʻzgartirsangiz, kishining istalgan kundagi yoshini yoki kelajakda necha yoshda boʻlishini bilasiz.",
    ],
    comoSeCalcula: [
      "Tugʻilgan kundan tanlangan sanagacha boʻlgan toʻliq oylar sanaladi. Har 12 oy bir yilni tashkil qiladi.",
      "Oxirgi toʻliq oydan keyin qolgan kunlar yoshning kunlari boʻladi.",
      "Kabisa yillari 366 kun bilan hisoblanadi.",
    ],
    ejemplo: [
      `Tugʻilgan sana: ${fechaLarga(ctx.locale, nac)}. Hisob sanasi: ${fechaLarga(ctx.locale, ref)}. Yosh: ${duracionUz(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Bu ${formatearNumero(ctx, total)} kun degani.`,
    ],
    faq: [
      {
        pregunta: "Aniq yosh qanday hisoblanadi?",
        respuesta: "Avval toʻliq yillar, keyin oxirgi tugʻilgan kundan beri oʻtgan toʻliq oylar, soʻngra qolgan kunlar sanaladi.",
      },
      {
        pregunta: "29-fevralda tugʻilganlar-chi?",
        respuesta: "Kabisa boʻlmagan yillarda bu kalkulyator tugʻilgan kunni 28-fevral deb oladi. Baʼzi qonunlarda buning oʻrniga 1-mart olinadi.",
      },
      {
        pregunta: "Men necha kun yashadim?",
        respuesta: "«Kunlarda» qatoriga qarang. Unda tugʻilgan kuningizdan tanlangan sanagacha boʻlgan barcha kunlar sanaladi, oxirgi kun hisobga kirmaydi.",
      },
    ],
    glosario: [
      { termino: "Yosh", definicion: "Tugʻilgandan beri oʻtgan toʻliq yillar soni." },
      { termino: "Kabisa yili", definicion: "29-fevrali bor 366 kunlik yil. Har toʻrt yilda keladi, baʼzi asr yillari bundan mustasno." },
    ],
  };
};
