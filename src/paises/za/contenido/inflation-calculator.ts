import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.inflation-calculator",
  h1: "Inflation calculator South Africa",
  title: "Inflation calculator: what rand amounts are worth today",
  description: "See what an amount from any year since 1999 is worth today in rand, using the official CPI inflation rates from Stats SA.",
  intro: [
    "Enter an amount and the year it is from. You get what it is worth today, after inflation measured by the consumer price index (CPI).",
    "The rates are the official headline CPI figures from Statistics South Africa, as published by the South African Reserve Bank. They update every month.",
  ],
  comoSeCalcula: [
    "We take the latest month with CPI data and the annual inflation rate for that same month in each year since your start year.",
    "Each year's rate is applied on top of the last, so the price rises compound.",
    "The result is your amount in today's rand, the total inflation for the period and the average inflation a year.",
  ],
  ejemplo: ["R1 000 in August 2015 was worth about R1 667 in August 2026, after total inflation of about 67%."],
  faq: [
    {
      pregunta: "Which inflation rate is used?",
      respuesta: "Headline CPI for all urban areas, the main inflation measure that Stats SA publishes every month.",
    },
    {
      pregunta: "Why does the result use a single month each year?",
      respuesta:
        "Annual inflation compares a month with the same month a year before. Chaining those rates for one month gives an accurate change between that month in different years.",
    },
    {
      pregunta: "Can I use this to update a rent or a salary?",
      respuesta: "Yes, as a guide. If a contract says how to apply CPI, follow the month and the rule it sets.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer price index. It tracks the price of a basket of goods and services that households buy." },
    { termino: "Headline inflation", definicion: "The change in the CPI over 12 months for all urban areas." },
  ],
});
