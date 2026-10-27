import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.notice-period",
  h1: "Notice period calculator Malta",
  title: "Notice period Malta: weeks by length of service",
  description:
    "Work out the notice period in Malta for resigning or being dismissed, from one week up to {{mt.notice-weeks[maximum]}} weeks, and the pay due if notice is not given.",
  intro: [
    "On a contract for an indefinite time, both you and your employer have to give notice to end it. The length depends on how long you have worked for the same employer.",
    "Enter your start date and the date notice is given. You get the notice period, when it ends and, if you add your wage, the pay due if notice is not given.",
  ],
  comoSeCalcula: [
    "More than one month and up to six months: {{mt.notice-weeks[over-1-month]}} week. More than six months and up to two years: {{mt.notice-weeks[over-6-months]}} weeks.",
    "More than two years and up to four: {{mt.notice-weeks[over-2-years]}} weeks. More than four years and up to seven: {{mt.notice-weeks[over-4-years]}} weeks.",
    "After seven years, one more week for every year or part of a year, up to {{mt.notice-weeks[maximum]}} weeks.",
    "The notice starts on the working day after it is given.",
  ],
  ejemplo: ["With three years and one month of service, the notice period is {{mt.notice-weeks[over-2-years]}} weeks for both sides."],
  faq: [
    {
      pregunta: "What if my employer does not give notice?",
      respuesta: "The employer has to pay you the wages for the whole notice period.",
    },
    {
      pregunta: "What if I resign without notice?",
      respuesta: "You owe the employer half the wages for the notice period.",
    },
    {
      pregunta: "Can my employer ask me to stop working during the notice period?",
      respuesta:
        "When you resign, your employer can let you work until the end or pay you the wages for the rest of the notice period. When your employer gives notice, you can ask to be paid half the wages for the rest of the period instead of working it.",
    },
    {
      pregunta: "Can notice be given during maternity leave?",
      respuesta: "No. Notice of termination cannot be given during maternity leave.",
    },
  ],
  glosario: [
    { termino: "Contract for an indefinite time", definicion: "An employment contract with no end date." },
    { termino: "Wages", definicion: "For notice pay, the basic wage without overtime, bonuses, allowances or commissions." },
  ],
});
