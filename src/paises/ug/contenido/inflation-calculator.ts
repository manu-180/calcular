import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.inflation-calculator",
  h1: "Inflation calculator Uganda",
  title: "Inflation calculator Uganda: UBOS headline inflation",
  description: "See how much prices have risen in Uganda over the last year with the UBOS annual headline inflation rate of {{ug.inflation}} ({{ug.inflation#desde}}).",
  intro: [
    "Inflation measures how much more the same basket of goods and services costs than a year before.",
    "Enter what something cost a year ago to see what the same basket costs now.",
  ],
  comoSeCalcula: [
    "We use the latest annual headline inflation from the Uganda Bureau of Statistics: {{ug.inflation}} for the month starting {{ug.inflation#desde}}.",
    "Price today = price a year ago × (1 + inflation ÷ 100).",
  ],
  ejemplo: ["With inflation at 4.6%, something that cost Ushs 100,000 a year ago costs about Ushs 104,600 now."],
  faq: [
    {
      pregunta: "What is headline inflation?",
      respuesta: "The change in the Consumer Price Index over 12 months. It covers core goods and services, food crops, and energy, fuel and utilities.",
    },
    {
      pregunta: "When does UBOS publish inflation?",
      respuesta: "UBOS publishes a Consumer Price Index press release every month, with the headline, core, food crops and energy figures.",
    },
    {
      pregunta: "Can I use this to update a salary or rent?",
      respuesta: "It gives a guide. A pay rise or rent review that only matches inflation keeps the same buying power as a year ago.",
    },
  ],
  glosario: [
    { termino: "UBOS", definicion: "Uganda Bureau of Statistics, which publishes the Consumer Price Index." },
    { termino: "CPI", definicion: "Consumer Price Index, the measure of average prices paid by households." },
  ],
});
