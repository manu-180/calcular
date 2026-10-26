import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Pensiya jamgʻarmasi kalkulyatori",
    title: tituloQueEntre(`Pensiya jamgʻarmasi kalkulyatori: ${ctx.nombrePais}`, `Pensiya jamgʻarmasi: ${ctx.nombrePais}`, "Pensiya jamgʻarmasi kalkulyatori"),
    description: "Har oylik badallar bilan pensiyaga qancha jamgʻarishingiz va u qancha oylik daromad berishini bugungi pul qiymatida koʻring.",
    intro: [
      "Davlat pensiyasi koʻpincha odatiy turmush darajasini saqlashga yetmaydi. Shaxsiy jamgʻarma, hatto kichik boʻlsa ham, erta boshlansa katta farq qiladi.",
      "Yoshingizni, qachon pensiyaga chiqmoqchi ekaningizni, hozir qancha mablagʻingiz borligini va har oy qancha qoʻsha olishingizni kiriting. Pensiyaga chiqqandagi jamgʻarmani va undan har oy qancha olishingiz mumkinligini koʻrsatamiz.",
    ],
    comoSeCalcula: [
      "Jamgʻarma har oy real daromadlilik bilan oʻsadi, yaʼni daromadlilikdan inflyatsiya ayirilgan. Shuning uchun natija bugungi pul qiymatida chiqadi.",
      "Pensiyaga chiqqanda jamgʻarma siz tanlagan yillar davomida teng oylik summalarda toʻlanadi. Qolgan qismi bu orada daromad keltirishda davom etadi.",
      "Davlat pensiyasi, soliqlar va investitsiya komissiyalari hisobga olinmaydi.",
    ],
    ejemplo: [
      `30 yoshda ${m(actual)} jamgʻarmangiz boʻlsa va har oy ${m(aporte)} qoʻysangiz, 4% real daromadlilikda 65 yoshga kelib jamgʻarma ${m(capital30)} boʻladi. Bu 25 yil davomida har oy ${m(rentaMensual(capital30, 4, 25))} beradi.`,
      `Xuddi shu raqamlar bilan 40 yoshda boshlasangiz, jamgʻarma ${m(capital40)} boʻladi. Oʻn yil katta farq qiladi.`,
    ],
    faq: [
      {
        pregunta: "Real daromadlilik nima?",
        respuesta: "Bu investitsiyaning inflyatsiyadan keyingi daromadi. Investitsiya 7% daromad keltirsa va inflyatsiya 3% boʻlsa, real daromadlilik taxminan 4% boʻladi.",
      },
      {
        pregunta: "Bu davlat pensiyasining oʻrnini bosadimi?",
        respuesta: "Yoʻq. Bu davlat pensiyasi yoki ish joyidagi dasturga qoʻshimcha shaxsiy jamgʻarmangiz. Davlat pensiyangizni taxmin qilish uchun mamlakatingizdagi tegishli idoraga murojaat qiling.",
      },
      {
        pregunta: "Pensiya uchun qancha jamgʻarish kerak?",
        respuesta: "Yagona javob yoʻq. Koʻp tavsiya qilinadigan qoida daromadning 10% dan 15% gacha. Eng muhimi, iloji boricha erta boshlash.",
      },
    ],
    glosario: [
      { termino: "Real daromadlilik", definicion: "Investitsiyaning inflyatsiyadan yuqori daromadi." },
      { termino: "Bugungi pul qiymati", definicion: "Kelajakdagi summa bugun nimaga yetishi boʻyicha ifodalanadi." },
    ],
  };
};
