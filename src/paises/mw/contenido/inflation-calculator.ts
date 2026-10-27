import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.inflation-calculator",
  h1: "Inflation calculator Malawi",
  title: "Inflation calculator Malawi: kwacha value over time",
  description:
    "See what an amount of kwacha from any month since 1991 is worth today, with the consumer price index the MRA publishes from NSO data.",
  intro: [
    "Enter an amount and the month it is from to see what it is worth in today's kwacha.",
    "The calculator uses the continuous CPI series the Malawi Revenue Authority publishes each month, with 1970 as the base year.",
  ],
  comoSeCalcula: [
    "Divide the latest CPI by the CPI for the month of your amount.",
    "Multiply your amount by that factor to bring it to today's prices.",
    "The latest index is for the month starting {{mw.cpi#desde}}.",
  ],
  ejemplo: ["MK 100,000 in September 2025 has the same buying power as about MK 119,375 in September 2026."],
  faq: [
    {
      pregunta: "Where do the figures come from?",
      respuesta: "The National Statistical Office compiles the consumer price indices. The MRA links the series from its different base years into one series with 1970 as the base.",
    },
    {
      pregunta: "Why does the MRA publish a CPI?",
      respuesta: "The Taxation Act adjusts the cost of a capital asset for inflation when you sell it. The MRA publishes the indices so taxpayers can work out the gain.",
    },
    {
      pregunta: "Can I go back further than 1991?",
      respuesta: "The MRA gives monthly indices from 1991. Before that it only publishes yearly figures, which this calculator does not use.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer price index: the cost of a fixed basket of goods and services compared with a base year." },
    { termino: "Base year", definicion: "The year the index is set to 100. Here it is 1970." },
  ],
});
