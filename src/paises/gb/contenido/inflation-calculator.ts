import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.inflation-calculator",
  h1: "UK inflation calculator (CPI)",
  title: "UK inflation calculator: what money is worth today",
  description:
    "Adjust any amount for UK inflation with the official Consumer Prices Index (CPI) from the ONS, month by month since 2000, up to the latest figure published.",
  intro: [
    "Prices go up over time, so £1,000 a few years ago buys less today. This calculator brings an amount from one month to another using the Consumer Prices Index published by the Office for National Statistics.",
    "Pick the month of the original amount and the month you want to compare with. If the end month is not published yet, the result tells you which month it used.",
  ],
  comoSeCalcula: [
    "We take the CPI index (2015 = 100) for the start month and for the end month.",
    "The adjusted amount is the original amount multiplied by the end index and divided by the start index.",
    "If you choose a month the ONS has not published yet, the calculation stops at the latest month available.",
  ],
  ejemplo: ["£1,000 in August 2025 is worth £1,030.87 in August 2026 prices. Inflation over those 12 months was about 3.1%."],
  faq: [
    {
      pregunta: "Why CPI and not RPI?",
      respuesta:
        "CPI is the UK's main measure of inflation and the one the Bank of England targets. RPI is an older measure that usually runs higher and is no longer a National Statistic, though it is still used for some contracts and student loan interest.",
    },
    {
      pregunta: "When is the new CPI figure published?",
      respuesta: "The ONS publishes consumer price inflation once a month, usually in the middle of the following month.",
    },
    {
      pregunta: "What is the Bank of England's inflation target?",
      respuesta: "2% a year, measured by CPI. The Bank changes Bank Rate to try to keep inflation close to that target.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Prices Index. It tracks the price of a typical basket of goods and services bought by households." },
    { termino: "ONS", definicion: "Office for National Statistics, the UK's official statistics body." },
  ],
});
