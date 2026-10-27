import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.annual-leave-calculator",
  h1: "Annual leave calculator Ethiopia",
  title: "Annual leave calculator Ethiopia: days and leave pay",
  description:
    "Find your annual leave under the Labour Proclamation: {{et.annual-leave-base}} working days in the first year plus one day for every two extra years.",
  intro: [
    "Every worker in Ethiopia has a right to paid annual leave that cannot be given up. Enter your years of service to see how many days you are owed and what the days still to take are worth.",
  ],
  comoSeCalcula: [
    "First year of service: {{et.annual-leave-base}} working days.",
    "After that you get one more working day for every {{et.annual-leave-step}} additional years of service.",
    "With less than a year of service, leave is proportional to the months worked.",
    "The value of a leave day is your monthly salary divided by the working days in your month. Article 77(3) counts {{et.days-in-month}} days of service as one month.",
  ],
  ejemplo: [
    "In your fifth year you have 18 working days. With a salary of ETB 13,000 and 26 working days a month, each day is worth ETB 500.",
  ],
  faq: [
    {
      pregunta: "Can my employer pay me instead of giving leave?",
      respuesta: "No. Paying wages in place of annual leave is prohibited, except when the contract ends. Then you are paid for the leave you have not taken.",
    },
    {
      pregunta: "Can I split or postpone my leave?",
      respuesta: "Leave can be taken in two parts if you ask and the employer agrees. It can be postponed, but not for more than two years.",
    },
    {
      pregunta: "What if I fall ill during my leave?",
      respuesta: "If you need treatment as an inpatient, your annual leave stops and your sick leave starts.",
    },
    {
      pregunta: "What am I paid during leave?",
      respuesta: "The same wage you would have received if you had kept working.",
    },
  ],
  glosario: [
    { termino: "Working day", definicion: "A day you would normally work. Rest days and public holidays are not counted." },
    { termino: "Leave schedule", definicion: "The plan your employer draws up each calendar year for when workers take leave." },
  ],
});
