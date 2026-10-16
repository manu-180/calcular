import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.inflation-calculator",
  h1: "NZ inflation calculator (CPI)",
  title: "NZ inflation calculator: what money is worth today",
  description:
    "Adjust any amount for New Zealand inflation with the official consumers price index (CPI) from Stats NZ, quarter by quarter since 1990.",
  intro: [
    "Prices rise over time, so $1,000 a few years ago buys less today. This calculator brings an amount from one date to another using the consumers price index published by Stats NZ.",
    "The CPI comes out every quarter. Pick any date and we use the quarter it falls in.",
  ],
  comoSeCalcula: [
    "We take the CPI all groups index for the start quarter and the end quarter.",
    "The adjusted amount is the original amount multiplied by the end index and divided by the start index.",
    "If the end quarter isn't published yet, the calculation stops at the latest quarter available.",
  ],
  ejemplo: ["$1,000 in the June 2025 quarter is worth $1,040.58 in June 2026 quarter prices. The CPI rose 4.1% over those 12 months."],
  faq: [
    {
      pregunta: "How often is the CPI published?",
      respuesta: "Every quarter. Stats NZ publishes the index for the March, June, September and December quarters.",
    },
    {
      pregunta: "What does the CPI measure?",
      respuesta: "The rate of price change of goods and services bought by New Zealand households.",
    },
    {
      pregunta: "Why is my result for the latest quarter and not today?",
      respuesta: "The CPI for the current quarter comes out after the quarter ends. Until then we use the latest quarter published.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumers price index, the main measure of inflation in New Zealand." },
    { termino: "Quarter", definicion: "A three-month period. The June quarter is April to June." },
  ],
});
