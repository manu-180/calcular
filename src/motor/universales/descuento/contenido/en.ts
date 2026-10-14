import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Discount calculator",
    title: `Discount calculator for ${ctx.nombrePais}`,
    description: "Work out the sale price and how much you save, including stacked discounts like 30% off plus an extra 10%.",
    intro: [
      "Enter the price and the discount and you see right away what you pay and how much you save.",
      "If the deal has an extra discount on top, add it too: two discounts in a row never simply add up.",
    ],
    comoSeCalcula: [
      "Sale price = original price × (1 − discount ÷ 100).",
      "An extra discount applies to the price that already has the first one.",
      "Your saving is the original price minus the sale price.",
    ],
    ejemplo: [
      `An item that costs ${m(precio)} with 25% off comes to ${m(precio * 0.75)}.`,
      `With 30% off and then an extra 10%, it comes to ${m(precio * 0.7 * 0.9)}: that is 37% off in total, not 40%.`,
    ],
    faq: [
      {
        pregunta: "How do I work out a discount?",
        respuesta: "Multiply the price by the percentage and divide by 100. That is your saving. Take it off the price to get what you pay.",
      },
      {
        pregunta: "Is 30% plus 10% the same as 40% off?",
        respuesta: "No. The second discount applies to the already reduced price, so the total is 37% off.",
      },
      {
        pregunta: "How do I find the original price from the sale price?",
        respuesta: `Divide the sale price by (1 − discount ÷ 100). With 25% off, divide by ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Discount", definicion: "The percentage taken off the original price." },
      { termino: "Effective discount", definicion: "The total percentage you save when more than one discount applies." },
    ],
  };
};
