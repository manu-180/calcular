import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.inflation-calculator",
  h1: "Oman inflation calculator",
  title: "Oman inflation calculator with the latest rate {{om.cpi-yoy}}",
  description:
    "See how inflation affects an amount in Omani rials with the latest annual rate from the National Centre for Statistics and Information.",
  intro: [
    "Inflation is the rise in prices of the goods and services households buy, measured by the consumer price index.",
    "Enter an amount and a number of years to see how much money you would need to buy the same things if inflation stayed at today's rate.",
  ],
  comoSeCalcula: [
    "The rate used is annual inflation for {{om.cpi-yoy#desde}}: {{om.cpi-yoy}} compared with the same month a year earlier.",
    "Amount after a number of years = amount × (1 + rate) to the power of the years.",
    "Buying power = amount ÷ (1 + rate) to the power of the years.",
  ],
  ejemplo: [
    "With inflation at 3.2% a year, what costs OMR 1,000 today costs about OMR 1,065 in two years, and OMR 1,000 in two years buys what about OMR 939 buys today.",
  ],
  faq: [
    {
      pregunta: "What is the inflation rate in Oman?",
      respuesta: "The latest published annual rate is {{om.cpi-yoy}} for {{om.cpi-yoy#desde}}, compared with the same month a year earlier, according to the National Centre for Statistics and Information.",
    },
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the consumer price inflation report the National Centre for Statistics and Information publishes every month, with 2018 as the base year.",
    },
    {
      pregunta: "Is the estimate for future years accurate?",
      respuesta: "No. It assumes today's rate stays the same, and inflation changes from month to month.",
    },
  ],
  glosario: [
    { termino: "Consumer price index", definicion: "An index that tracks the prices of the goods and services in the household spending basket against a base year." },
  ],
});
