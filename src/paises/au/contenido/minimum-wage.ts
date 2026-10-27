import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.minimum-wage",
  h1: "Minimum wage calculator Australia",
  title: "Minimum wage Australia {{anio}}: {{au.salario-minimo-hora}} an hour",
  description: "The National Minimum Wage is {{au.salario-minimo-hora}} an hour or {{au.salario-minimo-semanal}} a week from 1 July {{anio}}. Work out your minimum pay, casual rate included.",
  intro: [
    "The National Minimum Wage is {{au.salario-minimo-hora}} an hour, or {{au.salario-minimo-semanal}} for a 38-hour week, since {{au.salario-minimo-hora#desde}}.",
    "Enter your weekly hours to see the minimum for your week, fortnight and year. Casual employees get a {{au.recargo-casual}} casual loading on top.",
  ],
  comoSeCalcula: [
    "For permanent employees, the weekly minimum of {{au.salario-minimo-semanal}} is for 38 hours and is scaled to your hours.",
    "For casual employees, the hourly rate includes the {{au.recargo-casual}} casual loading and is multiplied by your hours.",
    "A fortnight is two weeks and a year is 52 weeks.",
  ],
  ejemplo: ["A casual employee on the National Minimum Wage working 20 hours a week earns at least $661 a week, at $33.05 an hour."],
  faq: [
    {
      pregunta: "Who gets the National Minimum Wage?",
      respuesta: "Adult employees in the national system who are not covered by an award or registered agreement. If you are covered by an award, its minimum pay rates apply and they may be higher.",
    },
    {
      pregunta: "When does the minimum wage change?",
      respuesta: "The Fair Work Commission reviews it every year. Most changes start from the first full pay period on or after 1 July.",
    },
    {
      pregunta: "How much did award wages rise in 2026?",
      respuesta: "Award minimum wages rose by 4.75% from 1 July 2026, with the lowest award rate for ongoing employment at least {{au.salario-minimo-hora}} an hour.",
    },
  ],
  glosario: [
    { termino: "Award", definicion: "A legal document that sets minimum pay and conditions for an industry or occupation." },
    { termino: "Casual loading", definicion: "Extra pay on top of the base hourly rate for casual employees." },
    { termino: "Fair Work Commission", definicion: "The body that sets the National Minimum Wage in its annual wage review." },
  ],
});
