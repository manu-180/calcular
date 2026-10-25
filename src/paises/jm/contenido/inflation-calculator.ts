import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.inflation-calculator",
  h1: "Inflation calculator Jamaica",
  title: "Inflation calculator Jamaica: what prices cost a year later",
  description:
    "See how much a price from a year ago costs today with the STATIN point-to-point inflation rate. Latest STATIN figure: {{jm.inflation}}.",
  intro: [
    "Inflation tells you how fast prices are rising. The Statistical Institute of Jamaica (STATIN) measures it every month with the Consumer Price Index.",
    "Enter a price from a year ago to see what the same basket of goods and services costs now.",
  ],
  comoSeCalcula: [
    "The calculator takes the latest point-to-point inflation rate for All Jamaica: {{jm.inflation}}.",
    "Price today = price a year ago × (1 + inflation rate).",
  ],
  ejemplo: ["With inflation of 8.6%, something that cost J$10,000 a year ago now costs about J$10,860."],
  faq: [
    {
      pregunta: "What is point-to-point inflation?",
      respuesta: "The change in the Consumer Price Index between one month and the same month a year earlier.",
    },
    {
      pregunta: "Where does the figure come from?",
      respuesta: "From the monthly CPI press release of STATIN, the national statistics office.",
    },
    {
      pregunta: "Why do my bills seem to rise faster?",
      respuesta: "The CPI is an average over many goods and services. Food or transport can rise faster than the average, as they did in 2026.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index. It tracks the prices of a basket of goods and services bought by households." },
    { termino: "STATIN", definicion: "The Statistical Institute of Jamaica." },
  ],
});
