import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.notice-period",
  h1: "Oman notice period calculator",
  title: "Notice period to end a job in Oman and pay in lieu",
  description:
    "Work out the notice period to end an open-ended employment contract in Oman, its last day and the pay owed for days not worked, based on the last total wage.",
  intro: [
    "Either side of an open-ended employment contract can end it for a legitimate reason with written notice given before the end date.",
    "Choose how the wage is paid and the notice date to see the period, its last day and the compensation if it is cut short.",
  ],
  comoSeCalcula: [
    "Notice is {{om.notice[monthly]}} for workers on a monthly wage and {{om.notice[other]}} for others, unless the contract sets a longer period.",
    "Whoever ends the contract without giving notice owes the other side compensation for the period or what is left of it.",
    "Compensation is based on the last total wage, divided by the number of days per month you choose.",
  ],
  ejemplo: [
    "A worker on a total monthly wage of OMR 600 gets notice on 1 November 2026: the 30 days end on 1 December 2026. If the job ended at once, the worker would be owed OMR 600.",
  ],
  faq: [
    {
      pregunta: "How long is the notice period under Oman Labour Law?",
      respuesta: "{{om.notice[monthly]}} for workers on a monthly wage and {{om.notice[other]}} for others, unless the contract sets a longer period.",
    },
    {
      pregunta: "Does notice start while I am on leave?",
      respuesta: "No. Notice from the employer given while the worker is on leave only starts the day after the leave ends.",
    },
    {
      pregunta: "Do I get time to look for work during notice?",
      respuesta: "Yes. The employer has to let the worker take ten paid hours a week off to look for a new job, and the worker must say when they find one.",
    },
  ],
  glosario: [
    { termino: "Notice", definicion: "Written warning from one side of the contract to the other that the contract will end on a later date." },
    { termino: "Total wage", definicion: "The basic wage plus all allowances." },
  ],
});
