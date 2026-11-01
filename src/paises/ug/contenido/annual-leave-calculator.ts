import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.annual-leave-calculator",
  h1: "Annual leave calculator Uganda",
  title: "Annual leave calculator Uganda: days and leave pay",
  description: "Work out your annual leave in Uganda: {{ug.leave-days-per-4-months}} for every four months of continuous service, plus the pay for days not taken when you leave.",
  intro: [
    "The Employment Act gives you paid annual leave for every four months you work in a calendar year.",
    "Enter the months you have worked to see the days you have earned and what unused days are worth.",
  ],
  comoSeCalcula: [
    "You earn {{ug.leave-days-per-4-months}} of leave with full pay for each period of four months of continuous service. A full year gives three periods.",
    "The right starts once you have worked {{ug.leave-min-months}} for the employer and normally work 16 hours a week or more.",
    "When the job ends you are entitled to leave in proportion to the time worked, or to pay instead of it.",
  ],
  ejemplo: ["After a full calendar year you have earned 21 days. On Ushs 1,000,000 a month and a five-day week, each day is worth about Ushs 46,154."],
  faq: [
    {
      pregunta: "Can I give up my leave for extra pay?",
      respuesta: "No. The Act says any agreement to give up the minimum annual leave, for money or otherwise, is null and void. Pay in lieu is only for leave left when the job ends.",
    },
    {
      pregunta: "Are public holidays part of annual leave?",
      respuesta: "No. You get every public holiday off with full pay. If you work on one, you get another day off with full pay, unless you were paid at least double for that day.",
    },
    {
      pregunta: "When do I take my leave?",
      respuesta: "During the calendar year, at a time you and your employer agree.",
    },
    {
      pregunta: "Does unused leave count towards my notice period?",
      respuesta: "No. Outstanding leave on termination is not included in the notice period.",
    },
  ],
  glosario: [{ termino: "Continuous service", definicion: "Unbroken employment with the same employer." }],
});
