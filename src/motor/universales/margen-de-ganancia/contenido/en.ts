import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Profit margin calculator",
    title: `Profit margin calculator for ${ctx.nombrePais}`,
    description: "Work out margin and markup from cost and price, or the selling price you need to hit the margin you want.",
    intro: [
      "Margin and markup get mixed up all the time, and the difference can cost you money. Both measure the same profit, but against a different base.",
      "Enter the cost and the price and we show both. Or pick a margin and we tell you what to charge.",
    ],
    comoSeCalcula: [
      "Profit = price − cost.",
      "Margin = profit ÷ price × 100.",
      "Markup = profit ÷ cost × 100.",
      "Price for a target margin = cost ÷ (1 − margin ÷ 100).",
    ],
    ejemplo: [
      `A product that costs ${m(costo)} and sells for ${m(precio)} makes ${m(precio - costo)} profit: a ${p(((precio - costo) / precio) * 100)} margin and a ${p(((precio - costo) / costo) * 100)} markup.`,
      `To make a 50% margin on that cost, you need to sell at ${m(precioConMargen(costo, 50))}. Adding 50% to the cost only gives a ${p(100 / 3)} margin.`,
    ],
    faq: [
      {
        pregunta: "What is the difference between margin and markup?",
        respuesta: "Margin is profit over the selling price. Markup is profit over the cost. For the same profit, markup is always the bigger number.",
      },
      {
        pregunta: "How do I set a price for a target margin?",
        respuesta: `Divide the cost by (1 − margin). For a 30% margin, divide the cost by ${formatearNumero(ctx, 0.7, 2)}. Don't add 30% to the cost: you would earn less than you think.`,
      },
      {
        pregunta: "Should cost include taxes?",
        respuesta: "Use cost and price without taxes passed on to the customer, such as sales tax or VAT. Otherwise the margin looks bigger than it is.",
      },
    ],
    glosario: [
      { termino: "Margin", definicion: "Profit as a percentage of the selling price." },
      { termino: "Markup", definicion: "Profit as a percentage of the cost." },
    ],
  };
};
