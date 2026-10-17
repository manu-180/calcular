import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.inflation-calculator",
  h1: "Inflation calculator Malaysia",
  title: "Inflation calculator Malaysia: ringgit value over time",
  description: "See what an amount in ringgit from any month since 1980 is worth today, using the official Consumer Price Index from DOSM.",
  intro: [
    "Enter an amount and two dates to see how much prices rose between them and what the amount is worth in today's ringgit.",
    "It uses the overall Consumer Price Index (2010 = 100) that the Department of Statistics Malaysia publishes every month.",
  ],
  comoSeCalcula: [
    "The CPI for the month of each date is looked up.",
    "The amount is multiplied by the later CPI and divided by the earlier one.",
    "The average yearly inflation is the rate that, compounded each year, gives the same total change.",
  ],
  ejemplo: ["RM1,000 in January 2015 (CPI 110.6) is about RM1,243 at the latest CPI of 137.5."],
  faq: [
    {
      pregunta: "Where does the CPI come from?",
      respuesta: "From DOSM's open data catalogue (OpenDOSM), dataset cpi_headline, overall index with 2010 as the base year.",
    },
    {
      pregunta: "Why does the result stop at an earlier month?",
      respuesta: "DOSM publishes the CPI with a lag of about a month or two. The calculator uses the latest month available.",
    },
    {
      pregunta: "Is this the same as the inflation rate in the news?",
      respuesta: "The headline inflation rate compares one month with the same month a year before. Pick dates a year apart and you get the same comparison.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, which tracks the prices of a fixed basket of goods and services." },
    { termino: "DOSM", definicion: "Department of Statistics Malaysia, which compiles the CPI." },
  ],
});
