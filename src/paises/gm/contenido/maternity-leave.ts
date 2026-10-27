import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.maternity-leave",
  h1: "Maternity and paternity leave calculator for The Gambia",
  title: "Maternity leave calculator Gambia: leave dates and pay",
  description: "When does your maternity or paternity leave end? The Labour Act, 2023 gives {{gm.maternity-leave-months}} of paid maternity leave, and fathers get paternity leave.",
  intro: [
    "Choose maternity or paternity leave and the first day off to see your last day of leave and the day you go back to work.",
    "A mother is entitled to {{gm.maternity-leave-months}} of maternity leave with pay. A father can claim paid paternity leave of {{gm.paternity-leave-days}}, counted in working days, within six months of the birth.",
  ],
  comoSeCalcula: [
    "Maternity leave: {{gm.maternity-leave-months}}, counted in calendar months from the first day of leave.",
    "Paternity leave: {{gm.paternity-leave-days}}, counting working days from Monday to Friday.",
    "Pay during maternity leave: your monthly salary for each month of leave.",
  ],
  ejemplo: ["Maternity leave that starts on 1 November 2026 runs to 30 April 2027, and you are back at work on 1 May 2027."],
  faq: [
    {
      pregunta: "What do I need to start maternity leave?",
      respuesta: "A medical certificate from a medical officer showing the expected date of birth.",
    },
    {
      pregunta: "Can I be dismissed during maternity leave?",
      respuesta: "No. The Labour Act, 2023 says an employer shall not dismiss a female employee while she is absent on maternity leave.",
    },
    {
      pregunta: "Do I get breaks for breastfeeding when I return?",
      respuesta: "Yes. A nursing mother is entitled each working day to two breaks of thirty minutes or one break of one hour, at a time convenient to her.",
    },
  ],
  glosario: [
    { termino: "Nursing mother", definicion: "A woman breastfeeding a child up to eighteen months after delivery." },
    { termino: "Working day", definicion: "Here, Monday to Friday." },
  ],
});
