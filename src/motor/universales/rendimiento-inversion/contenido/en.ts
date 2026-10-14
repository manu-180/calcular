import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "ROI calculator",
    title: `ROI and CAGR calculator for ${ctx.nombrePais}`,
    description: "Work out the total return (ROI) and the annual return (CAGR) of an investment from what you put in, what it is worth now and how many years passed.",
    intro: [
      "A 50% gain sounds great, but it is not the same over 2 years as over 10. To compare investments you need the return per year.",
      "Enter what you invested, what it is worth today and how many years have passed. We show the total return and the compound annual return.",
    ],
    comoSeCalcula: [
      "ROI = (final value + income received − amount invested) ÷ amount invested × 100.",
      "CAGR = ((final value + income received) ÷ amount invested) to the power of (1 ÷ years), minus 1.",
      "CAGR is the compound annual rate: the one that gives the same result if it repeats every year.",
    ],
    ejemplo: [
      `Investing ${m(inicial)} and ending with ${m(final)} is a gain of ${m(final - inicial)}: an ROI of ${p(roi(inicial, final))}.`,
      `If it took 5 years, the annual return is ${p(cagr(inicial, final, 5))}. If it took 2 years, ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "What is the difference between ROI and CAGR?",
        respuesta: "ROI is the total gain on what you invested, regardless of time. CAGR spreads it per year, so you can compare investments of different lengths.",
      },
      {
        pregunta: "Why isn't the annual return just the total divided by the years?",
        respuesta: `Because each year's gains are added to the balance and earn too. A 50% gain over 5 years is ${p(cagr(1, 1.5, 5))} compounded per year, not 10%.`,
      },
      {
        pregunta: "How do I count dividends or interest I received?",
        respuesta: "Add them under income received if you took them out. If you reinvested them, they are already in the final value.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment: the total gain as a percentage of what you put in." },
      { termino: "CAGR", definicion: "Compound annual growth rate: the average yearly return, with compounding." },
    ],
  };
};
