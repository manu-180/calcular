import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "50/30/20 budget calculator",
    title: tituloQueEntre(`50/30/20 budget calculator for ${ctx.nombrePais}`, `50/30/20 budget in ${ctx.nombrePais}`, "50/30/20 budget calculator"),
    description: "Split your monthly take-home pay with the 50/30/20 rule: how much goes to needs, to wants and to savings. Change the percentages if you need to.",
    intro: [
      "The 50/30/20 rule is a simple way to plan your month. Half goes to essentials, 30% to things you enjoy and 20% to savings.",
      "Enter your take-home pay and we show how much goes to each part. If your situation is different, for example high rent, adjust the percentages.",
    ],
    comoSeCalcula: ["Needs = income × 50%.", "Wants = income × 30%.", "Savings = income × 20%. The three percentages have to add up to 100%."],
    ejemplo: [
      `On ${m(ingreso)} a month: ${m(ingreso * 0.5)} for needs, ${m(ingreso * 0.3)} for wants and ${m(ingreso * 0.2)} for savings.`,
      `Over a year, that 20% adds up to ${m(ingreso * 0.2 * 12)} saved.`,
    ],
    faq: [
      {
        pregunta: "What counts as a need and what as a want?",
        respuesta:
          "Needs are bills you must pay: housing, basic groceries, utilities, transport, health and minimum debt payments. Wants are things you could cut if you had to.",
      },
      {
        pregunta: "What if my needs are more than 50%?",
        respuesta: "That is common, especially with high rent. Try 60/20/20 or 70/20/10 and avoid cutting savings to zero.",
      },
      {
        pregunta: "Do debt payments count as savings?",
        respuesta: "Minimum payments go under needs. Anything extra you pay to clear a debt sooner counts as savings, because it improves your net worth just like saving.",
      },
    ],
    glosario: [
      { termino: "Take-home pay", definicion: "What you receive after taxes and deductions." },
      { termino: "50/30/20 rule", definicion: "A way to split income between needs, wants and savings." },
    ],
  };
};
