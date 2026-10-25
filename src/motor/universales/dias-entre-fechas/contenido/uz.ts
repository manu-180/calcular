import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Ikki sana orasidagi kunlar kalkulyatori",
    title: tituloQueEntre(`Sanalar orasidagi kunlar: ${ctx.nombrePais}`, "Ikki sana orasidagi kunlarni hisoblash", "Sanalar orasidagi kunlar"),
    description: "Ikki sana orasidagi kunlarni hisoblang: kalendar kunlari, haftalar, oylar va dushanbadan jumagacha boʻlgan ish kunlari.",
    intro: [
      "Boshlanish va tugash sanasini tanlang. Kalendar kunlari, shu muddat haftalarda va oylarda hamda ish kunlari koʻrinadi.",
      "Muddatlar, toʻlov sanalari, taʼtil, homiladorlik yoki teskari sanoq uchun foydalaning.",
    ],
    comoSeCalcula: [
      "Kalendar kunlari ikki sana orasidagi barcha kunlardir. Boshlanish kuni hisobga kiradi, tugash kuni esa belgilamasangiz kirmaydi.",
      "Ish kunlari shu muddatdagi dushanbadan jumagacha boʻlgan kunlardir. Bayram kunlari chiqarib tashlanmaydi.",
      "Kabisa yillari 29-fevral bilan hisoblanadi.",
    ],
    ejemplo: [
      `Boshlanish sanasi: ${f(desde)}, tugash sanasi: ${f(hasta)}. Oraliqda ${formatearNumero(ctx, dias)} kalendar kuni bor.`,
      `Ulardan ${formatearNumero(ctx, habiles)} kun dushanbadan jumagacha toʻgʻri keladi.`,
    ],
    faq: [
      {
        pregunta: "Birinchi kun hisoblanadimi yoki oxirgisi?",
        respuesta: "Odatda birinchi kun hisobga kiradi, oxirgisi kirmaydi, xuddi ikki sanani ayirgandagidek. Ikkalasi ham kerak boʻlsa, «Tugash kunini ham hisoblash» belgisini qoʻying.",
      },
      {
        pregunta: "Ish kunlaridan bayramlar chiqariladimi?",
        respuesta: "Yoʻq. Dushanbadan jumagacha boʻlgan kunlar sanaladi. Bayramlar mamlakat, hudud va yilga qarab oʻzgaradi, ularni alohida ayiring.",
      },
      {
        pregunta: "Bir yilda necha kun bor?",
        respuesta: "365 kun, kabisa yilida esa 366 kun. Shuning uchun turli yillardagi bir xil ikki sana orasidagi kunlar soni farq qilishi mumkin.",
      },
    ],
    glosario: [
      { termino: "Kalendar kunlari", definicion: "Kalendardagi barcha kunlar, dam olish va bayram kunlari bilan birga." },
      { termino: "Ish kunlari", definicion: "Bu kalkulyatorda dushanbadan jumagacha boʻlgan kunlar." },
    ],
  };
};
