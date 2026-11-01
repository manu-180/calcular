import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Foiz hisoblash",
    title: tituloQueEntre(`Foiz hisoblash: ${ctx.nombrePais}`, "Foiz hisoblash kalkulyatori", "Foiz hisoblash"),
    description: "Sonning foizini, bir son ikkinchisining necha foizi ekanini va foiz qoʻshilgan yoki ayirilgan natijani tez hisoblang.",
    intro: [
      "Nimani bilmoqchi ekaningizni tanlang va ikki sonni kiriting. Natija darhol chiqadi.",
      "Kundalik hayotdagi toʻrtta foiz hisobi bir joyda: sonning foizi, ulush, oshish va kamayish.",
    ],
    comoSeCalcula: [
      "Y sonining X foizi = Y × X ÷ 100.",
      "X soni Y sonining necha foizi = X ÷ Y × 100.",
      "Y soniga X foiz qoʻshish = Y × (1 + X ÷ 100). Y sonidan X foiz ayirish = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      "200 sonining 15 foizi: 30.",
      "30 soni 120 sonining 25 foizini tashkil qiladi.",
      `Narxi ${m(precio)} boʻlgan tovar 10% qimmatlashsa, yangi narx: ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Sonning foizi qanday hisoblanadi?",
        respuesta: "Sonni foiz qiymatiga koʻpaytiring va natijani yuzga boʻling. Masalan, 350 sonining 20 foizi: 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Bir son ikkinchisining necha foizi ekanini qanday topaman?",
        respuesta: "Qismni butunga boʻling va natijani yuzga koʻpaytiring. 60 ta savoldan 45 tasiga toʻgʻri javob bergan boʻlsangiz: 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Narxga foiz qanday qoʻshiladi?",
        respuesta: `Narxni 1 va foizning oʻnli kasr koʻrinishi yigʻindisiga koʻpaytiring. 10% qoʻshish uchun koʻpaytiruvchi: ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "10% oshib, keyin 10% kamaysa, qiymat oldingi holiga qaytadimi?",
        respuesta: "Yoʻq. 100 soniga 10% qoʻshilsa, 110 hosil boʻladi. 110 sonidan 10% ayirilsa, 99 qoladi. Kamayish kattaroq songa nisbatan hisoblanadi.",
      },
    ],
    glosario: [
      { termino: "Foiz", definicion: "Butunning yuzdan bir qismlarida ifodalangan miqdor." },
      { termino: "Asos", definicion: "Foiz olinadigan son (bu kalkulyatorda Y)." },
    ],
  };
};
