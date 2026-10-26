import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Murakkab foiz kalkulyatori",
    title: tituloQueEntre(`Murakkab foiz kalkulyatori: ${ctx.nombrePais}`, `Murakkab foiz: ${ctx.nombrePais}`, "Murakkab foiz kalkulyatori"),
    description: "Murakkab foiz va har oylik toʻldirish bilan pulingiz qanday oʻsishini koʻring. Yakuniy summa, olingan foizlar va yillar boʻyicha jadval.",
    intro: [
      "Murakkab foizda hisoblangan foiz summaga qoʻshiladi va unga ham foiz hisoblana boshlaydi. Shuning uchun jamgʻarma tobora tezroq oʻsadi.",
      "Hozir qancha mablagʻingiz borligini, har oy qancha qoʻsha olishingizni, foiz stavkasi va yillar sonini kiriting. Yakuniy summani va uning qancha qismi foiz ekanini koʻrsatamiz.",
    ],
    comoSeCalcula: [
      "Yakuniy summa = boshlangʻich summa × (1 + i)^n + oylik toʻldirish × ((1 + i)^n − 1) ÷ i.",
      "Bu yerda i tanlangan kapitallashtirishga teng keladigan oylik stavka, n esa oylar soni.",
      "Har oylik toʻldirish oyning oxirida qoʻshiladi.",
    ],
    ejemplo: [
      `Boshlangʻich summa ${m(capital)}, har oy ${m(aporte)} qoʻshilsa va yillik stavka 7% boʻlsa, 10 yildan keyin summa ${m(a10)} boʻladi.`,
      `Yana 10 yil davom ettirsangiz, summa ${m(a20)} boʻladi. Ikkinchi oʻn yillik birinchisidan ancha koʻp foiz keltiradi.`,
    ],
    faq: [
      {
        pregunta: "Oddiy va murakkab foizning farqi nima?",
        respuesta:
          "Oddiy foiz har doim boshlangʻich summaga hisoblanadi. Murakkab foiz esa boshlangʻich summa va oldin hisoblangan foizlarning yigʻindisiga hisoblanadi.",
      },
      {
        pregunta: "72 qoidasi nima?",
        respuesta: "Pul necha yilda ikki baravar koʻpayishini tez topish usuli: 72 ni yillik stavkaga boʻling. Stavka 6% boʻlsa, pul taxminan 12 yilda ikki baravar oshadi.",
      },
      {
        pregunta: "Qaysi stavkani olish kerak?",
        respuesta:
          "Pulingizni qayerga qoʻyishingizga mos, real stavkani oling. Natijani bugungi pul qiymatida koʻrish uchun stavkadan kutilayotgan inflyatsiyani ayiring.",
      },
    ],
    glosario: [
      { termino: "Kapitallashtirish", definicion: "Hisoblangan foizning summaga qoʻshilishi." },
      { termino: "Murakkab foiz", definicion: "Summa va oldin hisoblangan foizlar yigʻindisiga hisoblanadigan foiz." },
    ],
  };
};
