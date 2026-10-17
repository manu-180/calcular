import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.inflation-calculator",
  h1: "Inflation calculator Hong Kong",
  title: "Inflation calculator Hong Kong: Composite CPI",
  description:
    "Bring an amount in Hong Kong dollars from one month to another with the Composite Consumer Price Index from the Census and Statistics Department.",
  intro: [
    "Prices change over time, so $1,000 in one year doesn't buy the same as $1,000 years later.",
    "This calculator uses the Composite CPI, the index the Census and Statistics Department uses to reflect inflation for households as a whole.",
  ],
  comoSeCalcula: [
    "Find the Composite CPI for the month of the original amount and for the month you want to bring it to.",
    "Multiply the amount by the end index and divide by the start index.",
    "The latest index published is {{hk.cpi}}, for {{hk.cpi#desde}}. A later date stops at that month.",
  ],
  ejemplo: ["$1,000 in August 2025 is worth $1,016.51 in August 2026, using a Composite CPI of 109.0 and 110.8."],
  faq: [
    {
      pregunta: "Which CPI does this use?",
      respuesta: "The Composite CPI, with October 2019 to September 2020 = 100. It covers households in the expenditure ranges of CPI(A), CPI(B) and CPI(C) together.",
    },
    {
      pregunta: "How far back does it go?",
      respuesta: "To October 1980, the first month of the Composite CPI series in the department's table.",
    },
    {
      pregunta: "When is a new month added?",
      respuesta: "When the Census and Statistics Department publishes it. Until then the calculation stops at the latest month available.",
    },
  ],
  glosario: [
    { termino: "Composite CPI", definicion: "Hong Kong's consumer price index for the household sector as a whole." },
    { termino: "Year-on-year inflation", definicion: "The change in the index against the same month a year earlier." },
  ],
});
