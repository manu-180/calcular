import { formatearMonto, montoEjemplo, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `VAT calculator for ${ctx.nombrePais}`,
    title: `VAT calculator (${tasa}) for ${ctx.nombrePais}`,
    description: `Add or remove ${tasa} VAT or sales tax on any price in one step: the price before tax, the tax and the total, to the cent.`,
    intro: [
      `The standard rate used here for ${ctx.nombrePais} is ${tasa}.`,
      "Choose whether to add tax to a net price or take it out of a price that already includes it, then enter the amount.",
    ],
    comoSeCalcula: [
      "Adding tax: tax = price before tax × rate ÷ 100. Total = price before tax + tax.",
      "Removing tax: price before tax = price including tax ÷ (1 + rate ÷ 100). The tax is the difference.",
      "If an item has a reduced rate, you can enter it under “Different tax rate”.",
    ],
    ejemplo: [
      `To add tax to ${precio}, multiply it by ${tasa} and add the result to the price.`,
      `To see how much tax is in a total of ${precio}, divide it by 1 plus the rate and subtract.`,
    ],
    faq: [
      {
        pregunta: "How do I remove VAT from a price?",
        respuesta: "Divide the price by 1 plus the rate as a decimal. What's left is the price before tax, and the difference is the tax.",
      },
      {
        pregunta: "Why can't I just take the percentage off the total?",
        respuesta: "Because the tax was worked out on the smaller, pre-tax price. Taking the percentage off the total removes too much.",
      },
      {
        pregunta: `Does everything pay ${tasa}?`,
        respuesta: "Not always. Some food, medicine or services have a reduced rate or are exempt. In that case, use “Different tax rate”.",
      },
    ],
    glosario: [
      { termino: "VAT", definicion: "Value added tax. It is added to the price of goods and services. Some countries call it GST or sales tax." },
      { termino: "Net price", definicion: "The price before tax is added." },
    ],
  };
};
