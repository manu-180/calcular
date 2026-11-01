import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Oilaviy byudjet kalkulyatori (50/30/20)",
    title: tituloQueEntre(`Byudjet kalkulyatori 50/30/20: ${ctx.nombrePais}`, `Byudjet kalkulyatori: ${ctx.nombrePais}`, "Byudjet kalkulyatori 50/30/20"),
    description: "Qoʻlga tegadigan oylik daromadingizni 50/30/20 qoidasi boʻyicha zarur xarajatlar, istaklar va jamgʻarmaga taqsimlang. Kerak boʻlsa, foizlarni oʻzgartiring.",
    intro: [
      "50/30/20 qoidasi oyni rejalashning oddiy usuli. Daromadning yarmi zarur narsalarga, 30% yoqtirgan narsalaringizga va 20% jamgʻarmaga ketadi.",
      "Qoʻlga tegadigan daromadingizni kiriting, har bir qismga qancha tushishini koʻrsatamiz. Vaziyatingiz boshqacha boʻlsa, masalan ijara qimmat boʻlsa, foizlarni moslang.",
    ],
    comoSeCalcula: ["Zarur xarajatlar = daromad × 50%.", "Istaklar = daromad × 30%.", "Jamgʻarma = daromad × 20%. Uchta foizning yigʻindisi 100% boʻlishi kerak."],
    ejemplo: [
      `Oylik daromad ${m(ingreso)} boʻlsa: zarur xarajatlarga ${m(ingreso * 0.5)}, istaklarga ${m(ingreso * 0.3)}, jamgʻarmaga ${m(ingreso * 0.2)}.`,
      `Bir yilda shu 20% jamgʻarma ${m(ingreso * 0.2 * 12)} boʻladi.`,
    ],
    faq: [
      {
        pregunta: "Nima zarur xarajat, nima istak hisoblanadi?",
        respuesta:
          "Zarur xarajatlar toʻlashingiz shart boʻlgan narsalar: uy-joy, asosiy oziq-ovqat, kommunal xizmatlar, transport, sogʻliq va qarzlar boʻyicha minimal toʻlovlar. Istaklar esa kerak boʻlsa voz kechish mumkin boʻlgan narsalar.",
      },
      {
        pregunta: "Zarur xarajatlar 50% dan oshsa-chi?",
        respuesta: "Bu koʻp uchraydi, ayniqsa ijara qimmat boʻlsa. 60/20/20 yoki 70/20/10 nisbatini sinab koʻring, lekin jamgʻarmani butunlay nolga tushirmang.",
      },
      {
        pregunta: "Qarz toʻlovlari jamgʻarma hisoblanadimi?",
        respuesta: "Minimal toʻlovlar zarur xarajatlarga kiradi. Qarzni ertaroq yopish uchun qoʻshimcha toʻlaganingiz jamgʻarma hisoblanadi, chunki u ham xuddi jamgʻarish kabi moliyaviy holatingizni yaxshilaydi.",
      },
    ],
    glosario: [
      { termino: "Qoʻlga tegadigan daromad", definicion: "Soliq va ushlanmalardan keyin olinadigan summa." },
      { termino: "50/30/20 qoidasi", definicion: "Daromadni zarur xarajatlar, istaklar va jamgʻarma oʻrtasida taqsimlash usuli." },
    ],
  };
};
