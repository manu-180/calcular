import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Loan calculator",
    title: `Loan calculator for ${ctx.nombrePais}`,
    description: "Work out the monthly payment on a loan, the total interest and the full amortization schedule. See how much extra payments save you.",
    intro: [
      "Before you sign for a loan, two numbers matter: what you pay each month and what the loan costs you in interest.",
      "Enter the amount, the annual rate and the term. If you plan to pay a little extra each month, add it and see how much sooner you finish.",
    ],
    comoSeCalcula: [
      "It uses a fixed payment (standard amortization), the usual method for personal, car and home loans.",
      "Monthly rate = annual rate ÷ 12.",
      "Payment = amount × monthly rate ÷ (1 − (1 + monthly rate) to the power of minus the number of payments).",
      "Each month, interest is charged on what you still owe. The rest of the payment reduces the principal.",
    ],
    ejemplo: [
      `A loan of ${m(monto)} at 12% a year over 36 months has a payment of ${m(cuota36)}. You pay ${m(cuota36 * 36 - monto)} in interest in total.`,
      `Stretch it to 60 months and the payment drops to ${m(cuota60)}, but the interest rises to ${m(cuota60 * 60 - monto)}.`,
    ],
    faq: [
      {
        pregunta: "How is a loan payment calculated?",
        respuesta:
          "With the standard amortization formula. Every payment is the same, but early payments are mostly interest and later ones are mostly principal. That is why the balance falls slowly at first.",
      },
      {
        pregunta: "Is it worth paying off a loan early?",
        respuesta:
          "Usually yes, as long as there is no large prepayment fee. Extra money goes straight to the principal and stops earning interest for the lender. The sooner you pay it, the more you save.",
      },
      {
        pregunta: "Is a longer term better?",
        respuesta: "The payment is lower, but you pay much more interest overall. Compare both numbers before you decide.",
      },
      {
        pregunta: "Why does my lender quote a different payment?",
        respuesta:
          "Lenders often add insurance, fees or taxes, or use a rate that differs from the advertised one. Compare offers on total cost, not just on the rate.",
      },
    ],
    glosario: [
      { termino: "Principal", definicion: "The part of the debt you have not paid back yet." },
      { termino: "APR", definicion: "The annual rate that is divided by 12 to get each month's interest." },
      { termino: "Amortization", definicion: "The part of each payment that reduces the debt." },
    ],
  };
};
