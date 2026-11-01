import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.overtime-calculator",
  h1: "Overtime calculator for Lesotho",
  title: "Overtime calculator Lesotho: Labour Act 2024 rates",
  description:
    "Work out overtime at {{ls.pay-multipliers[overtime]}} times your hourly rate, and double pay for rest days and public holidays, under the Labour Act 2024.",
  intro: [
    "Enter your basic wage and the extra hours you worked. You get your normal hourly rate and the least your employer must pay for overtime, your weekly rest day and public holidays.",
    "The rules come from sections 185 to 187 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "Your hourly rate is your monthly wage divided by {{ls.hours-divisor[monthly]}}, or your weekly wage divided by {{ls.hours-divisor[weekly]}}. For a watchman or security guard the divisors are {{ls.hours-divisor[monthly-watchman]}} and {{ls.hours-divisor[weekly-watchman]}}.",
    "Overtime is paid at no less than {{ls.pay-multipliers[overtime]}} times the hourly rate.",
    "Work on your weekly rest day or on a public holiday is paid at double the rate for an ordinary working day.",
  ],
  ejemplo: ["On M6 000 a month your hourly rate is M30.77. Ten hours of overtime pay at least M384.63."],
  faq: [
    {
      pregunta: "What are normal working hours in Lesotho?",
      respuesta: "No more than 45 hours a week: nine hours a day on a five-day week, or eight hours on five days and five hours on one day on a six-day week.",
    },
    {
      pregunta: "How long can a working day be with overtime?",
      respuesta: "Where the work needs it, up to twelve hours in a day. The hours beyond normal hours are overtime.",
    },
    {
      pregunta: "Can I take a day off instead of double pay for a public holiday?",
      respuesta: "Yes, by agreement. You get your normal daily wage for working the holiday plus another working day off with pay.",
    },
    {
      pregunta: "Can hours be counted per month?",
      respuesta: "Yes, where the work needs it. Ordinary hours can be set at 195 a month, with every hour beyond that paid as overtime and no more than 260 hours in total.",
    },
  ],
  glosario: [
    { termino: "Labour Act, 2024", definicion: "The law on employment in Lesotho. It replaced the Labour Code Order of 1992 on 2 April 2024." },
    { termino: "Weekly rest", definicion: "At least 24 hours in a row off work each week." },
  ],
});
