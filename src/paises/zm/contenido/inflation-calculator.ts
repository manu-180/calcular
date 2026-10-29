import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.inflation-calculator",
  h1: "Inflation calculator Zambia",
  title: "Inflation calculator Zambia: what your kwacha is worth today",
  description: "Bring an old kwacha amount to today's prices with the Consumer Price Index from the Zambia Statistics Agency. Latest CPI: {{zm.cpi}}.",
  intro: [
    "Enter an amount and the month it is from. The calculator brings it to today's prices with the official Consumer Price Index.",
    "Use it to compare a salary, rent or price from a few years ago with what it would take to buy the same today.",
  ],
  comoSeCalcula: [
    "Take the CPI for the month of the original amount and the latest CPI, now {{zm.cpi}} for {{zm.cpi#desde}}.",
    "Divide the latest CPI by the old one and multiply your amount by the result.",
  ],
  ejemplo: ["K1,000 in September 2025 is about K1,060.86 in September 2026 prices, in line with annual inflation of 6.1%."],
  faq: [
    {
      pregunta: "Where do the figures come from?",
      respuesta: "From The Monthly, the bulletin of the Zambia Statistics Agency, which publishes the national Consumer Price Index with 2009 as the base year.",
    },
    {
      pregunta: "Is this the same as the annual inflation rate?",
      respuesta: "The annual rate compares one month with the same month a year earlier. This calculator compares any two months, so it can cover several years at once.",
    },
    {
      pregunta: "Why does my own cost of living differ?",
      respuesta: "The CPI follows a national basket of food and non-food items. Your spending, and prices in your province, can move differently.",
    },
  ],
  glosario: [{ termino: "CPI", definicion: "Consumer Price Index: a measure of the change in the general level of prices of goods and services households buy." }],
});
