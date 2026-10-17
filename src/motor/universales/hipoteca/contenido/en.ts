import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";
import { entradaDeCasaEn } from "../../comun/locales";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  const entrada = entradaDeCasaEn(ctx.locale);
  const deposit = entrada === "deposit";
  return {
    h1: "Mortgage calculator",
    title: tituloQueEntre(`Mortgage calculator for ${ctx.nombrePais}`, `Mortgages in ${ctx.nombrePais}`, "Mortgage calculator"),
    description: `Work out your monthly mortgage payment from the price, ${entrada}, rate and term. See the total interest and how the balance falls each year.`,
    intro: [
      "A mortgage is the biggest debt most households ever take on. It pays to see the full numbers before you talk to a lender.",
      `Enter the price, your ${entrada}, the rate and the term. If you pay property tax or insurance with the mortgage, add it to see your real monthly payment.`,
    ],
    comoSeCalcula: [
      `Loan amount = home price − ${entrada}.`,
      "Fixed monthly payment using the annual rate divided by 12 and the term in months.",
      "For each year it adds up the interest and principal paid and shows what is still owed.",
    ],
    ejemplo: [
      `A home of ${m(precio)} with ${deposit ? "a 20% deposit" : "20% down"} leaves a loan of ${m(prestado)}. At 7% over 30 years, the payment is ${m(cuota30)}.`,
      `Over 30 years you pay ${m(interesesTotales(prestado, 7, 360))} in interest. Over 15 years the payment rises to ${m(cuota15)}, but interest drops to ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: deposit ? "How big a deposit do I need?" : "How much should I put down?",
        respuesta:
          `It depends on the lender and the country. The more you put down, the less you borrow, the lower the payment and the less interest you pay. Keep money aside for ${deposit ? "buying costs" : "closing costs"} too.`,
      },
      {
        pregunta: "Why does the balance barely drop in the first years?",
        respuesta:
          "Interest is charged on what you owe. Early on the balance is large, so most of each payment is interest. Over time that flips.",
      },
      {
        pregunta: "Is a shorter term better?",
        respuesta:
          "If you can afford the higher payment, yes: you pay far less interest. If not, a longer term with extra payments when you can also works.",
      },
      {
        pregunta: "Can my payment change?",
        respuesta:
          "With a fixed rate, the mortgage payment stays the same. With an adjustable rate it can move. This calculator assumes the rate stays the same for the whole term.",
      },
    ],
    glosario: [
      { termino: deposit ? "Deposit" : "Down payment", definicion: "The part of the price you pay from your own savings." },
      { termino: "Principal", definicion: "The amount you borrowed and still have to pay back." },
      { termino: "Balance", definicion: "What you still owe on the loan." },
    ],
  };
};
