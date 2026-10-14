import { formatearNumero, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "APR to APY calculator",
    title: `APR to APY calculator for ${ctx.nombrePais}`,
    description: "Convert a nominal annual rate (APR) to an effective annual rate (APY) and back, with monthly, quarterly, semiannual or daily compounding.",
    intro: [
      "Two offers with the same rate can cost different amounts. The difference is how often interest is charged or paid.",
      "The effective annual rate puts everything on the same footing: it is what you really pay or earn in a year. Pick the rate you have and we show you the other one.",
    ],
    comoSeCalcula: [
      "APY = (1 + APR ÷ m) to the power of m, minus 1. Here m is the number of compounding periods per year: 12 for monthly, 4 for quarterly.",
      "APR = m × ((1 + APY) to the power of 1 ÷ m, minus 1).",
      "The rate per period is the APR divided by m.",
    ],
    ejemplo: [
      `An APR of 12% compounded monthly is an APY of ${p(aEfectiva(12, 12))}.`,
      `An APY of 10% is an APR of ${p(aNominal(10, 12))} when interest compounds every month.`,
    ],
    faq: [
      {
        pregunta: "What is the difference between APR and APY?",
        respuesta:
          "APR is the yearly rate before compounding. APY includes the effect of interest earning interest. That is why APY is always equal to or higher than APR.",
      },
      {
        pregunta: "Which one should I use to compare offers?",
        respuesta:
          "APY for savings, because it shows what you really earn. For loans, compare the effective rate and also the total cost with fees included.",
      },
      {
        pregunta: "Why does more frequent compounding raise the effective rate?",
        respuesta:
          "Interest is added to the balance sooner and starts earning interest of its own. With yearly compounding, APR and APY are the same.",
      },
    ],
    glosario: [
      { termino: "APR", definicion: "The nominal annual rate, before compounding." },
      { termino: "APY", definicion: "The effective annual rate, with compounding included." },
      { termino: "Compounding", definicion: "When interest is added to the balance." },
    ],
  };
};
