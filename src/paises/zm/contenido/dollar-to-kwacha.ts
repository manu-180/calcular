import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.dollar-to-kwacha",
  h1: "Dollar to kwacha converter",
  title: "Dollar to kwacha today: Bank of Zambia rate",
  description: "Convert US dollars to Zambian kwacha and back at the Bank of Zambia mid-rate of {{zm.usd}} per dollar, published on {{zm.usd#desde}}.",
  intro: [
    "Enter an amount and choose the direction. The calculator uses the latest mid-rate the Bank of Zambia publishes.",
  ],
  comoSeCalcula: [
    "Dollars to kwacha: multiply by the mid-rate, now {{zm.usd}}.",
    "Kwacha to dollars: divide by the same rate.",
    "The mid-rate is halfway between the Bank of Zambia's buying and selling rates. We keep the last rate it posts each day.",
  ],
  ejemplo: ["At a rate of K20.1203 per dollar, US$100 is K2,012.03."],
  faq: [
    {
      pregunta: "Why does my bank give me a different rate?",
      respuesta: "Banks and bureaux de change set their own buying and selling rates around the market. The Bank of Zambia rate is a reference.",
    },
    {
      pregunta: "Which rate does ZRA use for property transfer tax in dollars?",
      respuesta: "The Bank of Zambia mid-rate published at the end of the day before the provisional return is submitted.",
    },
    {
      pregunta: "How often is the rate updated?",
      respuesta: "The Bank of Zambia posts rates several times every working day. The calculator picks up the latest one.",
    },
  ],
  glosario: [{ termino: "Mid-rate", definicion: "The average of the buying and selling rates." }],
});
