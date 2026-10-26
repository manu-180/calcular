import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { GRAMATICA } from "../../../i18n/gramatica";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `QQS kalkulyatori, ${ctx.nombrePais}`,
    title: tituloQueEntre(`QQS kalkulyatori (${tasa}), ${ctx.nombrePais}`, `QQS ${tasa}, ${ctx.nombrePais}`, `QQS kalkulyatori (${tasa})`),
    description: `Istalgan narxga ${tasa} stavkali QQSni bir qadamda qoʻshing yoki QQS bilan narxdan ajrating: QQSsiz narx, QQS summasi va jami, aniq hisob bilan.`,
    intro: [
      `Bu yerda ${GRAMATICA.uz.en(ctx.nombrePais)} qoʻllaniladigan umumiy QQS stavkasi: ${tasa}.`,
      "QQSsiz narxga QQS qoʻshmoqchimisiz yoki QQS bilan narxdan uni ajratmoqchimisiz, tanlang va summani kiriting.",
    ],
    comoSeCalcula: [
      "QQS qoʻshish: QQS = QQSsiz narx × stavka ÷ 100. Jami = QQSsiz narx + QQS.",
      "QQSni ajratish: QQSsiz narx = QQS bilan narx ÷ (1 + stavka ÷ 100). Farq QQS summasi boʻladi.",
      "Mahsulot yoki xizmatga pasaytirilgan stavka qoʻllansa, uni «Boshqa QQS stavkasi» maydoniga kiritishingiz mumkin.",
    ],
    ejemplo: [
      `QQSsiz narxi ${precio} boʻlgan mahsulotga QQS qoʻshish uchun narxni ${tasa} stavkaga koʻpaytiring va natijani narxga qoʻshing.`,
      `Jami ${precio} boʻlgan QQS bilan narx ichidagi QQSni topish uchun jamini bir plyus stavkaga boʻling va farqni oling.`,
    ],
    faq: [
      {
        pregunta: "QQS bilan narxdan QQS qanday ajratiladi?",
        respuesta: "Narxni bir plyus oʻnli kasr koʻrinishidagi stavkaga boʻling. Qolgan summa QQSsiz narx, farq esa QQS summasi.",
      },
      {
        pregunta: "Nega jami summadan foizni shunchaki ayirib boʻlmaydi?",
        respuesta: "Chunki QQS jami summadan kichikroq boʻlgan QQSsiz narxdan hisoblangan. Foizni jami summadan ayirsangiz, ortiqcha ayirib yuborasiz.",
      },
      {
        pregunta: `Hamma narsaga ${tasa} stavkali QQS qoʻllaniladimi?`,
        respuesta: "Har doim emas. Baʼzi oziq-ovqat, dori-darmon yoki xizmatlarga pasaytirilgan stavka qoʻllaniladi yoki ular QQSdan ozod qilinadi. Bunday holda «Boshqa QQS stavkasi» maydonidan foydalaning.",
      },
    ],
    glosario: [
      { termino: "QQS", definicion: "Qoʻshilgan qiymat soligʻi. Tovar va xizmatlar narxiga qoʻshiladigan soliq." },
      { termino: "QQSsiz narx", definicion: "QQS qoʻshilishidan oldingi narx; soliq shu summadan hisoblanadi." },
    ],
  };
};
