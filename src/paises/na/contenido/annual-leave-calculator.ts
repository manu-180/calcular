import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.annual-leave-calculator",
  h1: "Annual leave calculator Namibia",
  title: "Annual leave calculator Namibia: days and leave pay",
  description:
    "Every employee gets at least {{na.annual-leave-weeks}} consecutive weeks of paid annual leave. See your days for the cycle, what you have earned and what it is worth.",
  intro: [
    "The Labour Act gives every employee at least four consecutive weeks of annual leave on full pay for each 12-month leave cycle.",
    "Enter the days you work in a week and how far you are into the cycle to see your leave days and their value.",
  ],
  comoSeCalcula: [
    "Leave for a full cycle: {{na.annual-leave-weeks}} weeks times the days you work in a normal week. A five-day week gives 20 working days and a six-day week gives 24.",
    "Leave earned so far: the full-cycle days times the months worked, divided by 12.",
    "Pay for one leave day: monthly pay divided by {{na.weeks-per-month}} times your work days a week.",
  ],
  ejemplo: [
    "On a six-day week you get 24 days a cycle. After seven months you have earned 14 days. With 5 taken and N$9,000 a month, the 9 days left are worth N$3,115.62.",
  ],
  faq: [
    {
      pregunta: "When do I have to take my leave?",
      respuesta: "Your employer decides when, but the leave must be taken within four months after the cycle ends, or six months if you agree in writing.",
    },
    {
      pregunta: "Can I sell my leave for cash?",
      respuesta: "No. Your employer may not pay you instead of giving you leave, even if you ask. The only exception is when your employment ends.",
    },
    {
      pregunta: "What if a public holiday falls during my leave?",
      respuesta: "You get an extra day of paid leave if the holiday falls on a day you would normally work.",
    },
    {
      pregunta: "What happens to my leave when I leave the job?",
      respuesta: "Your employer must pay out leave for completed cycles and a pro rata amount for the current cycle.",
    },
  ],
  glosario: [
    { termino: "Leave cycle", definicion: "Each period of 12 consecutive months with the same employer, counted from your start date." },
    { termino: "Pro rata", definicion: "In proportion to the part of the cycle you have worked." },
  ],
});
