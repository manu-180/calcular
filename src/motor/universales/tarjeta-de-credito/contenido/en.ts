import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Credit card payoff calculator",
    title: tituloQueEntre(`Credit card payoff calculator for ${ctx.nombrePais}`, `Credit card payoff in ${ctx.nombrePais}`, "Credit card payoff calculator"),
    description: "Find out how many months it takes to pay off your credit card and how much interest you pay, with a fixed payment or the minimum.",
    intro: [
      "A credit card is usually the most expensive debt you have. Paying only the minimum stretches it out for years and piles on interest.",
      "Enter the balance, the APR and what you can pay each month. We show when you will be done, the interest you pay and the plan month by month.",
    ],
    comoSeCalcula: [
      "Each month, interest is added: balance × APR ÷ 12.",
      "Then the payment is taken off. With the minimum, the payment is a percentage of what you owe, with a floor.",
      "This repeats until the balance reaches zero. If the payment is not more than the interest, the debt never goes down.",
    ],
    ejemplo: [
      `A balance of ${m(saldo)} at 22% APR, paying ${m(fijo)} a month, is paid off in ${conFijo.meses} months with ${m(conFijo.intereses)} in interest.`,
      `Paying only a 3% minimum takes ${conMinimo.meses} months and the interest rises to ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "What happens if I only pay the minimum?",
        respuesta:
          "The minimum shrinks as the balance shrinks, so you pay less each month and the debt drags on for years. If you can, pay a higher fixed amount, even a little more.",
      },
      {
        pregunta: "Should I move the balance to a personal loan?",
        respuesta: "If the loan rate is well below the card's APR, it usually pays off. Compare the total interest of both options, fees included.",
      },
      {
        pregunta: "Which card should I pay off first?",
        respuesta: "Pay the minimum on all of them and put the rest on the one with the highest APR. That way you pay the least interest overall.",
      },
    ],
    glosario: [
      { termino: "Minimum payment", definicion: "The least you can pay in a month without a late fee. It does not clear the debt." },
      { termino: "APR", definicion: "The annual rate the card charges on the balance you carry." },
    ],
  };
};
