import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.notice-period",
  h1: "Notice period calculator for Lesotho",
  title: "Notice period calculator Lesotho: Labour Act 2024",
  description:
    "Find your minimum notice period in Lesotho, from {{ls.notice-weeks[under-6-months]}} to {{ls.notice-months}}, the date it ends and the payment in lieu of notice.",
  intro: [
    "Enter how long you have worked for your employer, your monthly wage and the date notice is given. You get the legal minimum notice, the last day of it and what pay in lieu would be.",
    "The rules apply to a contract without a fixed end date, in either direction: when the employer ends it or when you resign. They are in sections 130 to 132 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "Less than six months of continuous employment: {{ls.notice-weeks[under-6-months]}}.",
    "More than six months but less than a year: {{ls.notice-weeks[6-to-12-months]}} (a fortnight).",
    "One year or more: {{ls.notice-months}}.",
    "Notice must be in writing, and the day it is given does not count. The period starts the next day.",
    "Pay in lieu of notice is the wages for the notice period. A week's wage is worked out as your monthly wage divided by {{ls.hours-divisor[monthly]}}, times {{ls.hours-divisor[weekly]}}.",
  ],
  ejemplo: ["After 18 months, notice given on 27 October 2026 runs until 27 November 2026. On M6 000 a month, pay in lieu is M6 000."],
  faq: [
    {
      pregunta: "Can my employer pay me instead of letting me work the notice?",
      respuesta: "Yes. The employer pays a sum equal to the notice period, including all wages due to you.",
    },
    {
      pregunta: "Is notice needed after serious misconduct?",
      respuesta: "No. An employer can decline to give notice when the dismissal is for serious misconduct that makes it unreasonable to keep you on during the notice period.",
    },
    {
      pregunta: "What if I resign without giving notice?",
      respuesta: "You may be ordered to pay your employer the basic wages for the part of the notice you did not work. This does not apply if you had less than six months of service.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Money paid instead of working the notice period." },
    { termino: "Fortnight", definicion: "Two weeks." },
  ],
});
