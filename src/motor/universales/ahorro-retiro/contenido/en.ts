import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Retirement savings calculator",
    title: `Retirement savings calculator for ${ctx.nombrePais}`,
    description: "See how much you could build for retirement with monthly contributions and what monthly income it would give you, in today's money.",
    intro: [
      "A state pension often is not enough to keep your standard of living. Savings of your own, even small ones, make a big difference if you start early.",
      "Enter your age, when you want to retire, what you have and what you can add each month. We show your savings at retirement and how much you could draw from them each month.",
    ],
    comoSeCalcula: [
      "Savings grow each month at the real return, which is the return minus inflation. That keeps the result in today's money.",
      "At retirement, the savings are paid out in equal monthly amounts over the years you choose. What is left keeps earning meanwhile.",
      "State pensions, taxes and investment fees are not included.",
    ],
    ejemplo: [
      `With ${m(actual)} saved at 30 and ${m(aporte)} a month at a 4% real return, you reach ${m(capital30)} by 65. That pays ${m(rentaMensual(capital30, 4, 25))} a month for 25 years.`,
      `Start at 40 with the same numbers and you reach ${m(capital40)}. Ten years make a big difference.`,
    ],
    faq: [
      {
        pregunta: "What is a real return?",
        respuesta: "It is what an investment earns after inflation. If an investment earns 7% and inflation is 3%, the real return is about 4%.",
      },
      {
        pregunta: "Does this replace my state pension?",
        respuesta: "No. These are your own savings on top of any state pension or workplace plan. To estimate your state pension, check with the agency in your country.",
      },
      {
        pregunta: "How much should I save for retirement?",
        respuesta: "There is no single number. A common rule of thumb is 10% to 15% of what you earn. The most important thing is to start as early as you can.",
      },
    ],
    glosario: [
      { termino: "Real return", definicion: "What an investment earns above inflation." },
      { termino: "Today's money", definicion: "A future amount expressed as what it would buy today." },
    ],
  };
};
