import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.inflation-calculator",
  h1: "Inflation calculator Samoa {{anio}}",
  title: "Inflation calculator Samoa {{anio}}: what WST buys now",
  description: "Update an amount in tala for price changes with the Samoa Bureau of Statistics Consumer Price Index, latest month {{ws.cpi#desde}}.",
  intro: [
    "Prices in Samoa rose by 3.4% over the year to September 2026, driven by transport costs, and by 1.2% on average over the year, according to the Samoa Bureau of Statistics.",
    "Pick a month and an amount to see what it is worth in today's prices. The calculator uses the all-items Consumer Price Index, which has a latest reading of {{ws.cpi}} for {{ws.cpi#desde}}.",
  ],
  comoSeCalcula: [
    "Divide the latest CPI by the CPI of the month you picked. The result is the price change over the period.",
    "Multiply your amount by that factor to get the amount in today's prices. The difference is the loss of buying power over the period.",
    "The Bureau publishes the index each month, usually in the second half of the following month. The latest month is shown as provisional.",
  ],
  ejemplo: [
    "The all-items index was 138.51 in September 2025 and 143.28 in September 2026. WST 1,000 in September 2025 needs WST 1,034.42 to buy the same things a year later, an increase of 3.4%.",
  ],
  faq: [
    {
      pregunta: "Who publishes the CPI in Samoa?",
      respuesta: "The Samoa Bureau of Statistics publishes the Consumer Price Index and its tables every month. The Central Bank of Samoa quotes the average annual inflation rate from it.",
    },
    {
      pregunta: "Why is the monthly index so uneven?",
      respuesta: "The September 2026 report points to transport prices (petrol, diesel and fares) as the main driver of the annual increase, with food and housing costs behind it.",
    },
    {
      pregunta: "Can I go back further than September 2025?",
      respuesta: "Not yet. This page holds the monthly index values we have read from the Bureau's tables. It will add months as the Bureau publishes them.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, a measure of the price of a typical basket of goods and services." },
    { termino: "Average annual inflation", definicion: "The average price change over the last twelve months compared with the twelve before." },
    { termino: "Provisional", definicion: "A figure that can still be revised." },
  ],
});
