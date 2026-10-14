import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Percentage change calculator",
    title: `Percentage change calculator for ${ctx.nombrePais}`,
    description: "Work out how much a value went up or down as a percentage: prices, pay, sales or any number that changed over time.",
    intro: [
      "Enter the old value and the new one. You see the percentage increase or decrease and the difference.",
      "It also shows how much it would need to change to get back to the start, which is almost never the same percentage.",
    ],
    comoSeCalcula: [
      "Percentage change = (new value − old value) ÷ old value × 100.",
      "A positive result means it went up. A negative one means it went down.",
      "If the old value is negative, it divides by its absolute value so the sign still tells you whether it improved.",
    ],
    ejemplo: [
      `Something that cost ${m(antes)} and now costs ${m(despues)} went up 25%.`,
      "To get back to the old price, it would have to drop 20%, not 25%.",
    ],
    faq: [
      {
        pregunta: "How do I calculate a percentage increase?",
        respuesta: "Subtract the old value from the new one, divide by the old value and multiply by 100. From 80 to 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "How do I calculate a percentage decrease?",
        respuesta: "It is the same sum. From 100 to 80: −20 ÷ 100 × 100 = −20%, so it went down 20%.",
      },
      {
        pregunta: "Why doesn't a 25% rise and a 25% drop cancel out?",
        respuesta: "Each percentage is taken from a different base. 80 plus 25% is 100, but 100 minus 25% is 75.",
      },
      {
        pregunta: "What is the difference between percent and percentage points?",
        respuesta: "If a rate moves from 10% to 12%, it rose 2 percentage points. As a percentage change, it rose 20%.",
      },
    ],
    glosario: [
      { termino: "Percentage change", definicion: "How much a value changed, as a percentage of where it started." },
      { termino: "Percentage point", definicion: "The plain difference between two percentages." },
    ],
  };
};
