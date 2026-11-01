import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Frilans narxi kalkulyatori",
    title: tituloQueEntre(
      `Frilans soatlik narxi kalkulyatori, ${ctx.nombrePais}`,
      `Frilans narxi kalkulyatori, ${ctx.nombrePais}`,
      "Frilans narxi kalkulyatori",
    ),
    description: "Topmoqchi boʻlgan daromad, xarajatlar, soliqlar, dam olish kunlari va haq olinadigan soatlar asosida frilanserning soatlik va kunlik narxini hisoblang.",
    intro: [
      "Frilanserlarning eng koʻp uchraydigan xatosi: xodim sifatida xohlagan maoshini 160 soatga boʻlish. Bunda soliqlar, xarajatlar, taʼtil va haq olinmaydigan barcha soatlar hisobga olinmaydi.",
      "Bu kalkulyator qoʻlingizga tegishini xohlagan summadan boshlaydi va unga yetish uchun qancha narx qoʻyish kerakligini aytadi.",
    ],
    comoSeCalcula: [
      "Kerakli tushum = qoʻlga tegadigan daromad ÷ (1 − soliq stavkasi) + ish xarajatlari.",
      "Ish kunlari = 52 hafta × haftadagi ish kunlari − dam olish kunlari.",
      "Yiliga haq olinadigan soatlar = ish kunlari × kuniga haq olinadigan soatlar.",
      "Soatlik narx = kerakli tushum ÷ yiliga haq olinadigan soatlar.",
    ],
    ejemplo: [
      `Yiliga qoʻlingizga ${m(ingreso)} tegishi uchun, ${m(gastos)} xarajat va 25 foiz soliq bilan, tushumingiz ${m(r.facturado)} boʻlishi kerak.`,
      `30 kun dam olish va haftada 25 soat haq olinadigan ish bilan bu yiliga ${formatearNumero(ctx, Math.round(r.horas))} soat degani. Narx: soatiga ${m(r.hora)} yoki kuniga ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Haftada necha soat uchun haq olish mumkin?",
        respuesta: "Ishlaganingizdan kamroq. Mijoz izlash, xatlar, hisob-fakturalar va oʻqish hech kim toʻlamaydigan vaqtni oladi. Odatda 40 soatdan 20 tadan 30 tagacha soat uchun haq olinadi.",
      },
      {
        pregunta: "Soatbay yoki loyiha uchun haq olgan maʼqulmi?",
        respuesta: "Ikkalasi ham boʻladi. Loyiha uchun narx qoʻysangiz ham, soatlarni taxmin qiling va shu narxga koʻpaytiring, shunda kam olib qoʻymaysiz.",
      },
      {
        pregunta: "Qanday soliq stavkasini olish kerak?",
        respuesta: "Bu mamlakatingiz va qanday roʻyxatdan oʻtganingizga bogʻliq. Daromad soligʻi va ijtimoiy toʻlovlarni qoʻshing. Aniq bilmasangiz, buxgalterdan soʻrang.",
      },
    ],
    glosario: [
      { termino: "Haq olinadigan soatlar", definicion: "Mijozdan haq oladigan ish soatlaringiz." },
      { termino: "Qoʻlga tegadigan daromad", definicion: "Soliqlar va ish xarajatlaridan keyin qoladigan summa." },
    ],
  };
};
