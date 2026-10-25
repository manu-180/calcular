import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Oddiy foiz kalkulyatori",
    title: tituloQueEntre(`Oddiy foiz kalkulyatori: ${ctx.nombrePais}`, `Oddiy foiz: ${ctx.nombrePais}`, "Oddiy foiz kalkulyatori"),
    description: "Asosiy summaga yillik stavka boʻyicha kunlar, oylar yoki yillar uchun oddiy foizni hisoblang. Yilni 365 yoki 360 kun deb tanlang va jami summani koʻring.",
    intro: [
      "Oddiy foiz har doim boshlangʻich asosiy summaga hisoblanadi: muddat davomida foiz summaga qoʻshilmaydi.",
      "U qisqa muddatli omonatlarda, odamlar orasidagi qarzlarda va koʻplab maktab masalalarida ishlatiladi.",
    ],
    comoSeCalcula: [
      "Foiz = asosiy summa × yillik stavka × yillardagi muddat.",
      "Muddat oylarda boʻlsa, 12 ga boʻlinadi. Kunlarda boʻlsa, bank qaysi yilni ishlatishiga qarab 365 yoki 360 ga boʻlinadi.",
      "Jami summa = asosiy summa + foiz.",
    ],
    ejemplo: [
      `Asosiy summa ${m(capital)}, yillik stavka 10% va muddat 6 oy boʻlsa, foiz ${m(capital * 0.1 * 0.5)} boʻladi.`,
      `Shu summa 90 kunga qoʻyilsa, 365 kunlik yilda foiz ${m((capital * 0.1 * 90) / 365)}, 360 kunlik yilda esa ${m((capital * 0.1 * 90) / 360)} boʻladi.`,
    ],
    faq: [
      {
        pregunta: "Oddiy foiz formulasi qanday?",
        respuesta: `I = P × r × t. P asosiy summa, r oʻnli kasr koʻrinishidagi yillik stavka (10% bu ${formatearNumero(ctx, 0.1, 2)}), t esa yillardagi muddat.`,
      },
      {
        pregunta: "Murakkab foizdan farqi nima?",
        respuesta: "Oddiy foiz har doim bir xil asosiy summaga hisoblanadi. Murakkab foizda esa foiz summaga qoʻshiladi va unga ham foiz hisoblanadi.",
      },
      {
        pregunta: "Nega baʼzi banklar yilni 360 kun deb oladi?",
        respuesta: "Bu hisobni osonlashtiradigan bank odati. 360 kunlik yilda foiz biroz koʻproq chiqadi. Bankingiz qaysi birini ishlatishini aniqlang.",
      },
    ],
    glosario: [
      { termino: "Asosiy summa", definicion: "Qarzga berilgan yoki qoʻyilgan pul." },
      { termino: "Bank yili", definicion: "Har bir oyi 30 kundan iborat, 360 kunlik yil." },
    ],
  };
};
