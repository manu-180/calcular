import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.annual-leave",
  h1: "Annual leave calculator Malta",
  title: "Annual leave Malta {{anio}}: hours of vacation leave",
  description:
    "Work out your paid annual leave in Malta: {{mt.annual-leave-hours}} hours on a 40-hour week, plus a day for each public holiday on a weekend, pro rata for part-time work.",
  intro: [
    "Every worker in Malta is entitled to at least {{mt.annual-leave-hours}} hours of paid annual leave a year on a 40-hour week, which is four weeks and 32 hours.",
    "Enter your hours, working days and months employed. You get your leave in hours and in working days for this year.",
  ],
  comoSeCalcula: [
    "Start from {{mt.annual-leave-hours}} hours. If your normal week is shorter or longer than 40 hours, the hours are adjusted in proportion.",
    "Whole-time employees get an extra day of leave for every national or public holiday that falls on a Saturday or Sunday that year.",
    "If you are employed for only part of the year, you get leave in proportion to the time you are employed.",
  ],
  ejemplo: [
    "In 2026 three public holidays fall on a weekend, so a whole-time employee on 40 hours a week gets {{mt.annual-leave-hours}} hours plus 24 hours: 216 hours, or 27 working days.",
  ],
  faq: [
    {
      pregunta: "Can my employer replace leave with money?",
      respuesta: "Not the first four weeks, except when the employment ends. Any leave you have not taken when you leave has to be paid.",
    },
    {
      pregunta: "Can I carry leave over to next year?",
      respuesta: "Up to half of your annual entitlement, once, if you and your employer agree. Leave carried over is used first.",
    },
    {
      pregunta: "Do part-time employees get annual leave?",
      respuesta: "Yes, in proportion to the hours they work compared with a whole-time employee, counted in hours.",
    },
    {
      pregunta: "Does leave keep building up during sick or maternity leave?",
      respuesta: "Yes. Annual leave keeps accruing during maternity leave and during sick or injury leave.",
    },
  ],
  glosario: [
    { termino: "Annual leave", definicion: "Paid time off that every worker is entitled to each calendar year, also called vacation leave." },
    { termino: "Whole-time employee", definicion: "An employee who works the normal full working week for the job." },
  ],
});
