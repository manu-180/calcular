import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kvadrat fut kalkulyatori" : "Kvadrat metr kalkulyatori",
    title: imperial
      ? tituloQueEntre(`Kvadrat fut kalkulyatori: ${ctx.nombrePais}`, "Kvadrat fut kalkulyatori")
      : tituloQueEntre(`Kvadrat metr kalkulyatori: ${ctx.nombrePais}`, "Kvadrat metrni hisoblash", "Kvadrat metr kalkulyatori"),
    description: "Xona, pol yoki yer uchastkasi maydonini hisoblang: toʻrtburchak, uchburchak va doira, beshtagacha shaklni qoʻshib.",
    intro: [
      "Shaklni tanlang va oʻlchamlarini kiriting. Joy oddiy toʻrtburchak boʻlmasa, uni qismlarga boʻling, kalkulyator ularni qoʻshib beradi.",
      imperial ? "Natija kvadrat metrda ham koʻrsatiladi." : "Natija kvadrat futda ham koʻrsatiladi.",
    ],
    comoSeCalcula: [
      "Toʻrtburchak: uzunlik × eni.",
      "Uchburchak: asos × balandlik ÷ 2.",
      `Doira: π × radius × radius, radius diametrning yarmi. 1 m² = ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L shaklidagi mehmonxonani 16 × 12 ft va 10 × 6 ft oʻlchamli ikki toʻrtburchakka boʻlish mumkin. Umumiy maydon: ${n(enL, 0)} ft².`
        : `L shaklidagi mehmonxonani 5 × 4 m va 3 × 2 m oʻlchamli ikki toʻrtburchakka boʻlish mumkin. Umumiy maydon: ${n(enL, 0)} m².`,
      `Diametri 2 ${u} boʻlgan dumaloq stol egallaydigan maydon: ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Xona maydonini kvadrat futda qanday hisoblayman?" : "Xona maydonini qanday hisoblayman?",
        respuesta: imperial
          ? "Uzunlik va enini futda oʻlchab, ularni koʻpaytiring. 12 × 10 ft xona maydoni 120 ft²."
          : "Uzunlik va enini metrda oʻlchab, ularni koʻpaytiring. 4 × 3 m xona maydoni 12 m².",
      },
      {
        pregunta: "Oʻlchamlarim duym yoki santimetrda boʻlsa-chi?",
        respuesta: `Avval ularni oʻtkazing: futga oʻtkazish uchun duymni 12 marta kichraytiring, metrga oʻtkazish uchun santimetrni 100 marta kichraytiring. 350 cm = ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Kvadrat metrni kvadrat futga qanday oʻtkazaman?",
        respuesta: `Kvadrat metrdagi qiymatni ${n(FT2_POR_M2)} soniga koʻpaytiring. 20 m² = ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadrat metr (m²)", definicion: "Har bir tomoni 1 metr boʻlgan kvadratning maydoni." },
      { termino: "Kvadrat fut (ft²)", definicion: "Har bir tomoni 1 fut boʻlgan kvadratning maydoni." },
    ],
  };
};
