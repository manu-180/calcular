import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.inflation-calculator",
  h1: "Inflation calculator Mauritius",
  title: "Inflation calculator Mauritius: what rupees are worth now",
  description:
    "Bring an amount in rupees up to date with the Consumer Price Index from Statistics Mauritius. Latest CPI: {{mu.cpi}} for the month starting {{mu.cpi#desde}}.",
  intro: [
    "Prices go up over time, so a rupee buys less each year. Enter an amount and a month to see what it equals at a later date.",
    "The calculator uses the Consumer Price Index of Statistics Mauritius, base January to December 2023 = 100. The latest index is {{mu.cpi}}.",
  ],
  comoSeCalcula: [
    "The amount is multiplied by the CPI of the end month and divided by the CPI of the start month.",
    "If the end month has not been published yet, the calculation stops at the latest month available.",
  ],
  ejemplo: ["The CPI went from 107.9 in September 2025 to 114.1 in September 2026, so Rs 10,000 then is about Rs 10,575 now."],
  faq: [
    {
      pregunta: "Why does the calculator start in April 2024?",
      respuesta: "That month Statistics Mauritius introduced a new CPI basket based on the 2023 Household Budget Survey. The new series is not strictly comparable with the old one.",
    },
    {
      pregunta: "What is the difference between headline and year-on-year inflation?",
      respuesta: "Year-on-year compares a month with the same month a year earlier. Headline inflation compares the average of the last 12 months with the 12 months before.",
    },
    {
      pregunta: "When is the CPI published?",
      respuesta: "Statistics Mauritius publishes the index for each month early in the following month.",
    },
  ],
  glosario: [{ termino: "CPI", definicion: "Consumer Price Index: the change in the price of a basket of goods and services households buy." }],
});
