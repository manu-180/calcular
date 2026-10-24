import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.inflation-calculator",
  h1: "Inflation calculator Kenya",
  title: "Inflation calculator Kenya: what money is worth today",
  description: "See what an amount from a past year is worth in today's shillings, using the 12-month inflation rates from CBK and KNBS. Latest rate: {{ke.inflation}}.",
  intro: [
    "Prices rise over time, so a shilling buys less each year. Enter an amount and a year to see what it equals today.",
    "The latest 12-month inflation rate is {{ke.inflation}}, for the month starting {{ke.inflation#desde}}.",
  ],
  comoSeCalcula: [
    "The calculator takes the 12-month inflation rate for the same month in each year from the year you chose to today.",
    "It multiplies the amount by 1 plus each rate in turn. The result is the amount in today's shillings.",
  ],
  ejemplo: ["With inflation of 6.76% in the 12 months to September 2026, KSh 1,000 from September 2025 equals KSh 1,067.60."],
  faq: [
    {
      pregunta: "Where do the rates come from?",
      respuesta: "From the Kenya National Bureau of Statistics. The Central Bank of Kenya publishes the series on its website.",
    },
    {
      pregunta: "Why does the result differ from other calculators?",
      respuesta: "This one chains the published rates, which are rounded to two decimals. A calculator that uses the CPI index directly can give a slightly different result.",
    },
    {
      pregunta: "How far back can I go?",
      respuesta: "To 2004, because the series starts in January 2005.",
    },
  ],
  glosario: [{ termino: "12-month inflation", definicion: "How much prices rose compared with the same month a year earlier." }],
});
