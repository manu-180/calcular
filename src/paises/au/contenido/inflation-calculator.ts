import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.inflation-calculator",
  h1: "Inflation calculator Australia",
  title: "Inflation calculator Australia: CPI from the ABS",
  description: "Bring an amount from a past date to today's dollars with the Consumer Price Index published by the Australian Bureau of Statistics, quarter by quarter.",
  intro: [
    "Prices change over time. This calculator tells you what an amount from the past is worth in today's dollars, using the official Consumer Price Index (CPI).",
    "Enter the amount and the two dates. The calculator uses the CPI of each quarter, from the March quarter 2000 to the latest one published.",
  ],
  comoSeCalcula: [
    "Each date is matched to its quarter of the year.",
    "The amount is multiplied by the CPI of the final quarter and divided by the CPI of the starting quarter.",
    "If the final date is after the latest CPI release, the calculation stops at the latest quarter available.",
  ],
  ejemplo: ["$1,000 in the June quarter 2015 is worth about $1,370 in the June quarter 2026, an increase of about 37%."],
  faq: [
    {
      pregunta: "Which CPI does this use?",
      respuesta: "The all groups CPI for the weighted average of the eight capital cities, original series, published by the Australian Bureau of Statistics.",
    },
    {
      pregunta: "Why does it work by quarter?",
      respuesta: "The ABS publishes this CPI series once per quarter, so every date inside a quarter uses the same index.",
    },
    {
      pregunta: "When is the next CPI released?",
      respuesta: "The ABS publishes the CPI after each quarter ends. The calculator adds the new figure once it is released.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, an index of the prices households pay, published by the ABS." },
    { termino: "Quarter", definicion: "Three months. The ABS names each quarter by the month it ends in, such as the June quarter." },
  ],
});
