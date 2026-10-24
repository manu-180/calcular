import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Ish soatlari kalkulyatori",
    title: tituloQueEntre(`Ish soatlari kalkulyatori, ${ctx.nombrePais}`, `Ish soatlari hisobi, ${ctx.nombrePais}`, "Ish soatlari kalkulyatori"),
    description: "Ish boshlanishi, tugashi va tanaffuslar asosida haftada ishlagan soatlaringizni qoʻshing va qoʻshimcha ish bilan birga ish haqingizni hisoblang.",
    intro: [
      "Har bir kun uchun ish boshlanishi va tugash vaqtini, haq toʻlanmaydigan tanaffusni va soatlik ish haqingizni tanlang. Jami soatlar, qoʻshimcha ish va haftalik ish haqingizni koʻrsatamiz.",
      "Ish haqingizni tekshirish, ish vaqti jadvalini toʻldirish yoki soatbay ishga hisob yozish uchun foydalaning.",
    ],
    comoSeCalcula: [
      "Kunlik soatlar = tugash vaqti − boshlanish vaqti − tanaffus. Tugash vaqti boshlanishdan oldin boʻlsa, smena ertasi kuni tugagan hisoblanadi.",
      "Qoʻshimcha ish = haftalik jami − oddiy soatlar, agar jami ulardan oshsa.",
      "Ish haqi = oddiy soatlar × soatlik haq + qoʻshimcha soatlar × soatlik haq × (1 + ustama).",
    ],
    ejemplo: [
      `Ish boshlanishi ${hora("09:00")}, tugashi ${hora("17:30")} va tanaffus 30 daqiqa boʻlsa, kuniga ${n(jornada)} soat chiqadi. Dushanbadan jumagacha jami ${n(jornada * 5)} soat. Soatiga ${m(pago)} hisobida bu ${m(jornada * 5 * pago)} degani.`,
      `Ish boshlanishi ${hora("08:00")}, tugashi ${hora("18:00")} va tanaffus bir soat boʻlsa, haftada ${n(larga * 5)} soat chiqadi, ulardan ${n(extra)} soati qoʻshimcha ish. Bir yarim baravar stavkada jami haq: ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Ishlangan soatlar qanday hisoblanadi?",
        respuesta: "Tugash vaqtidan boshlanish vaqtini ayiring va tanaffusni chegirib tashlang. Keyin haftaning barcha kunlarini qoʻshing.",
      },
      {
        pregunta: "Daqiqalarni soatning oʻnli kasriga qanday aylantirish mumkin?",
        respuesta: `Daqiqalarni oltmishga boʻling. Yarim soat: ${n(0.5, 1)}; 15 daqiqa: ${n(0.25, 2)}; 45 daqiqa: ${n(0.75, 2)}. Demak, 7 soat 45 daqiqa ${n(7.75, 2)} soatga teng.`,
      },
      {
        pregunta: "Qancha qoʻshimcha ishlash mumkin va u qanday toʻlanadi?",
        respuesta: "Bu ishlayotgan joyingizdagi qonun va mehnat shartnomangizga bogʻliq. Kalkulyator biror aniq qoidani qoʻllamasdan, siz kiritgan ustama va oddiy soatlardan foydalanadi.",
      },
    ],
    glosario: [
      { termino: "Qoʻshimcha ish", definicion: "Oddiy ish soatlaridan ortiq ishlangan va yuqoriroq stavkada toʻlanadigan soatlar." },
      { termino: "Bir yarim baravar stavka", definicion: "Oddiy haqning bir yarim baravari, yaʼni 50 foiz ustama bilan toʻlanadigan qoʻshimcha ish." },
    ],
  };
};
