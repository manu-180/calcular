import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Savings goal calculator",
    title: tituloQueEntre(`Savings goal calculator for ${ctx.nombrePais}`, `Savings goal in ${ctx.nombrePais}`, "Savings goal calculator"),
    description: "Find out how much to save each month to reach the amount you need by your deadline, counting what you have and what your savings earn.",
    intro: [
      "A trip, a car, a deposit on a home or a cushion for surprises. A goal with an amount and a date is much easier to hit.",
      "Enter how much you want to save and in how many months. We tell you how much to set aside each month and each week.",
    ],
    comoSeCalcula: [
      "First it works out how much your current savings will grow by the end of the period.",
      "What is still missing is split into equal monthly deposits.",
      "If your savings earn interest, each deposit earns too, so you need to put in a little less.",
    ],
    ejemplo: [
      `To save ${m(meta)} in 24 months with no interest, you need ${m(meta / 24)} a month.`,
      `With ${m(actual)} already saved and a 5% annual return, ${m(aporteNecesario(meta, actual, 24, 5))} a month is enough.`,
    ],
    faq: [
      {
        pregunta: "How do I stick to the goal?",
        respuesta: "Move the money as soon as you get paid, before you spend on anything else. If you can, set up an automatic transfer to a separate account.",
      },
      {
        pregunta: "What if the monthly amount is too high?",
        respuesta: "Give yourself more time or lower the goal. You can also start with what you can afford and raise it when your income goes up.",
      },
      {
        pregunta: "Should I count inflation?",
        respuesta: "If the goal is several years away, add expected inflation to the amount. What costs 100 today may cost quite a bit more when you get there.",
      },
    ],
    glosario: [
      { termino: "Deposit", definicion: "The money you set aside each month for the goal." },
      { termino: "Return", definicion: "What your savings earn in an account or investment." },
    ],
  };
};
