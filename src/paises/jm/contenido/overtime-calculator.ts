import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.overtime-calculator",
  h1: "Overtime calculator Jamaica",
  title: "Overtime calculator Jamaica: time and a half, double time",
  description:
    "Work out overtime pay in Jamaica. Work above {{jm.normal-week-hours}} a week is paid at time and a half, and rest days and public holidays at double time.",
  intro: [
    "Enter your hourly rate and the hours you worked this week. The calculator splits normal hours, overtime and double time, and adds them up.",
    "It follows the National Minimum Wage Order. Your contract or union agreement can pay more, never less.",
  ],
  comoSeCalcula: [
    "The first {{jm.normal-week-hours}} of the week are paid at your normal rate.",
    "Work above {{jm.normal-week-hours}} is paid at time and a half (your rate × {{jm.overtime-multiplier}}).",
    "Hours on your rest day or on a public holiday are paid at double time (your rate × {{jm.double-time-multiplier}}).",
  ],
  ejemplo: [
    "At J$600 an hour, 45 hours plus 8 hours on a public holiday pays J$24,000 for normal time, J$4,500 for overtime and J$9,600 for double time. That is J$38,100.",
  ],
  faq: [
    {
      pregunta: "How much is overtime at minimum wage?",
      respuesta: "With the minimum of {{jm.minimum-wage-hourly}} an hour, overtime is J$637.50 an hour and double time J$850 an hour.",
    },
    {
      pregunta: "Is overtime counted by the day or by the week?",
      respuesta: "Under the National Minimum Wage Order it is counted by the week: the time above {{jm.normal-week-hours}} in that week.",
    },
    {
      pregunta: "Do I get a rest day?",
      respuesta: "Yes. The National Minimum Wage Order gives one rest day a week. You and your employer agree which day it is.",
    },
  ],
  glosario: [
    { termino: "Double time", definicion: "Twice the normal hourly rate, for work on a rest day or a public holiday." },
    { termino: "Rest day", definicion: "The day off in each week agreed with your employer." },
  ],
});
