import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Tip calculator",
    title: tituloQueEntre(`Tip calculator for ${ctx.nombrePais}`, "Tip calculator"),
    description: "Work out the tip, the total bill and what each person pays when you split it. You can round each share up to a whole amount.",
    intro: [
      "Enter the bill, the tip percentage and how many people are paying. You see the tip, the total and each share.",
      "If you prefer round numbers, it rounds each share up and the extra goes to the tip.",
    ],
    comoSeCalcula: ["Tip = bill × tip percentage ÷ 100.", "Total = bill + tip.", "Each share is the total divided by the number of people."],
    ejemplo: [
      `A bill of ${m(cuenta)} with a 15% tip adds ${m(propina)}, for a total of ${m(cuenta + propina)}.`,
      `Split between 3 people, each pays ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "How much should I tip?",
        respuesta: `It depends on local custom. Check what is usual in ${ctx.nombrePais}, and whether a service charge is already on the bill.`,
      },
      {
        pregunta: "Should I tip on the amount before or after tax?",
        respuesta: "Most people tip on the total shown on the bill. If you prefer to tip on the pre-tax amount, enter that figure instead.",
      },
      {
        pregunta: "What is a quick way to work out a 15% tip?",
        respuesta: "Divide the bill by 10 to get 10%, then add half of that. On 40, that is 4 plus 2, so 6.",
      },
    ],
    glosario: [
      { termino: "Tip", definicion: "An extra amount you leave for the service, on top of the price." },
      { termino: "Service charge", definicion: "A fee the venue has already added to the bill for service." },
    ],
  };
};
