import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const ponderado = (7 * 20 + 8 * 30 + 9 * 50) / 100;
  const simple = (7 + 8 + 9) / 3;
  return {
    h1: "Oʻrtacha qiymat kalkulyatori",
    title: tituloQueEntre(`Oʻrtacha qiymat kalkulyatori: ${ctx.nombrePais}`, "Oʻrtacha qiymat kalkulyatori", "Oʻrtacha baho hisoblash"),
    description: "Oʻrtacha bahoni oddiy yoki vaznli usulda hisoblang: 10 tagacha qiymat va har birining vazni (foiz, kredit yoki soni).",
    intro: [
      "Har bir bahoni va uning qancha hisoblanishini kiriting. Vaznli oʻrtacha va yonida oddiy oʻrtacha koʻrinadi.",
      "Maktab va oliygoh baholari uchun ham, baʼzi qiymatlar boshqalaridan koʻproq hisoblanadigan har qanday oʻrtacha uchun ham ishlaydi.",
    ],
    comoSeCalcula: [
      "Oddiy oʻrtacha (oʻrtacha arifmetik) = qiymatlar yigʻindisi ÷ qiymatlar soni.",
      "Vaznli oʻrtacha = (qiymat × vazn) koʻpaytmalari yigʻindisi ÷ vaznlar yigʻindisi.",
      "Vaznlar yigʻindisi 100 boʻlishi shart emas: hisob vaznlar jamiga boʻlinadi.",
    ],
    ejemplo: [
      `Vazni 20% boʻlgan 7, vazni 30% boʻlgan 8 va vazni 50% boʻlgan 9 bahosi bilan vaznli oʻrtacha: ${n(ponderado)}.`,
      `Shu uch bahoning oddiy oʻrtachasi: ${n(simple)}. 9 bahosi koʻproq hisoblangani uchun vaznli oʻrtacha yuqoriroq.`,
    ],
    faq: [
      {
        pregunta: "Vaznli oʻrtacha qanday hisoblanadi?",
        respuesta: "Har bir qiymatni uning vazniga koʻpaytiring, natijalarni qoʻshing va vaznlar yigʻindisiga boʻling.",
      },
      {
        pregunta: "Vaznlar yigʻindisi 100% boʻlmasa-chi?",
        respuesta: "Bu muammo emas. Bir fan 6 kredit, ikkinchisi 4 kredit boʻlsa, vazn sifatida 6 va 4 sonlarini kiriting. Hisob vaznlar jamiga boʻlinadi.",
      },
      {
        pregunta: "Oddiy va vaznli oʻrtacha oʻrtasida qanday farq bor?",
        respuesta: "Oddiy oʻrtachada har bir qiymat teng hisoblanadi. Vaznli oʻrtachada esa har biri oʻz vazniga qarab hisoblanadi.",
      },
    ],
    glosario: [
      { termino: "Vazn", definicion: "Qiymat yakuniy oʻrtachaga qanchalik taʼsir qilishi." },
      { termino: "Vaznli oʻrtacha", definicion: "Har bir qiymat oʻz vazniga koʻpaytirilib hisoblanadigan oʻrtacha." },
    ],
  };
};
