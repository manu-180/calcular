import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.inflation-calculator",
  h1: "Inflation calculator Bhutan",
  title: "Inflation calculator Bhutan: what your money is worth today",
  description: "See what an amount from a past year is worth today, with the National Statistics Bureau's Consumer Price Index. Enter an amount and a year.",
  intro: [
    "The National Statistics Bureau publishes the Consumer Price Index each month. The latest index is {{bt.cpi}}, for {{bt.cpi#desde}}, on a base of 2023-24 = 100. Its report for September 2026 gives prices 5.58 % higher than a year before.",
    "Enter an amount and a year to see what the same purchase would cost today.",
  ],
  comoSeCalcula: [
    "The calculator divides the latest index by the index for the same month in the year you chose.",
    "Multiply your amount by that figure to get today's value. The average yearly rate spreads the change over the years between them.",
    "The index covers the whole country. Prices in your town, or in your own shopping basket, can move differently.",
  ],
  ejemplo: ["The index stood at 105.13 in September 2025 and 111.01 in September 2026. So Nu. 1,000 of September 2025 is worth Nu. 1,055.85 in September 2026 money. Put the other way, you would need Nu. 55.85 more to buy the same things."],
  faq: [
    {
      pregunta: "What is the inflation rate in Bhutan?",
      respuesta: "The National Statistics Bureau reported 5.58 % over 12 months to September 2026: 4.95 % for food and 6.34 % for other goods and services (report released on 20 October 2026). The calculator also shows the rate for the newest month in its data.",
    },
    {
      pregunta: "What drove prices in 2026?",
      respuesta: "The same report points to transport, up 12.43 %, and housing and utilities, up 10.87 %, in the year to September 2026. The Royal Monetary Authority also links part of the 2026 rise to the start of GST.",
    },
    {
      pregunta: "How far back can I go?",
      respuesta: "To 2013. The series on the base of 2023-24 = 100 starts in December 2012.",
    },
  ],
  glosario: [
    { termino: "Consumer Price Index", definicion: "A measure of the price of a basket of goods and services that households buy." },
    { termino: "Year-on-year", definicion: "The change from the same month a year before." },
    { termino: "Purchasing power", definicion: "How much a sum of money can buy. It falls when prices rise." },
  ],
});
