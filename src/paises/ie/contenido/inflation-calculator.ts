import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.inflation-calculator",
  h1: "Inflation calculator Ireland",
  title: "Inflation calculator Ireland: CPI from the CSO",
  description: "See what an amount in euro from a past month is worth today, using the Consumer Price Index published by the Central Statistics Office.",
  intro: [
    "Prices rise over time, so €1,000 a few years ago buys less today. This calculator brings an amount from one month to another using the official Consumer Price Index (CPI).",
    "It uses the CSO's all items index with December 2023 as 100, and is updated each month when the CSO publishes a new figure.",
  ],
  comoSeCalcula: [
    "Find the CPI for the month of the original amount and for the month you want to bring it to.",
    "Divide the later index by the earlier one and multiply your amount by the result.",
    "If the end month is not published yet, the calculation stops at the latest month available.",
  ],
  ejemplo: ["€1,000 in January 2020 (index 84.0) is worth about €1,280.95 in September 2026 (index 107.6)."],
  faq: [
    {
      pregunta: "Where does the CPI come from?",
      respuesta: "From the Central Statistics Office (CSO), which publishes the Consumer Price Index every month.",
    },
    {
      pregunta: "Why is my figure slightly different from the CSO's annual rate?",
      respuesta: "The index is published with one decimal, so a rate worked out from it can differ by about a tenth of a point from the rate the CSO announces.",
    },
    {
      pregunta: "Can I use it for rent or salary reviews?",
      respuesta: "It shows how general prices changed. A lease or contract may name a different index or method, so check what yours says.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, which tracks the prices of a basket of goods and services bought by households." },
    { termino: "Base month", definicion: "The month the index is set to 100. Here it is December 2023." },
  ],
});
