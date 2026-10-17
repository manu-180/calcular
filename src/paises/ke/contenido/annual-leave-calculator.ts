import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.annual-leave-calculator",
  h1: "Annual leave calculator Kenya",
  title: "Annual leave calculator Kenya: days due and leave pay",
  description: "Work out your leave days under the Employment Act: {{ke.annual-leave-days}} working days a year, or {{ke.leave-days-per-month}} days per completed month if you leave early.",
  intro: [
    "Every employee earns paid annual leave. Enter how long you have worked this leave year and the days already taken.",
    "Add your monthly pay to see what the days still due are worth, for example when you leave the job.",
  ],
  comoSeCalcula: [
    "After 12 consecutive months of service you get at least {{ke.annual-leave-days}} working days of leave with full pay.",
    "If your job ends after two or more completed months of the leave year, you get {{ke.leave-days-per-month}} days for each completed month.",
    "Days still due are the days earned less the days you took.",
  ],
  ejemplo: ["After a full year with 5 days taken, 16 days are still due. On KSh 52,000 a month divided by 26, they are worth KSh 32,000."],
  faq: [
    {
      pregunta: "Can I split my leave?",
      respuesta: "Yes, if you agree with your employer. One part should be at least two uninterrupted working weeks.",
    },
    {
      pregunta: "When must I take the rest?",
      respuesta: "Within 18 months from the end of the leave year in which you earned it.",
    },
    {
      pregunta: "Does maternity leave reduce annual leave?",
      respuesta: "No. The Act says you keep your annual leave when you take maternity leave.",
    },
  ],
  glosario: [{ termino: "Leave year", definicion: "The 12 consecutive months of service in which you earn your leave." }],
});
