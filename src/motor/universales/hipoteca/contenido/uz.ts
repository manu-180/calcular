import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota20 = cuotaFrancesa(prestado, 7, 240);
  const cuota10 = cuotaFrancesa(prestado, 7, 120);
  return {
    h1: "Ipoteka kalkulyatori",
    title: tituloQueEntre(`Ipoteka kalkulyatori: ${ctx.nombrePais}, oylik toʻlov`, `Ipoteka kalkulyatori: ${ctx.nombrePais}`, "Ipoteka kalkulyatori: oylik toʻlov"),
    description: "Uy narxi, boshlangʻich toʻlov, stavka va muddatdan ipoteka boʻyicha oylik toʻlovni hisoblang. Jami foizlar va qarz har yili qanday kamayishini koʻring.",
    intro: [
      "Ipoteka koʻpchilik oilalar oladigan eng katta qarz. Bankka borishdan oldin barcha raqamlarni koʻrib chiqish foydali.",
      "Uy narxi, boshlangʻich toʻlov, foiz stavkasi va muddatni kiriting. Ipoteka bilan birga soliq yoki sugʻurta toʻlasangiz, ularni ham qoʻshing va haqiqiy oylik toʻlovni koʻring.",
    ],
    comoSeCalcula: [
      "Kredit summasi = uy narxi − boshlangʻich toʻlov.",
      "Oylik toʻlov annuitet usulida hisoblanadi: yillik stavka 12 ga boʻlinadi, muddat oylarda olinadi.",
      "Har yil uchun toʻlangan foizlar va asosiy qarz qoʻshiladi hamda qancha qarz qolgani koʻrsatiladi.",
    ],
    ejemplo: [
      `Uy narxi ${m(precio)}, boshlangʻich toʻlov 20% boʻlsa, kredit summasi ${m(prestado)} boʻladi. Yillik 7% stavka va 20 yil muddatda oylik toʻlov ${m(cuota20)} boʻladi.`,
      `20 yilda jami foizlar ${m(interesesTotales(prestado, 7, 240))} boʻladi. Muddat 10 yil boʻlsa, oylik toʻlov ${m(cuota10)} miqdorigacha oshadi, lekin jami foizlar ${m(interesesTotales(prestado, 7, 120))} miqdorigacha kamayadi.`,
    ],
    faq: [
      {
        pregunta: "Boshlangʻich toʻlov qancha boʻlishi kerak?",
        respuesta:
          "Bu bank va dasturga bogʻliq. Boshlangʻich toʻlov qancha katta boʻlsa, shuncha kam qarz olasiz, oylik toʻlov va foizlar ham kamroq boʻladi. Rasmiylashtirish xarajatlari uchun ham mablagʻ qoldiring.",
      },
      {
        pregunta: "Nega dastlabki yillarda qarz deyarli kamaymaydi?",
        respuesta:
          "Foiz qolgan qarzga hisoblanadi. Boshida qarz katta, shuning uchun har bir toʻlovning katta qismi foizga ketadi. Vaqt oʻtishi bilan bu nisbat oʻzgaradi.",
      },
      {
        pregunta: "Qisqa muddat yaxshiroqmi?",
        respuesta:
          "Kattaroq oylik toʻlovni koʻtara olsangiz, ha: foizlarni ancha kam toʻlaysiz. Aks holda uzoqroq muddat olib, imkon boʻlganda qoʻshimcha toʻlov qilish ham mumkin.",
      },
      {
        pregunta: "Oylik toʻlovim oʻzgarishi mumkinmi?",
        respuesta:
          "Qatʼiy stavkada oylik toʻlov oʻzgarmaydi. Oʻzgaruvchan stavkada u oʻzgarishi mumkin. Bu kalkulyator stavka butun muddat davomida bir xil qoladi deb hisoblaydi.",
      },
    ],
    glosario: [
      { termino: "Boshlangʻich toʻlov", definicion: "Uy narxining oʻz jamgʻarmangizdan toʻlanadigan qismi." },
      { termino: "Asosiy qarz", definicion: "Qarzga olingan va hali qaytarilishi kerak boʻlgan summa." },
      { termino: "Qolgan qarz", definicion: "Kredit boʻyicha hali toʻlanmagan summa." },
    ],
  };
};
