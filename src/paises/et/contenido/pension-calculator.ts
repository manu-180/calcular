import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.pension-calculator",
  h1: "Pension calculator Ethiopia",
  title: "Ethiopia pension calculator: private sector service pension",
  description:
    "Estimate your POESSA service pension: {{et.pension-base-rate}} of your average salary for the first 10 years plus {{et.pension-yearly-rate}} for each extra year.",
  intro: [
    "If you work in the private sector, the pension fund run by POESSA pays a monthly service pension once you meet the conditions. Enter your years of service and your average salary to estimate it.",
    "The formula is the one POESSA explains with a worked example on its pension page.",
  ],
  comoSeCalcula: [
    "First {{et.pension-min-years}} years of service: {{et.pension-base-rate}} of your average salary.",
    "Each year after that adds {{et.pension-yearly-rate}}. Extra months count as a share of a year.",
    "The average salary is that of your last {{et.pension-salary-months}} months. POESSA rounds the percentage to one decimal in its example, and so does this calculator.",
  ],
  ejemplo: [
    "POESSA's own example: 36 years and 2 months of service give 62.7%. With an average salary of ETB 16,333.33 the pension is about ETB 10,241 a month.",
  ],
  faq: [
    {
      pregunta: "How many years do I need?",
      respuesta: "At least {{et.pension-min-years}} years of service. With fewer years the fund does not pay a service pension.",
    },
    {
      pregunta: "At what age is the pension paid?",
      respuesta: "When you reach the retirement age of {{et.retirement-age}}. With 25 or more years of service you can leave from age 55 and receive it, unless you were dismissed for a disciplinary reason.",
    },
    {
      pregunta: "What if I cannot work because of illness?",
      respuesta: "With at least {{et.pension-min-years}} years of service, a worker found unfit for work by a medical board receives the service pension from the following month, even before the retirement age.",
    },
  ],
  glosario: [
    { termino: "Service pension", definicion: "The monthly pension paid for years of contributory service." },
    { termino: "Average salary", definicion: "The mean of your monthly salaries in the last 36 months." },
  ],
});
