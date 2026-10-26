import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Proporsiya kalkulyatori",
    title: tituloQueEntre(`Proporsiya kalkulyatori: ${ctx.nombrePais}`, "Proporsiya kalkulyatori", "Proporsiya hisoblash"),
    description: "Toʻgʻri yoki teskari proporsiyani bir zumda yeching. Uchta qiymatni kiriting, toʻrtinchisi hisob bilan birga chiqadi.",
    intro: [
      "Proporsiya ikki miqdor birga oʻzgarganda va toʻrtta qiymatdan uchtasi maʼlum boʻlganda ishlatiladi.",
      "Toʻgʻri yoki teskari turini tanlang, A, B va C qiymatlarini kiriting, kalkulyator nomaʼlum X qiymatini topadi.",
    ],
    comoSeCalcula: [
      "Toʻgʻri proporsiya: X = B × C ÷ A. Ikkala miqdor birga oshganda ishlatiladi (kilogramm koʻp, narx ham koʻp).",
      "Teskari proporsiya: X = A × B ÷ C. Biri oshib, ikkinchisi kamayganda ishlatiladi (odam koʻp, kun kam).",
    ],
    ejemplo: [
      `3 kilogramm ${m(precio3)} tursa, 5 kilogramm ${m((precio3 * 5) / 3)} turadi.`,
      "4 kishi uyni 12 kunda boʻyasa, 6 kishi uni 8 kunda boʻyaydi.",
    ],
    faq: [
      {
        pregunta: "Proporsiya toʻgʻri yoki teskari ekanini qanday bilaman?",
        respuesta: "Bir miqdor oshganda ikkinchisi ham oshsa, proporsiya toʻgʻri. Biri oshganda ikkinchisi kamaysa, teskari.",
      },
      {
        pregunta: "Toʻgʻri proporsiya qoʻlda qanday yechiladi?",
        respuesta: `Diagonaldagi ikki maʼlum qiymatni koʻpaytiring va qolganiga boʻling. A = 3, B = 600 va C = 5 boʻlsa: 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Proporsiya bilan foiz hisoblasa boʻladimi?",
        respuesta: "Ha. 200 soni 100% boʻlsa, 50 soni 25% boʻladi. Bu A = 200, B = 100 va C = 50 boʻlgan toʻgʻri proporsiya.",
      },
    ],
    glosario: [
      { termino: "Toʻgʻri proporsiya", definicion: "Ikkala miqdor birga oshadi yoki birga kamayadi." },
      { termino: "Teskari proporsiya", definicion: "Bir miqdor oshganda ikkinchisi kamayadi." },
    ],
  };
};
