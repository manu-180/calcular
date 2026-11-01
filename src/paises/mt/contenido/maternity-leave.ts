import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.maternity-leave",
  h1: "Maternity leave calculator Malta",
  title: "Maternity leave Malta: {{mt.maternity-leave[total]}} weeks, dates and pay",
  description:
    "Work out when your {{mt.maternity-leave[total]}} weeks of maternity leave in Malta start and end, and the {{mt.maternity-leave[paid]}} weeks your employer pays in full.",
  intro: [
    "A pregnant employee in Malta is entitled to {{mt.maternity-leave[total]}} weeks of uninterrupted maternity leave.",
    "Enter the expected date of birth and how many extra weeks you want before it. You get the start and end dates and the weeks paid by your employer.",
  ],
  comoSeCalcula: [
    "{{mt.maternity-leave[before]}} weeks are taken right before the expected date of birth, unless you and your employer agree otherwise.",
    "{{mt.maternity-leave[after]}} weeks right after the birth are compulsory.",
    "The other weeks can go before or after those periods, as you ask.",
    "Your employer pays full wages for the first {{mt.maternity-leave[paid]}} weeks.",
  ],
  ejemplo: ["With a due date of 15 March 2027 and the usual split, leave runs from 15 February to 20 June 2027."],
  faq: [
    {
      pregunta: "When do I have to tell my employer?",
      respuesta: "In writing, at least four weeks before the leave starts, as far as reasonably practicable.",
    },
    {
      pregunta: "Can I be dismissed during maternity leave?",
      respuesta: "Notice of termination cannot be given during maternity leave.",
    },
    {
      pregunta: "Does annual leave keep accruing?",
      respuesta: "Yes. Annual leave keeps accruing during maternity leave, and leave you could not take that year moves to the next one.",
    },
    {
      pregunta: "Do I get time off for ante-natal check-ups?",
      respuesta: "Yes, without loss of pay, when the examinations have to take place during working hours.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The legal word for giving birth." },
    { termino: "Maternity leave benefit", definicion: "A social security benefit that may cover maternity leave weeks the employer does not pay." },
  ],
});
