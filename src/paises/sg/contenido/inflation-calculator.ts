import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.inflation-calculator",
  h1: "Inflation calculator for Singapore",
  title: "Singapore inflation calculator: CPI from SingStat",
  description: "Bring a Singapore dollar amount from any month since 2000 to today's prices with the Consumer Price Index published by the Department of Statistics.",
  intro: [
    "Prices change over time, so $1,000 in 2020 does not buy what $1,000 buys today. This calculator uses Singapore's Consumer Price Index (CPI) to compare amounts across months.",
    "Enter an amount, the month it is from and the month you want to bring it to.",
  ],
  comoSeCalcula: [
    "The amount is multiplied by the CPI in the end month and divided by the CPI in the start month.",
    "The CPI used is the all-items index with 2024 as the base year (2024 = 100), published monthly by the Singapore Department of Statistics.",
    "If you pick a month that is not published yet, the calculation stops at the latest month available.",
  ],
  ejemplo: ["$1,000 in August 2025 is worth $1,023.48 in August 2026 prices, an increase of 2.35%."],
  faq: [
    {
      pregunta: "Which CPI does this calculator use?",
      respuesta: "The all-items Consumer Price Index from SingStat, with 2024 as the base year, month by month since January 2000.",
    },
    {
      pregunta: "Why does the result stop at an earlier month?",
      respuesta: "The CPI for a month is published after the month ends. Until then, the calculator uses the latest month available and tells you which one.",
    },
    {
      pregunta: "How often is the CPI updated?",
      respuesta: "Every month. The calculator picks up each new month once SingStat publishes it.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, which tracks the average change in prices paid by households." },
    { termino: "Base year", definicion: "The year the index is set to 100. Here it is 2024." },
  ],
});
