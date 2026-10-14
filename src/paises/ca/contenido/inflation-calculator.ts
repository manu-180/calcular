import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.inflation-calculator",
  h1: "Inflation calculator for Canada (CPI)",
  title: "Inflation calculator Canada: what is it worth today?",
  description: "Bring any amount from January 2000 to today with Statistics Canada's Consumer Price Index. See cumulative and 12-month inflation.",
  intro: [
    "Enter an amount and the month it is from to see what it is worth in a later month, adjusted with the Consumer Price Index.",
    "It uses the all-items CPI for Canada (2002=100) published by Statistics Canada, monthly since January 2000.",
  ],
  comoSeCalcula: [
    "The amount is multiplied by the CPI of the end month and divided by the CPI of the start month.",
    "Cumulative inflation is that ratio minus 1. The 12-month rate compares the end month with the same month a year earlier.",
    "If you choose a month that is not published yet, the calculation stops at the latest CPI available.",
  ],
  ejemplo: [
    "$1,000 from January 2020 (CPI 136.8) is worth $1,241.23 in August 2026 (CPI 169.8): 24.12% cumulative inflation.",
  ],
  faq: [
    {
      pregunta: "Which CPI does it use?",
      respuesta: "The all-items Consumer Price Index for Canada, 2002=100, from Statistics Canada table 18-10-0004-01. It is updated when Statistics Canada publishes a new month.",
    },
    {
      pregunta: "Why does the result stop before the month I chose?",
      respuesta: "The CPI for a month is published after the month ends. If you pick a month that is not out yet, the calculator uses the latest month available and tells you which one.",
    },
    {
      pregunta: "Does it work for any province?",
      respuesta: "It uses the national CPI, so the result is an average for Canada as a whole.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, a measure of the prices of a basket of goods and services bought by households." },
    { termino: "2002=100", definicion: "The CPI is set to 100 for the year 2002, so 169.8 means prices are 69.8% higher than in 2002." },
  ],
});
