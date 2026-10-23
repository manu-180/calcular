import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.inflation-calculator",
  h1: "Inflation calculator Philippines",
  title: "Inflation calculator Philippines: peso value over time",
  description: "See what an amount in pesos from any month since 1994 is worth today, using the consumer price index of the Philippine Statistics Authority.",
  intro: [
    "Prices go up over time, so a peso buys less every year. Enter an amount and the month it is from to see its value in today's pesos.",
    "The calculator uses the consumer price index (CPI) for all income households that the PSA publishes every month.",
  ],
  comoSeCalcula: [
    "The CPI of the latest month is divided by the CPI of the month you chose.",
    "Your amount is multiplied by that ratio. The difference is what inflation added.",
    "The average yearly inflation spreads the total change evenly over the months in between.",
  ],
  ejemplo: ["₱1,000 in January 2018 is worth about ₱1,416.67 in September 2026, with the CPI going from 97.2 to 137.7."],
  faq: [
    {
      pregunta: "Where does the CPI come from?",
      respuesta: "From the Philippine Statistics Authority (PSA), table 'Consumer Price Index for All Income Households by Commodity Group (2018=100)' on its OpenSTAT database.",
    },
    {
      pregunta: "Why can I go back to 1994 if the index starts in 2018?",
      respuesta: "The PSA publishes backcasted values that put older years on the same 2018 = 100 base. The calculator uses them for months before 2018.",
    },
    {
      pregunta: "How often is it updated?",
      respuesta: "The PSA releases the CPI every month. The latest value used here is from {{ph.cpi#desde}}.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer price index: the average price of a basket of goods and services households buy, compared with a base year." },
    { termino: "PSA", definicion: "Philippine Statistics Authority, the government agency that publishes official statistics." },
  ],
});
