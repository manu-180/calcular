import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "Weighted average calculator",
    title: tituloQueEntre(`Weighted average calculator for ${ctx.nombrePais}`, `Weighted average for ${ctx.nombrePais}`, "Weighted average calculator"),
    description: "Work out your grade average, simple or weighted, with up to 10 values and the weight of each one: percentages, credits or counts.",
    intro: [
      "Enter each grade and how much it counts. You see the weighted average and the simple one next to it.",
      "It works for school or university grades, and for any average where some values count more than others.",
    ],
    comoSeCalcula: [
      "Simple average = sum of the values ÷ number of values.",
      "Weighted average = sum of (value × weight) ÷ sum of the weights.",
      "The weights don't need to add up to 100: the sum divides by their total.",
    ],
    ejemplo: [
      `With a 7 worth 20%, an 8 worth 30% and a 9 worth 50%, the weighted average is ${n(8.3)}.`,
      `The simple average of those three grades is ${n(8)}: the 9 counts more and pulls the weighted one up.`,
    ],
    faq: [
      {
        pregunta: "How do I calculate a weighted average?",
        respuesta: "Multiply each value by its weight, add them up and divide by the sum of the weights.",
      },
      {
        pregunta: "What if the weights don't add up to 100%?",
        respuesta: "That's fine. If one course has 6 credits and another 4, use 6 and 4. The sum divides by the total weight.",
      },
      {
        pregunta: "What is the difference between a simple and a weighted average?",
        respuesta: "In a simple average every value counts the same. In a weighted average each one counts by its weight.",
      },
    ],
    glosario: [
      { termino: "Weight", definicion: "How much a value counts towards the final average." },
      { termino: "Weighted average", definicion: "An average where each value is multiplied by its weight." },
    ],
  };
};
