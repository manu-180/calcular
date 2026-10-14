import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Percentage calculator",
    title: tituloQueEntre(`Percentage calculator for ${ctx.nombrePais}`, "Percentage calculator"),
    description: "Work out a percentage of a number, what percent one number is of another, and the result of adding or taking off a percentage.",
    intro: [
      "Pick what you want to know, enter the two numbers and you get the answer right away.",
      "It covers the four everyday percentage sums: a part, a share, an increase and a decrease.",
    ],
    comoSeCalcula: [
      "X% of Y = X × Y ÷ 100.",
      "X as a percent of Y = X ÷ Y × 100.",
      "Y plus X% = Y × (1 + X ÷ 100). Y minus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% of 200 is 30.", "30 is 25% of 120.", `A price of ${m(precio)} going up 10% becomes ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "How do I work out a percentage of a number?",
        respuesta: "Multiply the number by the percentage and divide by 100. 20% of 350 is 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "How do I find what percent one number is of another?",
        respuesta: "Divide the part by the whole and multiply by 100. If you get 45 out of 60 right, that is 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "How do I add a percentage to a price?",
        respuesta: `Multiply it by 1 plus the percentage as a decimal. To add 10%, multiply by ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Does going up 10% and then down 10% get me back to the start?",
        respuesta: "No. 100 plus 10% is 110, and 110 minus 10% is 99. The decrease applies to a bigger number.",
      },
    ],
    glosario: [
      { termino: "Percentage", definicion: "An amount written as parts out of 100." },
      { termino: "Base", definicion: "The number the percentage is taken from (Y in this calculator)." },
    ],
  };
};
