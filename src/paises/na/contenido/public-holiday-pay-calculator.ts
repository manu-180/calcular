import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.public-holiday-pay-calculator",
  h1: "Public holiday and Sunday pay calculator",
  title: "Public holiday pay Namibia: Sunday and holiday work",
  description:
    "Work out what you are owed for working a public holiday or a Sunday in Namibia: up to {{na.public-holiday-factor}} times your hourly wage under the Labour Act.",
  intro: [
    "The Labour Act sets different rules for a public holiday or Sunday that falls on one of your normal work days and one that does not.",
    "Choose the day, enter your wage and the hours you worked, and see the extra pay and the total for the day.",
  ],
  comoSeCalcula: [
    "Your hourly wage is your monthly wage divided by {{na.weeks-per-month}} times your weekly hours. Your daily pay is the monthly wage divided by {{na.weeks-per-month}} times your work days.",
    "Public holiday on a normal work day: your normal daily pay plus your hourly wage for every hour worked.",
    "Public holiday on a day you do not normally work: {{na.public-holiday-factor}} times your hourly wage for every hour.",
    "Sunday you do not normally work: {{na.sunday-factor}} times your hourly wage for every hour. Sunday that is a normal work day: your daily pay plus your hourly wage for every hour.",
  ],
  ejemplo: [
    "On N$10,000 a month, 45 hours over five days, working 9 hours on a public holiday that is a normal work day pays the daily N$461.57 plus N$461.61, so N$923.18 for the day.",
  ],
  faq: [
    {
      pregunta: "Do I get paid for a public holiday I do not work?",
      respuesta: "Yes, if it falls on a day you would normally work. You can lose that pay if you stay away without a valid reason on the work day just before or just after the holiday.",
    },
    {
      pregunta: "Can my employer make me work on a public holiday?",
      respuesta: "Only in certain cases, such as urgent work, shops and hotels that may open that day, domestic work, health care, farms, continuous shifts or work approved by the Permanent Secretary.",
    },
    {
      pregunta: "What if my shift runs past midnight?",
      respuesta: "If most of the shift falls on the holiday or Sunday, all its hours count as worked on that day. If most falls on the other day, they all count on the other day.",
    },
  ],
  glosario: [
    { termino: "Daily pay", definicion: "Your monthly wage converted to one ordinary work day." },
    { termino: "Permanent Secretary", definicion: "The head official of the labour ministry, who can approve Sunday and public holiday work." },
  ],
});
