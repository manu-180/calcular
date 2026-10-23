import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.inflation-calculator",
  h1: "Inflation calculator Kuwait",
  title: "Inflation calculator Kuwait: dinar value with the CPI",
  description: "Update an amount in Kuwaiti dinars for inflation with the Consumer Price Index from the Central Statistical Bureau, month by month.",
  intro: [
    "Enter an amount and two dates to see how much prices rose in Kuwait between them.",
    "It uses the all items Consumer Price Index (2013 = 100) that the Central Statistical Bureau publishes every month.",
  ],
  comoSeCalcula: [
    "The CPI for the month of each date is looked up.",
    "The amount is multiplied by the later CPI and divided by the earlier one.",
    "The series in this calculator starts in July 2023.",
  ],
  ejemplo: ["KD 100 in July 2025 (CPI 137.2) is KD 102.19 in July 2026 (CPI 140.2)."],
  faq: [
    {
      pregunta: "Where does the CPI come from?",
      respuesta: "From the monthly Consumer Price Index releases of the Central Statistical Bureau of Kuwait, base year 2013.",
    },
    {
      pregunta: "Why can't I pick a date before July 2023?",
      respuesta: "The series loaded here starts in July 2023. Older months are not included yet.",
    },
    {
      pregunta: "What is the latest month?",
      respuesta: "{{kw.cpi#desde}}, the last month the Central Statistical Bureau has published.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumer Price Index, which tracks the prices of a basket of goods and services." },
    { termino: "CSB", definicion: "The Central Statistical Bureau of Kuwait." },
  ],
});
