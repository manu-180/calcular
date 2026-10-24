import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Sanaga kun qoʻshish kalkulyatori",
    title: tituloQueEntre(`Sanaga kun qoʻshish: ${ctx.nombrePais}`, "Sanaga kun qoʻshish kalkulyatori", "Sanaga kun qoʻshish"),
    description: "Sanaga kalendar yoki ish kunlarini qoʻshing yoki ayiring va qaysi kunga toʻgʻri kelishini koʻring. Muddat va toʻlov sanalari uchun qulay.",
    intro: [
      "Sanani, kunlar sonini va qoʻshish yoki ayirishni tanlang. Natija sanasi va hafta kuni koʻrinadi.",
      "Ish kunlari tanlansa, shanba va yakshanba tashlab ketiladi.",
    ],
    comoSeCalcula: [
      "Kalendar kunlarida har bir kiritilgan kun uchun kalendarda bir kun oldinga yuriladi.",
      "Ish kunlarida faqat dushanbadan jumagacha boʻlgan kunlar sanaladi. Boshlanish kunining oʻzi hisobga kirmaydi.",
      "Bayram kunlari chiqarib tashlanmaydi, chunki ular mamlakat va hududga qarab farq qiladi.",
    ],
    ejemplo: [
      `Boshlanish sanasi: ${f(inicio)}. 90 kalendar kuni qoʻshilsa, natija: ${f(mas90)}.`,
      `Shu sanaga 15 ish kuni qoʻshilsa, natija: ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Boshlanish kuni birinchi kun deb hisoblanadimi?",
        respuesta: "Yoʻq. Dushanbaga 1 kun qoʻshilsa, seshanba chiqadi. Koʻpchilik muddatlar shunday hisoblanadi.",
      },
      {
        pregunta: "Shanbadan boshlab ish kunlari qoʻshilsa-chi?",
        respuesta: "Birinchi ish kuni keyingi dushanba boʻladi. Shanbaga 1 ish kuni qoʻshilsa, dushanba chiqadi.",
      },
      {
        pregunta: "Kabisa yillari hisobga olinadimi?",
        respuesta: "Ha. Muddat 29-fevraldan oʻtsa, u ham bir kun sifatida sanaladi.",
      },
    ],
    glosario: [
      { termino: "Kalendar kunlari", definicion: "Kalendardagi barcha kunlar, birortasi ham tashlab ketilmaydi." },
      { termino: "Ish kunlari", definicion: "Bu kalkulyatorda dushanbadan jumagacha boʻlgan kunlar." },
    ],
  };
};
