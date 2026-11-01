import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Soatlik ish haqi kalkulyatori",
    title: tituloQueEntre(`Soatlik ish haqi kalkulyatori, ${ctx.nombrePais}`, `Soatlik ish haqi, ${ctx.nombrePais}`, "Soatlik ish haqi kalkulyatori"),
    description: "Ish haqingizni haqiqiy ish soatlari va haftalari asosida soatlik, kunlik, haftalik, yarim oylik, oylik va yillik koʻrinishga oʻtkazing.",
    intro: [
      "Maoshingiz bir soatga qancha toʻgʻri keladi? Soatlik taklif yiliga qancha boʻladi? Summani kiriting, davrni tanlang, qolganlarini koʻrsatamiz.",
      "Ish takliflarini solishtirish, qoʻshimcha ish soatlariga narx qoʻyish yoki vaqtingiz qanchaga tushishini bilish uchun foydalaning.",
    ],
    comoSeCalcula: [
      "Avval hamma narsa yillik summaga aylantiriladi.",
      "Soatlik = yillik ÷ (haftadagi soatlar × haq toʻlanadigan haftalar).",
      "Kunlik = yillik ÷ (haftadagi kunlar × haq toʻlanadigan haftalar). Haftalik = yillik ÷ haq toʻlanadigan haftalar.",
      "Oylik = yillik ÷ 12. Yarim oylik = yillik ÷ 24.",
    ],
    ejemplo: [
      `Haftada 40 soat ishlab, yiliga ${m(anual)} oladigan kishi uchun bu soatiga ${m(anual / 2080)} va oyiga ${m(anual / 12)} degani.`,
      `Toʻliq stavkada soatiga ${m(hora)} taklifi yiliga ${m(hora * 2080)} boʻladi.`,
    ],
    faq: [
      {
        pregunta: "Bir yilda necha ish soati bor?",
        respuesta: `Haftada 40 soat va 52 ta haq toʻlanadigan haftada ${formatearNumero(ctx, 2080)} soat. Shuning uchun tez hisoblashda soatlik narx taxminan ${formatearNumero(ctx, 2000)} soniga koʻpaytiriladi.`,
      },
      {
        pregunta: "Nega haftalik ish haqini toʻrtga koʻpaytirganda oylik chiqmaydi?",
        respuesta: `Chunki oʻrtacha bir oyda toʻrt emas, ${formatearNumero(ctx, 52 / 12, 2)} hafta bor. Haftalikdan oylikka oʻtish uchun ellik ikkiga koʻpaytiring va oʻn ikkiga boʻling.`,
      },
      {
        pregunta: "Mukofotlar yoki soliqlar hisobga olinadimi?",
        respuesta: "Yoʻq. Kalkulyator bir xil summani davrlar orasida oʻtkazadi. Mukofot olsangiz, takliflarni solishtirayotganda uni alohida qoʻshing.",
      },
    ],
    glosario: [
      { termino: "Hisoblangan ish haqi", definicion: "Soliqlar va ushlanmalar ayirilishidan oldingi ish haqi." },
      { termino: "Yarim oylik", definicion: "Oyiga ikki marta, yiliga 24 marta toʻlanadigan ish haqi." },
    ],
  };
};
