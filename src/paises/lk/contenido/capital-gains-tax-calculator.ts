import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Sri Lanka",
  title: "Capital gains tax Sri Lanka {{anio}}: the new 15% rate",
  description:
    "Work out capital gains tax at {{lk.cgt-rate}} on the sale of land, a house that is not your home, or shares. Rate in force since {{lk.cgt-rate#desde}}.",
  intro: [
    "Capital gains tax is charged on the gain when you sell or otherwise realise an investment asset, such as land, buildings or shares.",
    "Enter the sale price, the market value if it was higher, and what the asset cost you.",
  ],
  comoSeCalcula: [
    "The gain is the sale price, or the market value at the time of sale if that is higher, less the cost of the asset.",
    "Individuals pay {{lk.cgt-rate}} of the gain. The Inland Revenue (Amendment) Act, No. 11 of 2026 raised the rate from 10% to 15% from 3 June 2026.",
    "If the cost is higher than the value, there is a loss and no tax.",
  ],
  ejemplo: ["Land bought for Rs. 12 million and sold for Rs. 20 million gives a gain of Rs. 8 million. At 15% the tax is Rs. 1,200,000."],
  faq: [
    {
      pregunta: "Do I pay capital gains tax on selling my home?",
      respuesta: "Not on your principal place of residence, if you owned it continuously for the three years before selling and lived in it for at least two of those years.",
    },
    {
      pregunta: "Which rate applies to a sale made in May 2026?",
      respuesta: "The old rate of 10%. The 15% rate applies to gains from the date the 2026 Act was certified, 3 June 2026. This calculator always uses the rate in force today.",
    },
    {
      pregunta: "Is the gain added to my other income?",
      respuesta: "No. Gains from the realisation of investment assets are taxed at their own rate, and the personal relief cannot be used against them.",
    },
  ],
  glosario: [
    { termino: "Investment asset", definicion: "A capital asset held as an investment, such as land, buildings or shares." },
    { termino: "Realisation", definicion: "Selling, exchanging, transferring or otherwise giving up ownership of an asset." },
  ],
});
