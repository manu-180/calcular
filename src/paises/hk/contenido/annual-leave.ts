import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.annual-leave",
  h1: "Annual leave calculator Hong Kong",
  title: "Annual leave Hong Kong: days and leave pay",
  description:
    "Work out your paid annual leave under the Employment Ordinance, from {{hk.annual-leave-days[1]}} to {{hk.annual-leave-days[9]}} a year, plus the pay and pro rata leave when a job ends.",
  intro: [
    "Under Hong Kong's Employment Ordinance you earn paid annual leave after every 12 months of continuous employment.",
    "Enter your years of service and your wages to see your days, what they're worth and any pro rata leave if your job is ending.",
  ],
  comoSeCalcula: [
    "Leave rises with service: {{hk.annual-leave-days[1]}} for the first and second years, then one more day a year up to {{hk.annual-leave-days[9]}} from the ninth year.",
    "Each day is paid at your average daily wages over the last 12 months, leaving out days without full pay and what was paid for them.",
    "When a job ends after at least 3 months in the current leave year (and not by summary dismissal), you get that year's leave pro rata: days × days employed in the leave year ÷ 365.",
  ],
  ejemplo: ["With wages of $180,000 over the last 12 months, the average daily wage is about $493. Seven days of leave are worth about $3,451."],
  faq: [
    {
      pregunta: "How many days of annual leave do I get in Hong Kong?",
      respuesta: "{{hk.annual-leave-days[1]}} a year for the first two years, rising by one day a year to {{hk.annual-leave-days[9]}} after nine years.",
    },
    {
      pregunta: "Can my employer pay me instead of giving leave?",
      respuesta: "Only for the part of your entitlement above 10 days, and only if you choose to accept it.",
    },
    {
      pregunta: "What happens to my leave when I resign?",
      respuesta: "Leave you earned but haven't taken is paid. If you've worked at least 3 months of the current leave year, you also get pro rata leave pay for it.",
    },
    {
      pregunta: "Do public holidays during my leave count as leave?",
      respuesta: "A rest day or statutory holiday inside your annual leave counts as annual leave, and another day off has to be given.",
    },
  ],
  glosario: [
    { termino: "Leave year", definicion: "Each 12 months from the day you started work, or a common leave year your employer sets for everyone." },
    { termino: "Average daily wages", definicion: "Your wages in the last 12 months divided by the days, after leaving out days without full pay." },
  ],
});
