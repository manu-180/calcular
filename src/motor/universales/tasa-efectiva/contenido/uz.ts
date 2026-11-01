import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Samarali foiz stavkasi kalkulyatori",
    title: tituloQueEntre(`Samarali foiz stavkasi: ${ctx.nombrePais}, hisoblash`, `Samarali foiz stavkasi: ${ctx.nombrePais}`, "Samarali foiz stavkasi kalkulyatori"),
    description: "Yillik nominal foiz stavkasini samarali stavkaga va aksincha oʻtkazing. Oylik, choraklik, yarim yillik yoki kunlik kapitallashtirish bilan.",
    intro: [
      "Bir xil stavkali ikki taklif har xil qimmatga tushishi mumkin. Farq foiz qanchalik tez-tez hisoblanishi yoki toʻlanishida.",
      "Yillik samarali stavka hammasini bir xil oʻlchovga keltiradi: bu bir yilda haqiqatda qancha toʻlashingiz yoki olishingiz. Qoʻlingizdagi stavkani tanlang, ikkinchisini biz koʻrsatamiz.",
    ],
    comoSeCalcula: [
      "Samarali stavka = (1 + nominal stavka ÷ m)^m − 1. Bu yerda m yildagi kapitallashtirishlar soni: har oy boʻlsa 12, har chorakda boʻlsa 4.",
      "Nominal stavka = m × ((1 + samarali stavka)^(1 ÷ m) − 1).",
      "Bir davr uchun stavka nominal stavkani m ga boʻlib topiladi.",
    ],
    ejemplo: [
      `Har oy kapitallashtiriladigan yillik 12% nominal stavka samarali stavkada ${p(aEfectiva(12, 12))} boʻladi.`,
      `Foiz har oy qoʻshilsa, yillik 10% samarali stavka nominal stavkada ${p(aNominal(10, 12))} boʻladi.`,
    ],
    faq: [
      {
        pregunta: "Nominal va samarali foiz stavkasining farqi nima?",
        respuesta:
          "Nominal stavka kapitallashtirishsiz yillik stavka. Samarali stavka foizga ham foiz hisoblanishini oʻz ichiga oladi. Shuning uchun samarali stavka hech qachon nominaldan past boʻlmaydi.",
      },
      {
        pregunta: "Takliflarni solishtirishda qaysi birini olish kerak?",
        respuesta:
          "Omonatlarda samarali stavkani oling, chunki u haqiqatda qancha olishingizni koʻrsatadi. Kreditlarda samarali stavka bilan birga komissiyalar qoʻshilgan umumiy qiymatni ham solishtiring.",
      },
      {
        pregunta: "Nega tez-tez kapitallashtirish samarali stavkani oshiradi?",
        respuesta:
          "Foiz summaga ertaroq qoʻshiladi va unga ham foiz hisoblana boshlaydi. Foiz yiliga bir marta qoʻshilsa, nominal va samarali stavka teng boʻladi.",
      },
    ],
    glosario: [
      { termino: "Nominal foiz stavkasi", definicion: "Kapitallashtirishni hisobga olmagan yillik stavka." },
      { termino: "Samarali foiz stavkasi", definicion: "Kapitallashtirish hisobga olingan yillik stavka." },
      { termino: "Kapitallashtirish", definicion: "Hisoblangan foizning asosiy summaga qoʻshilishi." },
    ],
  };
};
