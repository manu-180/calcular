import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Xarajatlarni boʻlish kalkulyatori",
    title: tituloQueEntre(`Xarajatlarni boʻlish: ${ctx.nombrePais}`, "Xarajatlarni boʻlish kalkulyatori", "Xarajatlarni boʻlish"),
    description: "Umumiy xarajatni 8 kishigacha boʻling: har bir kishining ulushi va kim kimga qancha toʻlashi, eng kam oʻtkazma bilan.",
    intro: [
      "Sayohat, kechki ovqat, bayram yoki birgalikdagi ijara uchun qulay: har kim har xil summa toʻlagan boʻlsa ham.",
      "Har bir kishi qancha toʻlaganini kiriting. Har bir ulush va hisobni yopadigan oʻtkazmalar koʻrinadi.",
    ],
    comoSeCalcula: [
      "Ulush = jami xarajat ÷ kishilar soni.",
      "Ulushidan kam toʻlagan kishi farqni toʻlashi kerak. Koʻp toʻlagan kishi farqni qaytarib oladi.",
      "Oʻtkazmalar eng katta qarzdan eng katta haqdorga qarab tuziladi, shuning uchun ortiqcha oʻtkazma boʻlmaydi.",
    ],
    ejemplo: [
      `Aziz ${m(a)} toʻladi, Botir ${m(b)} toʻladi, Dilnoza esa hech narsa toʻlamadi. Jami: ${m(a + b)}, har bir ulush: ${m(cuota)}.`,
      `Dilnoza Azizga ${m(cuota)} toʻlaydi, Botir esa Azizga ${m(cuota - b)} toʻlaydi.`,
    ],
    faq: [
      {
        pregunta: "Har kim har xil toʻlagan boʻlsa, hisob qanday boʻlinadi?",
        respuesta: "Hamma xarajatni qoʻshing, kishilar soniga boʻling va har bir kishi toʻlagan summa bilan solishtiring. Farq uning qarzi yoki haqi boʻladi.",
      },
      {
        pregunta: "Kimdir hech narsa toʻlamagan boʻlsa-chi?",
        respuesta: "Unga 0 yozing, shunda u ham boʻlishda hisobga olinadi. Maydonni boʻsh qoldirsangiz, u hisobdan chiqariladi.",
      },
      {
        pregunta: "Nega oʻtkazmalar kishilar sonidan kam?",
        respuesta: "Qarzlar guruhlanadi: eng koʻp qarzdor eng koʻp toʻlagan kishiga toʻlaydi va hokazo. Oʻtkazmalar hech qachon kishilar sonidan bitta kamdan oshmaydi.",
      },
    ],
    glosario: [
      { termino: "Ulush", definicion: "Umumiy xarajatdan har bir kishiga toʻgʻri keladigan qism." },
      { termino: "Qoldiq", definicion: "Kishi toʻlagan summa bilan uning ulushi orasidagi farq." },
    ],
  };
};
