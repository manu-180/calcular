import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.minimum-wage",
  h1: "Minimum wage calculator Liberia",
  title: "Liberia minimum wage: hourly, daily and monthly",
  description: "See Liberia's minimum wage under the Decent Work Act for formal sector, domestic and casual workers, and what it comes to for the days you work.",
  intro: [
    "Choose your type of work and the days you worked to see the minimum pay you are owed.",
    "Formal sector workers are entitled to {{lr.minimum-wage[formal-day]}} a day and domestic or casual workers to {{lr.minimum-wage[domestic-day]}}.",
  ],
  comoSeCalcula: [
    "Daily minimum wage by type of work.",
    "Minimum pay for the month: daily minimum × days worked.",
  ],
  ejemplo: ["A formal sector worker who works 26 days must earn at least 26 times the daily minimum."],
  faq: [
    {
      pregunta: "Who counts as a formal sector worker?",
      respuesta: "Employees of concessions, industries, businesses and companies.",
    },
    {
      pregunta: "Can a contract pay less than the minimum wage?",
      respuesta: "No. Any term paying less than the rate in a minimum wage order is null and void.",
    },
    {
      pregunta: "Who sets the minimum wage?",
      respuesta: "The Minimum Wage Board, a tripartite body of government, employers and workers chaired by the Minister of Labour.",
    },
  ],
  glosario: [{ termino: "Minimum Wage Board", definicion: "The tripartite board set up by the Decent Work Act for minimum wages." }],
});
