import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Emergency fund calculator",
    title: `Emergency fund calculator for ${ctx.nombrePais}`,
    description: "Work out how big your emergency fund should be from your essential expenses, and how many months it takes to build with what you can save.",
    intro: [
      "An emergency fund is money set aside for what you can't plan for: losing your job, a health problem or an urgent home repair.",
      "Having one keeps you off your credit card right when things are hardest. Enter your essential expenses and how many months you want to cover.",
    ],
    comoSeCalcula: [
      "Recommended fund = essential monthly expenses × months to cover.",
      "Still to save = recommended fund − what you already have.",
      "Months to complete it = still to save ÷ what you can save each month, rounded up.",
    ],
    ejemplo: [
      `With ${m(gastos)} of essential expenses a month, a 6 month fund is ${m(gastos * 6)}.`,
      `Saving ${m(aporte)} a month, you complete it in ${Math.ceil((gastos * 6) / aporte)} months.`,
    ],
    faq: [
      {
        pregunta: "How many months should an emergency fund cover?",
        respuesta:
          "The usual guideline is 3 to 6 months of essential expenses. If your income varies, you are self-employed or your household has one income, aim for 6 to 12 months.",
      },
      {
        pregunta: "Where should I keep my emergency fund?",
        respuesta: "Somewhere safe that you can access the same day, separate from your spending account. It is not for risky investing: its job is to be there when you need it.",
      },
      {
        pregunta: "Should I build the fund or pay off debt first?",
        respuesta: "A common approach is to save one month of expenses first, then pay off expensive debt like credit cards, then finish the fund.",
      },
    ],
    glosario: [
      { termino: "Essential expenses", definicion: "Bills you have to pay even if your income stops: housing, food, utilities, health." },
      { termino: "Liquidity", definicion: "How quickly money can be used without losing value." },
    ],
  };
};
