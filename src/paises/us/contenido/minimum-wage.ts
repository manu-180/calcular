import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.minimum-wage",
  h1: "Minimum wage calculator by state",
  title: "Minimum Wage by State 2026: hourly, weekly and yearly pay",
  description:
    "Find the 2026 minimum wage in your state and what it adds up to per week, month and year. The federal minimum is {{us.min-wage-federal}} an hour. Official rates.",
  intro: [
    "Pick your state to see its minimum wage, the federal minimum and the one your employer must pay.",
    "Enter your weekly hours to turn the hourly rate into weekly, monthly and yearly pay.",
  ],
  comoSeCalcula: [
    "The federal minimum wage is {{us.min-wage-federal}} an hour for jobs covered by the Fair Labor Standards Act.",
    "When a state sets a higher rate, workers get the higher one. In California it is {{us.min-wage-state[california]}}, in New York City {{us.min-wage-state[new-york-city-area]}} and in Florida {{us.min-wage-state[florida]}}.",
    "Weekly pay is the hourly rate times your hours. A year counts 52 weeks and a month is a twelfth of that.",
  ],
  ejemplo: ["In California a full-time worker earning the minimum makes $676 a week, about $2,929 a month or $35,152 a year."],
  faq: [
    {
      pregunta: "What is the federal minimum wage in 2026?",
      respuesta: "{{us.min-wage-federal}} an hour. It has not changed since July 24, 2009.",
    },
    {
      pregunta: "Which states pay only the federal minimum?",
      respuesta:
        "States like Texas, Pennsylvania, North Carolina and Indiana use {{us.min-wage-federal}}. Alabama, Louisiana, Mississippi, South Carolina and Tennessee have no state minimum wage law, so the federal rate applies to covered jobs.",
    },
    {
      pregunta: "My city pays more than the state. Which one counts?",
      respuesta: "The highest one. Cities and counties such as Seattle, Denver and many in California set their own minimum wage above the state rate.",
    },
    {
      pregunta: "When do minimum wages change?",
      respuesta: "Most states raise them on January 1. Some, like Oregon and the District of Columbia, adjust on July 1, and Florida's raise came on September 30.",
    },
  ],
  glosario: [
    { termino: "Fair Labor Standards Act (FLSA)", definicion: "The federal law that sets the minimum wage and overtime rules for most jobs." },
    { termino: "Tipped minimum wage", definicion: "A lower cash wage some states allow for tipped workers, as long as tips bring them up to the full minimum." },
  ],
});
