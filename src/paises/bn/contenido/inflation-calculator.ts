import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.inflation-calculator",
  h1: "Brunei inflation calculator {{anio}}",
  title: "Brunei inflation calculator {{anio}}: CPI since 2021",
  description:
    "See what an amount from a past month is worth in today's prices, using the Brunei Consumer Price Index. The latest figure is {{bn.cpi}}.",
  intro: [
    "Prices in Brunei Darussalam have moved slowly. The Department of Economy and Statistics (DEPS) publishes the Consumer Price Index every month, and the latest index is {{bn.cpi}} for the month starting {{bn.cpi#desde}}.",
    "Enter an amount and the month it comes from. You get its value in today's prices, the total change and the average change a year.",
  ],
  comoSeCalcula: [
    "The calculator divides the latest CPI, {{bn.cpi}}, by the CPI of the month you pick. That ratio is multiplied by your amount.",
    "The total change is the ratio minus one. The yearly average spreads that change over the number of years between the two months.",
    "The series starts in January 2021. Index values are those printed in the DEPS monthly table. December 2024 is left out because the figure on that table does not match its own year on year change.",
  ],
  ejemplo: [
    "BND 1,000 from January 2021, when the index was 101.9, equals BND 1,042.20 now. That is a rise of 4.2 percent over five years and eight months. BND 1,000 from January 2025 equals BND 1,002.83.",
  ],
  faq: [
    {
      pregunta: "Where does the CPI come from?",
      respuesta: "From the Department of Economy and Statistics, part of the Ministry of Finance and Economy. DEPS publishes a media release and a report each month.",
    },
    {
      pregunta: "Why is the change so small?",
      respuesta: "DEPS reports that the CPI fell year on year in several months of 2025 and 2026.",
    },
    {
      pregunta: "Does the CPI match my own costs?",
      respuesta: "The index covers an average basket of food and non-food items. Your own spending on rent, fuel or school fees can move differently.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, the measure of the change in the price of a basket of goods and services." },
    { termino: "Year on year", definicion: "The change compared with the same month one year earlier." },
    { termino: "DEPS", definicion: "The Department of Economy and Statistics of Brunei Darussalam." },
  ],
});
