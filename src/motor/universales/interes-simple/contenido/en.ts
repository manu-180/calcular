import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Simple interest calculator",
    title: `Simple interest calculator for ${ctx.nombrePais}`,
    description: "Work out simple interest on a principal at an annual rate over days, months or years. Choose a 365 or 360 day year and see the total.",
    intro: [
      "Simple interest is always worked out on the original principal: interest is not added to the balance during the term.",
      "It is used for short deposits, loans between people and plenty of homework problems.",
    ],
    comoSeCalcula: [
      "Interest = principal × annual rate × time in years.",
      "For months, divide by 12. For days, divide by 365 or 360, depending on the year the bank uses.",
      "Total = principal + interest.",
    ],
    ejemplo: [
      `${m(capital)} at 10% a year for 6 months earns ${m(capital * 0.1 * 0.5)} in interest.`,
      `The same principal for 90 days earns ${m((capital * 0.1 * 90) / 365)} with a 365 day year and ${m((capital * 0.1 * 90) / 360)} with a 360 day year.`,
    ],
    faq: [
      {
        pregunta: "What is the simple interest formula?",
        respuesta: "I = P × r × t. P is the principal, r the annual rate as a decimal (10% is 0.10) and t the time in years.",
      },
      {
        pregunta: "How is it different from compound interest?",
        respuesta: "Simple interest is always worked out on the same principal. With compound interest, interest is added to the balance and earns interest too.",
      },
      {
        pregunta: "Why do some banks use a 360 day year?",
        respuesta: "It is a banking convention that makes the math easier. With 360 days the interest comes out a little higher. Check which one your bank uses.",
      },
    ],
    glosario: [
      { termino: "Principal", definicion: "The money that is lent or invested." },
      { termino: "Banker's year", definicion: "A year counted as 360 days, with 30 day months." },
    ],
  };
};
