import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.inflation-calculator",
  h1: "Inflation calculator Malta",
  title: "Inflation calculator Malta: value of money since 1946",
  description:
    "See what an amount from one year is worth in another in Malta, with the official index of inflation published every year since 1946.",
  intro: [
    "Malta's index of inflation measures how prices have changed each year since 1946, which is the base year at 100 points.",
    "Enter an amount and two years. You get the equivalent amount and the inflation between them.",
  ],
  comoSeCalcula: [
    "Divide the index of the second year by the index of the first year and multiply your amount by the result.",
    "The inflation between the two years is the difference between both indices as a share of the first one, as the Housing (Decontrol) Ordinance sets out.",
    "The index for each year is worked out from the retail price index and published in the Government Gazette by the end of March of the next year.",
  ],
  ejemplo: ["€1,000 in 2015 is worth about €1,243.69 in 2025 prices: the index went from 832.95 to {{mt.inflation-index[2025]}}."],
  faq: [
    {
      pregunta: "What is this index used for?",
      respuesta: "It is set under the Housing (Decontrol) Ordinance, which uses it to measure increases in inflation. You can also use it to compare the value of money between years.",
    },
    {
      pregunta: "Why is there no figure for this year yet?",
      respuesta: "The index for a year is only published after the year ends, by the end of March. Until then the latest full year is the most recent you can use.",
    },
    {
      pregunta: "Who publishes it?",
      respuesta: "The National Statistics Office establishes it every year and it is published as a legal notice.",
    },
  ],
  glosario: [
    { termino: "Index of inflation", definicion: "A yearly figure that tracks price changes in Malta, with 1946 equal to 100." },
    { termino: "Retail price index", definicion: "The price index the yearly index of inflation is based on." },
  ],
});
