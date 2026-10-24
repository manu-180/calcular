import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Räkna ut avkastning (ROI och CAGR)",
    title: tituloQueEntre(
      `Räkna ut avkastning: ROI och årlig avkastning | ${ctx.nombrePais}`,
      `Räkna ut avkastning | ${ctx.nombrePais}`,
      "Räkna ut avkastning",
    ),
    description: "Räkna ut total avkastning (ROI) och årlig avkastning (CAGR) på en investering utifrån insatsen, värdet i dag och antal år.",
    intro: [
      "En vinst på 50 % låter bra, men den betyder inte samma sak över 2 år som över 10. För att jämföra investeringar behöver du avkastningen per år.",
      "Fyll i vad du investerade, vad det är värt i dag och hur många år som har gått. Du ser den totala avkastningen och den årliga avkastningen med ränta på ränta.",
    ],
    comoSeCalcula: [
      "ROI = (slutvärde + utbetalningar − investerat belopp) ÷ investerat belopp × 100.",
      "CAGR = ((slutvärde + utbetalningar) ÷ investerat belopp) upphöjt till (1 ÷ antal år), minus 1.",
      "CAGR är den genomsnittliga årliga tillväxten med ränta på ränta, alltså den takt som ger samma resultat om den upprepas varje år.",
    ],
    ejemplo: [
      `Investerar du ${m(inicial)} och slutar med ${m(final)} är vinsten ${m(final - inicial)}. Det ger en ROI på ${p(roi(inicial, final))}.`,
      `Tog det 5 år blir den årliga avkastningen ${p(cagr(inicial, final, 5))}. Tog det 2 år blir den ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Vad är skillnaden mellan ROI och CAGR?",
        respuesta: "ROI är den totala vinsten på det du investerade, oavsett hur lång tid det tog. CAGR fördelar den per år, så att du kan jämföra investeringar med olika löptid.",
      },
      {
        pregunta: "Varför är den årliga avkastningen inte bara totalen delat med antal år?",
        respuesta: `Därför att varje års vinst läggs till kapitalet och också växer. En vinst på 50 % på 5 år motsvarar ${p(cagr(1, 1.5, 5))} per år med ränta på ränta, inte ${formatearCifra(ctx, 50 / 5)} %.`,
      },
      {
        pregunta: "Hur räknar jag med utdelningar eller ränta jag har fått?",
        respuesta: "Lägg in dem under utbetalningar om du tog ut pengarna. Om du återinvesterade dem finns de redan med i slutvärdet.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment, den totala vinsten i procent av det du satte in." },
      { termino: "CAGR", definicion: "Compound annual growth rate, den genomsnittliga årliga avkastningen med ränta på ränta." },
    ],
  };
};
