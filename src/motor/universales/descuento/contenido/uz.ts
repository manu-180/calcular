import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Chegirma kalkulyatori",
    title: tituloQueEntre(`Chegirma kalkulyatori: ${ctx.nombrePais}`, "Chegirma kalkulyatori", "Chegirma hisoblash"),
    description: "Chegirmali narxni va qancha tejashingizni hisoblang. 30% ustiga yana 10% kabi ketma-ket chegirmalar ham hisobga olinadi.",
    intro: [
      "Narx va chegirmani kiriting. Qancha toʻlashingiz va qancha tejashingiz darhol koʻrinadi.",
      "Aksiyada qoʻshimcha chegirma boʻlsa, uni ham kiriting: ketma-ket ikki chegirma hech qachon oddiy qoʻshilmaydi.",
    ],
    comoSeCalcula: [
      "Chegirmali narx = boshlangʻich narx × (1 − chegirma ÷ 100).",
      "Qoʻshimcha chegirma birinchi chegirmadan keyingi narxga qoʻllanadi.",
      "Tejaganingiz = boshlangʻich narx − chegirmali narx.",
    ],
    ejemplo: [
      `Narxi ${m(precio)} boʻlgan tovarga 25% chegirma berilsa, yangi narx: ${m(precio * 0.75)}.`,
      `Avval 30%, keyin yana 10% chegirma berilsa, narx ${m(precio * 0.7 * 0.9)} boʻladi. Bu jami 40% emas, 37% chegirma.`,
    ],
    faq: [
      {
        pregunta: "Chegirma qanday hisoblanadi?",
        respuesta: "Narxni chegirma foiziga koʻpaytiring va natijani yuzga boʻling. Bu tejaydigan summangiz. Uni narxdan ayirsangiz, toʻlaydigan summa chiqadi.",
      },
      {
        pregunta: "30% va 10% chegirma 40% chegirma bilan bir xilmi?",
        respuesta: "Yoʻq. Ikkinchi chegirma allaqachon arzonlashgan narxga qoʻllanadi, shuning uchun jami chegirma 37% boʻladi.",
      },
      {
        pregunta: "Chegirmali narxdan boshlangʻich narxni qanday topaman?",
        respuesta: `Chegirmali narxni (1 − chegirma ÷ 100) ifodasiga boʻling. Chegirma 25% boʻlsa, boʻluvchi: ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Chegirma", definicion: "Boshlangʻich narxdan kamaytiriladigan foiz." },
      { termino: "Umumiy chegirma", definicion: "Bir nechta chegirma qoʻllanganda jami tejaladigan foiz." },
    ],
  };
};
