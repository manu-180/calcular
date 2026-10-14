import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Rule of three calculator",
    title: `Rule of three calculator for ${ctx.nombrePais}`,
    description: "Solve a direct or inverse proportion in a second. Enter three values and get the fourth, with the working shown.",
    intro: [
      "The rule of three works when two quantities change together and you know three of the four values.",
      "Choose direct or inverse, fill in A, B and C, and the calculator gives you X.",
    ],
    comoSeCalcula: [
      "Direct: X = B × C ÷ A. Use it when both quantities grow together (more kilos, higher price).",
      "Inverse: X = A × B ÷ C. Use it when one grows and the other shrinks (more people, fewer days).",
    ],
    ejemplo: [
      `If 3 kilos cost ${m(precio3)}, 5 kilos cost ${m((precio3 * 5) / 3)}.`,
      "If 4 people paint a house in 12 days, 6 people paint it in 8 days.",
    ],
    faq: [
      {
        pregunta: "How do I know if it is direct or inverse?",
        respuesta: "If one quantity goes up when the other goes up, it is direct. If one goes down when the other goes up, it is inverse.",
      },
      {
        pregunta: "How do I work out a direct proportion by hand?",
        respuesta: `Cross multiply the two known values on the diagonal and divide by the one left. If 3 is to 600, 5 is to 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Can I use it for percentages?",
        respuesta: "Yes. If 200 is 100%, 50 is 25%: that is a direct proportion with A = 200, B = 100 and C = 50.",
      },
    ],
    glosario: [
      { termino: "Direct proportion", definicion: "Both quantities go up or down together." },
      { termino: "Inverse proportion", definicion: "One quantity goes up when the other goes down." },
    ],
  };
};
