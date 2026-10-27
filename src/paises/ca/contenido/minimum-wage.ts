import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.minimum-wage",
  h1: "Minimum wage in Canada by province ({{anio}})",
  title: "Minimum wage in Canada {{anio}} by province",
  description: "Current minimum wage in every province and territory, plus the federal minimum of {{ca.federal-minimum-wage}}. Weekly, monthly and yearly pay at the minimum.",
  intro: [
    "Choose your province or territory to see the general minimum wage today and what it adds up to over a week, a month and a year.",
    "Rates come from the Government of Canada database of current and forthcoming minimum wages.",
  ],
  comoSeCalcula: [
    "The hourly rate is the general minimum wage of your province or territory on today's date.",
    "If your job is federally regulated, you get the federal minimum of {{ca.federal-minimum-wage}}, or the provincial rate if it is higher.",
    "Weekly pay is the hourly rate times your hours. The yearly figure uses 52 weeks and the monthly figure is the year divided by 12.",
  ],
  ejemplo: [
    "In Ontario the minimum wage is {{ca.minimum-wage@on}} an hour. At 40 hours a week that is $718 a week and $37,336 a year.",
  ],
  faq: [
    {
      pregunta: "Is the minimum wage the same across Canada?",
      respuesta: "No. Each province and territory sets its own general minimum wage, and federally regulated jobs have a separate federal minimum of {{ca.federal-minimum-wage}}.",
    },
    {
      pregunta: "When did Ontario's minimum wage last change?",
      respuesta: "It went to {{ca.minimum-wage@on}} on {{ca.minimum-wage@on#desde}}.",
    },
    {
      pregunta: "Who gets the federal minimum wage?",
      respuesta: "Workers in federally regulated sectors, such as banking, telecommunications and interprovincial or international transportation. They get {{ca.federal-minimum-wage}} or the provincial minimum, whichever is higher.",
    },
  ],
  glosario: [
    { termino: "General minimum wage", definicion: "The lowest hourly rate most employees can be paid. Some provinces have special rates for young workers and some specific occupations." },
    { termino: "Federally regulated", definicion: "Industries covered by the Canada Labour Code instead of provincial employment law." },
  ],
});
