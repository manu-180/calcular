import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Ish haqi oshishi kalkulyatori",
    title: tituloQueEntre(`Ish haqi oshishi kalkulyatori, ${ctx.nombrePais}`, `Ish haqi oshishi, ${ctx.nombrePais}`, "Ish haqi oshishi kalkulyatori"),
    description: "Oshirishdan keyingi yangi maoshingizni, oylik va yillik farqni hisoblang hamda real oshirish inflyatsiyadan oʻzib ketganini bilib oling.",
    intro: [
      "Sizga maosh oshirishni taklif qilishdi yoki siz uni soʻramoqchisiz. Maoshingizni va oshirishni foizda yoki summada kiriting, har oy va har yili qancha oʻzgarishini koʻring.",
      "Shu davrdagi inflyatsiyani qoʻshing, xarid qobiliyatingiz haqiqatan oshganini yoki faqat yetib olganingizni aytamiz.",
    ],
    comoSeCalcula: [
      "Yangi maosh = hozirgi maosh × (1 + oshirish ÷ 100).",
      "Yillik farq = oylik farq × yiliga maosh toʻlovlari soni.",
      "Real oshirish = (1 + oshirish) ÷ (1 + inflyatsiya) − 1.",
    ],
    ejemplo: [
      `Oyiga ${m(sueldo)} maosh 5 foiz oshirilsa, ${m(sueldo * 1.05)} boʻladi: oyiga ${m(sueldo * 0.05)} va yiliga ${m(sueldo * 0.05 * 12)} koʻproq.`,
      `Agar shu davrda inflyatsiya 3 foiz boʻlgan boʻlsa, real oshirish: ${p(aumentoReal(5, 3))}. Inflyatsiya 6 foiz boʻlsa: ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Real oshirish nima?",
        respuesta: "Bu inflyatsiyani hisobga olgandagi oshirish. U yangi maoshingiz bilan avvalgidan koʻp yoki kam narsa sotib olishingizni koʻrsatadi.",
      },
      {
        pregunta: "Nega oshirishdan inflyatsiyani shunchaki ayirib boʻlmaydi?",
        respuesta: `Chunki ikki foiz qoʻshilmaydi, balki koʻpaytiriladi. 5 foiz oshirish va 3 foiz inflyatsiyada real oshirish 2 foiz emas, ${p(aumentoReal(5, 3))}. Inflyatsiya yuqori boʻlsa, farq ancha kattalashadi.`,
      },
      {
        pregunta: "Qancha oshirish soʻrash kerak?",
        respuesta: "Orqada qolmaslik uchun kamida oxirgi oshirishdan beri boʻlgan inflyatsiya miqdorida. Undan tashqari, boshqa ish beruvchilar shunday lavozimga qancha toʻlashi va ishingiz qanchalik kengayganiga qarang.",
      },
    ],
    glosario: [
      { termino: "Nominal oshirish", definicion: "Inflyatsiyani hisobga olmasdan, hisob varaqangizda koʻrinadigan oshirish." },
      { termino: "Xarid qobiliyati", definicion: "Maoshingizga sotib olish mumkin boʻlgan narsalar miqdori." },
    ],
  };
};
