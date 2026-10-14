import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Split the bill calculator",
    title: `Split bill calculator for ${ctx.nombrePais}`,
    description: "Split a shared cost between up to 8 people: each person's share and who pays whom, with as few payments as possible.",
    intro: [
      "Use it for a trip, a dinner, a party or a shared rental where everyone paid a different amount.",
      "Enter what each person paid. You get each share and the payments that settle everyone up.",
    ],
    comoSeCalcula: [
      "Share = total spent ÷ number of people.",
      "Anyone who paid less than their share owes the difference. Anyone who paid more gets it back.",
      "Payments go from the biggest debt to the biggest credit, so nobody makes extra transfers.",
    ],
    ejemplo: [
      `Ana paid ${m(a)}, Ben paid ${m(b)} and Cara paid nothing. The total is ${m(a + b)}, so each share is ${m(cuota)}.`,
      `Cara pays Ana ${m(cuota)} and Ben pays Ana ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "How do I split a bill when everyone paid different amounts?",
        respuesta: "Add it all up, divide by the number of people and compare with what each person paid. The difference is what they owe or are owed.",
      },
      {
        pregunta: "What if someone paid nothing?",
        respuesta: "Enter 0 for them so they count in the split. If you leave the box blank, they are left out.",
      },
      {
        pregunta: "Why are there fewer payments than people?",
        respuesta: "Debts are grouped: the person who owes most pays the one who paid most, and so on. You never need more payments than people minus one.",
      },
    ],
    glosario: [
      { termino: "Share", definicion: "What each person should pay of the total cost." },
      { termino: "Balance", definicion: "The difference between what someone paid and their share." },
    ],
  };
};
