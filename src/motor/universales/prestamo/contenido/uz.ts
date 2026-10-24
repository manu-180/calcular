import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kredit kalkulyatori",
    title: tituloQueEntre(`Kredit kalkulyatori: ${ctx.nombrePais}, oylik toʻlov va foiz`, `Kredit kalkulyatori: ${ctx.nombrePais}`, "Kredit kalkulyatori: oylik toʻlov va foiz"),
    description: "Kreditingiz boʻyicha oylik toʻlov, jami foizlar va toʻlov jadvalini hisoblang. Qoʻshimcha toʻlov qancha foizni tejashini koʻring.",
    intro: [
      "Kredit shartnomasini imzolashdan oldin ikki raqam muhim: har oy qancha toʻlaysiz va kredit sizga foizlar bilan qanchaga tushadi.",
      "Kredit summasi, yillik foiz stavkasi va muddatni kiriting. Har oy biroz koʻproq toʻlamoqchi boʻlsangiz, qoʻshimcha toʻlovni ham yozing va kreditni qancha ertaroq yopishingizni koʻring.",
    ],
    comoSeCalcula: [
      "Hisob annuitet usulida, yaʼni teng oylik toʻlovlar bilan qilinadi. Isteʼmol, avtokredit va ipoteka kreditlarida eng koʻp ishlatiladigan usul shu.",
      "Oylik foiz stavkasi = yillik foiz stavkasi ÷ 12.",
      "Oylik toʻlov = kredit summasi × oylik stavka ÷ (1 − (1 + oylik stavka)^(−toʻlovlar soni)).",
      "Har oy foiz qolgan qarzga hisoblanadi. Toʻlovning qolgan qismi asosiy qarzni kamaytiradi.",
    ],
    ejemplo: [
      `Kredit summasi ${m(monto)}, yillik stavka 12% va muddat 36 oy boʻlsa, oylik toʻlov ${m(cuota36)} boʻladi. Jami foizlar: ${m(interesesTotales(monto, 12, 36))}.`,
      `Muddatni 60 oyga uzaytirsangiz, oylik toʻlov ${m(cuota60)} miqdorigacha kamayadi, lekin jami foizlar ${m(interesesTotales(monto, 12, 60))} miqdorigacha oshadi.`,
    ],
    faq: [
      {
        pregunta: "Kredit boʻyicha oylik toʻlov qanday hisoblanadi?",
        respuesta:
          "Annuitet formulasi bilan. Barcha toʻlovlar bir xil, lekin birinchi toʻlovlarning katta qismi foiz, oxirgilarining katta qismi esa asosiy qarz. Shuning uchun qarz boshida sekin kamayadi.",
      },
      {
        pregunta: "Kreditni muddatidan oldin yopish foydalimi?",
        respuesta:
          "Muddatidan oldin yopish uchun katta jarima boʻlmasa, odatda ha. Qoʻshimcha toʻlov toʻgʻridan toʻgʻri asosiy qarzga ketadi va unga endi foiz hisoblanmaydi. Qancha erta toʻlasangiz, shuncha koʻp tejaysiz.",
      },
      {
        pregunta: "Uzoq muddat yaxshiroqmi?",
        respuesta: "Oylik toʻlov kamayadi, lekin jami foizlar ancha koʻp boʻladi. Qaror qilishdan oldin ikkala raqamni ham solishtiring.",
      },
      {
        pregunta: "Nega bank boshqa oylik toʻlov koʻrsatadi?",
        respuesta:
          "Banklar koʻpincha sugʻurta, komissiya yoki soliqlarni qoʻshadi yoki eʼlon qilinganidan boshqa stavkani ishlatadi. Takliflarni faqat foiz stavkasi boʻyicha emas, umumiy qiymati boʻyicha solishtiring.",
      },
    ],
    glosario: [
      { termino: "Asosiy qarz", definicion: "Qarzning hali qaytarilmagan qismi." },
      { termino: "Yillik nominal foiz stavkasi", definicion: "Har oyning foizini topish uchun 12 ga boʻlinadigan yillik stavka." },
      { termino: "Kredit muddati", definicion: "Kredit qaytariladigan vaqt, oylarda." },
    ],
  };
};
