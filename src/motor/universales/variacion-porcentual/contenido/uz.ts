import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Foiz oʻzgarishi kalkulyatori",
    title: tituloQueEntre(`Foiz oʻzgarishi kalkulyatori: ${ctx.nombrePais}`, "Foiz oʻzgarishi kalkulyatori", "Foiz oʻzgarishi"),
    description: "Narx, ish haqi, savdo yoki istalgan qiymat necha foiz oshgani yoki kamayganini hisoblang. Farq va qaytish foizi ham koʻrsatiladi.",
    intro: [
      "Eski va yangi qiymatni kiriting. Necha foiz oshgan yoki kamaygani va ular orasidagi farq chiqadi.",
      "Qiymat oldingi holiga qaytishi uchun qancha oʻzgarishi kerakligi ham koʻrinadi. Bu deyarli hech qachon oʻsha foizning oʻzi boʻlmaydi.",
    ],
    comoSeCalcula: [
      "Foiz oʻzgarishi = (yangi qiymat − eski qiymat) ÷ eski qiymat × 100.",
      "Natija musbat boʻlsa, qiymat oshgan. Manfiy boʻlsa, kamaygan.",
      "Eski qiymat manfiy boʻlsa, uning moduliga boʻlinadi. Shunda ishora yaxshilanish yoki yomonlashishni toʻgʻri koʻrsatadi.",
    ],
    ejemplo: [
      `Avval ${m(antes)} turgan tovar endi ${m(despues)} turadi: narx 25% oshgan.`,
      "Eski narxga qaytishi uchun 25% emas, 20% arzonlashishi kerak.",
    ],
    faq: [
      {
        pregunta: "Foiz oshishi qanday hisoblanadi?",
        respuesta: "Yangi qiymatdan eskisini ayiring, eski qiymatga boʻling va natijani yuzga koʻpaytiring. Qiymat 80 edi va 100 boʻldi: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Foiz kamayishi qanday hisoblanadi?",
        respuesta: "Hisob xuddi shunday. Qiymat 100 edi va 80 boʻldi: −20 ÷ 100 × 100 = −20%, yaʼni qiymat 20% kamaygan.",
      },
      {
        pregunta: "Nega 25% oshish va 25% kamayish bir-birini qoplamaydi?",
        respuesta: "Har bir foiz boshqa asosdan olinadi. 80 soniga 25% qoʻshilsa, 100 boʻladi, lekin 100 sonidan 25% ayirilsa, 75 qoladi.",
      },
      {
        pregunta: "Foiz va foiz punkti oʻrtasida qanday farq bor?",
        respuesta: "Stavka avval 10% edi, endi 12%. Demak, u 2 foiz punktga oshgan. Foiz oʻzgarishi sifatida esa 20% oshgan.",
      },
    ],
    glosario: [
      { termino: "Foiz oʻzgarishi", definicion: "Qiymat boshlangʻich holatiga nisbatan necha foiz oʻzgargani." },
      { termino: "Foiz punkti", definicion: "Ikki foiz koʻrsatkichi orasidagi oddiy farq." },
    ],
  };
};
