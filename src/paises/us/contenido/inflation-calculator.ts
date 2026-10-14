import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.inflation-calculator",
  h1: "Inflation calculator",
  title: "Inflation Calculator: value of a dollar with the CPI",
  description:
    "See what an amount from any month since 1997 is worth today with the official CPI-U from the Bureau of Labor Statistics. Cumulative and yearly inflation.",
  intro: [
    "Prices rise over time, so a dollar buys less every year. Enter an amount and two months to see how much money you would need today to buy the same things.",
    "The calculator uses the Consumer Price Index for All Urban Consumers (CPI-U), the inflation measure the BLS publishes every month. The latest value is {{us.cpi-u}}.",
  ],
  comoSeCalcula: [
    "Find the CPI-U for the first month and for the second month.",
    "Divide the later index by the earlier one. That is how much prices grew.",
    "Multiply your amount by that factor. The average yearly rate spreads the change evenly across the years in between.",
  ],
  ejemplo: ["$100 in January 2020 is worth about $123.14 in January 2025 dollars. Prices rose 23.1%, an average of about 4.25% a year."],
  faq: [
    {
      pregunta: "Which CPI does this use?",
      respuesta: "The CPI-U for the U.S. city average, all items, not seasonally adjusted (series CUUR0000SA0). It is the index most often used to adjust amounts for inflation.",
    },
    {
      pregunta: "Why can't I pick October 2025?",
      respuesta: "The Bureau of Labor Statistics did not collect or publish CPI data for October 2025 because of the federal government shutdown.",
    },
    {
      pregunta: "How current is the data?",
      respuesta: "The BLS releases each month's CPI around the middle of the following month. When you choose a later month, the most recent index is used.",
    },
  ],
  glosario: [
    { termino: "CPI-U", definicion: "Consumer Price Index for All Urban Consumers. It tracks the prices that people living in cities and towns pay for goods and services." },
    { termino: "Cumulative inflation", definicion: "The total rise in prices between two dates." },
  ],
});
