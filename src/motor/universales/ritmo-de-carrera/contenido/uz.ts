import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mil" : "kilometr";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Yugurish tempi kalkulyatori",
    title: tituloQueEntre(`Yugurish tempi kalkulyatori: ${ctx.nombrePais}`, "Yugurish tempi kalkulyatori", "Yugurish tempi"),
    description: `Har bir ${u} uchun tempingizni, marra vaqtingizni yoki masofani hisoblang: 5 km, 10 km, yarim marafon va marafon uchun.`,
    intro: [
      "Uchta koʻrsatkichdan (masofa, vaqt va temp) ikkitasini kiritsangiz, uchinchisi chiqadi. Musobaqani rejalashtirish yoki mashgʻulotni tekshirish uchun qulay.",
      "5 km, 10 km, yarim marafon va marafon masofalari tayyor holda berilgan.",
    ],
    comoSeCalcula: [
      `Temp = vaqt ÷ masofa, har bir ${u} uchun daqiqa va soniyalarda.`,
      "Vaqt = temp × masofa.",
      "Masofa = vaqt ÷ temp. Oʻrtacha tezlik masofaning soatlarga boʻlinganidir.",
    ],
    ejemplo: imperial
      ? [
          `3 mil 27 daqiqada yugurilsa, temp har mil uchun 9:00, tezlik ${formatearNumero(ctx, 20 / 3, 2)} mph boʻladi.`,
          `Yarim marafon (${formatearNumero(ctx, media, 2)} ${corto}) har mil uchun ${ritmoTexto(ritmoMedia)} tempda yugurilsa, marra vaqti: ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km 50 daqiqada yugurilsa, temp har km uchun 5:00, tezlik 12 km/soat boʻladi.",
          `Yarim marafon (${formatearNumero(ctx, media, 1)} ${corto}) har km uchun ${ritmoTexto(ritmoMedia)} tempda yugurilsa, marra vaqti: ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Har bir ${u} uchun tempimni qanday hisoblayman?`,
        respuesta: imperial
          ? `Vaqtni daqiqalarga aylantiring va millar soniga boʻling. 3 mil 28 daqiqa 30 soniyada yugurilsa, har mil uchun ${formatearNumero(ctx, 9.5, 1)} daqiqa, yaʼni 9:30 chiqadi.`
          : `Vaqtni daqiqalarga aylantiring va kilometrlar soniga boʻling. 10 km 55 daqiqada yugurilsa, har km uchun ${formatearNumero(ctx, 5.5, 1)} daqiqa, yaʼni 5:30 chiqadi.`,
      },
      {
        pregunta: "Yangi boshlovchi uchun qanday temp yaxshi?",
        respuesta: "Yugurayotganda bemalol gaplasha oladigan temp. Chidamlilik oshgani sari bu temp ham tezlashadi.",
      },
      {
        pregunta: "Marafon masofasi qancha?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mil). Yarim marafon buning yarmi.`,
      },
    ],
    glosario: [
      { termino: "Temp", definicion: "Bir kilometr yoki bir milni bosib oʻtish uchun ketadigan vaqt." },
      { termino: "Oʻrtacha tezlik", definicion: "Bir soatda bosib oʻtilgan masofa." },
    ],
  };
};
