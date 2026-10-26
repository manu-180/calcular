import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Jamgʻarma kalkulyatori",
    title: tituloQueEntre(`Jamgʻarma kalkulyatori: ${ctx.nombrePais}, oylik summa`, `Jamgʻarma kalkulyatori: ${ctx.nombrePais}`, "Jamgʻarma kalkulyatori"),
    description: "Hozirgi mablagʻingiz va jamgʻarma daromadini hisobga olib, kerakli summaga muddatida yetish uchun har oy qancha jamgʻarish kerakligini bilib oling.",
    intro: [
      "Sayohat, avtomobil, uy uchun boshlangʻich toʻlov yoki kutilmagan holatlar uchun zaxira. Summasi va muddati aniq maqsadga yetish ancha oson.",
      "Qancha jamgʻarmoqchi ekaningizni va necha oyda ekanini kiriting. Har oy va har hafta qancha ajratish kerakligini aytamiz.",
    ],
    comoSeCalcula: [
      "Avval hozirgi jamgʻarmangiz muddat oxirigacha qancha oʻsishi hisoblanadi.",
      "Yetmayotgan summa teng oylik badallarga boʻlinadi.",
      "Jamgʻarmangizga foiz hisoblansa, har bir badal ham daromad keltiradi, shuning uchun biroz kamroq qoʻyish kifoya.",
    ],
    ejemplo: [
      `Foizsiz 24 oyda ${m(meta)} jamgʻarish uchun har oy ${m(meta / 24)} kerak.`,
      `Allaqachon ${m(actual)} jamgʻargan boʻlsangiz va yillik daromad 5% boʻlsa, har oy ${m(aporteNecesario(meta, actual, 24, 5))} yetarli.`,
    ],
    faq: [
      {
        pregunta: "Maqsaddan chalgʻimaslik uchun nima qilish kerak?",
        respuesta: "Maosh tushishi bilan, boshqa xarajatlardan oldin pulni alohida ajrating. Imkoni boʻlsa, alohida hisob raqamiga avtomatik oʻtkazma sozlang.",
      },
      {
        pregunta: "Oylik summa juda katta chiqsa-chi?",
        respuesta: "Muddatni uzaytiring yoki maqsad summasini kamaytiring. Qoʻlingizdan kelganidan boshlab, daromadingiz oshganda summani koʻpaytirishingiz ham mumkin.",
      },
      {
        pregunta: "Inflyatsiyani hisobga olish kerakmi?",
        respuesta: "Maqsad bir necha yildan keyin boʻlsa, summaga kutilayotgan inflyatsiyani qoʻshing. Bugungi narxlar maqsadga yetguningizcha ancha oshishi mumkin.",
      },
    ],
    glosario: [
      { termino: "Badal", definicion: "Maqsad uchun har oy ajratadigan pulingiz." },
      { termino: "Daromad", definicion: "Jamgʻarmangiz hisob raqami, omonat yoki investitsiyada keltiradigan foyda." },
    ],
  };
};
