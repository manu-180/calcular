import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.notice-period-calculator",
  h1: "Notice period calculator Zambia",
  title: "Notice period Zambia: how much notice the law requires",
  description:
    "Check the minimum notice under the Employment Code when the contract says nothing: from 24 hours up to {{zm.notice-days-long}} days, with the date it runs out.",
  intro: [
    "Choose how long the contract of employment is and the day notice is given. You get the minimum notice and the date it runs until.",
    "These periods apply when the contract does not set its own notice period.",
  ],
  comoSeCalcula: [
    "Contract of one month or less: {{zm.notice-hours-monthly}} of notice.",
    "More than one month and up to three months: {{zm.notice-days-short}}.",
    "More than three months: {{zm.notice-days-long}}. If the contract is longer than six months, the notice must be in writing.",
  ],
  ejemplo: ["Notice given on 1 November 2026 on a permanent contract runs for 30 days, until 1 December 2026."],
  faq: [
    {
      pregunta: "Can my employer pay me instead of giving notice?",
      respuesta: "Yes. An employer who does not give notice has to pay the wages you would have earned during the notice period.",
    },
    {
      pregunta: "Can notice be given while I am on leave?",
      respuesta: "No. Notice cannot be given during leave taken under the Code, and it cannot run at the same time as that leave.",
    },
    {
      pregunta: "What if I refuse to work my notice?",
      respuesta: "Your employer can deduct from your final dues what you would have earned during the notice period.",
    },
    {
      pregunta: "Is salary in lieu of notice taxed?",
      respuesta: "No. ZRA lists salary in lieu of notice among the payments exempt from PAYE.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "The wages for the notice period, paid instead of letting you work it." },
  ],
});
