import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Compound interest calculator",
    title: `Compound interest calculator for ${ctx.nombrePais}`,
    description: "See how your money grows with compound interest and monthly contributions. Get the final balance, interest earned and a year by year table.",
    intro: [
      "With compound interest, the interest is added to your balance and starts earning interest of its own. That is why savings grow faster and faster.",
      "Enter what you have today, what you can add each month, the rate and the number of years. We show the final balance and how much of it is interest.",
    ],
    comoSeCalcula: [
      "Final balance = amount × (1 + i) to the power of n + contribution × ((1 + i) to the power of n − 1) ÷ i.",
      "Here i is the monthly rate equivalent to the compounding you chose, and n is the number of months.",
      "Contributions are added at the end of each month.",
    ],
    ejemplo: [
      `Starting with ${m(capital)} and adding ${m(aporte)} a month at 7% a year, you reach ${m(a10)} in 10 years.`,
      `Keep going another 10 years and the balance reaches ${m(a20)}. The second decade earns far more than the first.`,
    ],
    faq: [
      {
        pregunta: "What is the difference between simple and compound interest?",
        respuesta:
          "Simple interest is always worked out on the original amount. Compound interest is worked out on the amount plus the interest already earned.",
      },
      {
        pregunta: "What is the rule of 72?",
        respuesta: "A shortcut to see how long money takes to double: divide 72 by the annual rate. At 6%, it doubles in about 12 years.",
      },
      {
        pregunta: "Which rate should I use?",
        respuesta:
          "One that is realistic for what you will do with the money. To see the result in today's money, use the rate minus expected inflation.",
      },
    ],
    glosario: [
      { termino: "Compounding", definicion: "When interest is added to the balance." },
      { termino: "Compound interest", definicion: "Interest worked out on the balance plus the interest already earned." },
    ],
  };
};
