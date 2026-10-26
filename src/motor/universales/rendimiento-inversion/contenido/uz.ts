import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Investitsiya daromadi kalkulyatori",
    title: tituloQueEntre(
      `Investitsiya daromadi kalkulyatori (ROI va CAGR), ${ctx.nombrePais}`,
      `Investitsiya daromadi kalkulyatori, ${ctx.nombrePais}`,
      "Investitsiya daromadi kalkulyatori",
    ),
    description: "Kiritgan summangiz, bugungi qiymat va oʻtgan yillar asosida investitsiyaning umumiy (ROI) va yillik (CAGR) daromadliligini hisoblang.",
    intro: [
      "50 foiz foyda yaxshi eshitiladi, lekin 2 yilda va 10 yilda olingan foyda bir xil emas. Investitsiyalarni solishtirish uchun yillik daromadlilikka qarash kerak.",
      "Qancha kiritganingizni, bugun qancha turishini va necha yil oʻtganini kiriting. Umumiy daromadlilik va murakkab yillik daromadlilikni koʻrsatamiz.",
    ],
    comoSeCalcula: [
      "ROI = (yakuniy qiymat + olingan daromad − kiritilgan summa) ÷ kiritilgan summa × 100.",
      "CAGR = ((yakuniy qiymat + olingan daromad) ÷ kiritilgan summa), (1 ÷ yillar) darajaga koʻtarilgan, minus 1.",
      "CAGR murakkab yillik stavka: har yili takrorlansa, xuddi shu natijani beradigan stavka.",
    ],
    ejemplo: [
      `${m(inicial)} kiritib, oxirida ${m(final)} olsangiz, foyda ${m(final - inicial)} boʻladi. ROI: ${p(roi(inicial, final))}.`,
      `Agar bu 5 yil davom etgan boʻlsa, yillik daromadlilik: ${p(cagr(inicial, final, 5))}. Agar 2 yil davom etgan boʻlsa: ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "ROI va CAGR oʻrtasida qanday farq bor?",
        respuesta: "ROI muddatdan qatʼi nazar, kiritilgan summaga nisbatan umumiy foyda. CAGR esa uni yillarga taqsimlaydi, shuning uchun turli muddatli investitsiyalarni solishtirish mumkin.",
      },
      {
        pregunta: "Nega yillik daromadlilik umumiy foydani yillar soniga boʻlish emas?",
        respuesta: `Chunki har yilgi foyda balansga qoʻshiladi va u ham daromad keltiradi. 5 yilda 50 foiz foyda yiliga 10 foiz emas, murakkab foiz bilan ${p(cagr(1, 1.5, 5))} degani.`,
      },
      {
        pregunta: "Olingan dividend yoki foizlarni qanday hisoblash kerak?",
        respuesta: "Ularni yechib olgan boʻlsangiz, «olingan daromad» maydoniga yozing. Qayta investitsiya qilgan boʻlsangiz, ular yakuniy qiymatga allaqachon kirgan.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Investitsiya daromadliligi: kiritilgan summaga nisbatan umumiy foyda, foizda." },
      { termino: "CAGR", definicion: "Murakkab yillik oʻsish surʼati: murakkab foizni hisobga olgan oʻrtacha yillik daromadlilik." },
    ],
  };
};
