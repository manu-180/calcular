import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.inflation-calculator",
  h1: "Inflation calculator Botswana",
  title: "Inflation calculator Botswana: what your pula is worth today",
  description: "Bring an amount from a past year to today's pula with the annual inflation rates published by Statistics Botswana. Latest annual inflation: {{bw.cpi-annual}}.",
  intro: [
    "Find out how much an amount from a past year is worth today, or how much more you need now to buy the same as back then.",
    "Annual inflation was {{bw.cpi-annual}} in the latest figures from Statistics Botswana, for the month starting {{bw.cpi-annual#desde}}.",
  ],
  comoSeCalcula: [
    "Statistics Botswana publishes each month the annual inflation rate of the national Consumer Price Index.",
    "The calculator takes the rate for the latest month in each year since your starting year and chains them together.",
    "Your amount is multiplied by that total factor.",
  ],
  ejemplo: [
    "P1 000 in September 2024 is about P1 117.89 in September 2026: prices rose 3.7% in the year to September 2025 and 7.8% in the year to September 2026.",
  ],
  faq: [
    {
      pregunta: "What is the inflation rate in Botswana now?",
      respuesta: "The latest annual rate published by Statistics Botswana is {{bw.cpi-annual}}, for the month starting {{bw.cpi-annual#desde}}.",
    },
    {
      pregunta: "How much did prices rise in April 2026?",
      respuesta: "The national index rose 6.7% in a single month in April 2026, and annual inflation went from 4.2% in March to 10.3% in April, according to Statistics Botswana.",
    },
    {
      pregunta: "Can I use this to adjust a rent or a salary?",
      respuesta: "It shows how prices moved on average across the country. A contract can use a different index or a fixed increase, so check what yours says.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index. It tracks the prices of a basket of goods and services that households buy." },
    { termino: "Annual inflation", definicion: "How much the CPI changed compared with the same month a year earlier." },
  ],
});
