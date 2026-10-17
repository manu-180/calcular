import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.notice-period-calculator",
  h1: "Notice period calculator Kenya",
  title: "Notice period calculator Kenya: days and pay in lieu",
  description: "Find the minimum notice to end a job in Kenya: {{ke.notice-days-monthly}} days for monthly pay, one pay period for weekly pay, and the pay in lieu of notice.",
  intro: [
    "Either side can end an employment contract by giving written notice. How much depends on how often you are paid.",
    "Instead of notice, either side can pay what would have been earned during the notice period.",
  ],
  comoSeCalcula: [
    "Paid monthly or less often: {{ke.notice-days-monthly}} days' written notice.",
    "Paid weekly or every two weeks: the contract ends at the end of the next pay period after written notice.",
    "Paid daily: the contract can end at the close of any day without notice.",
    "If your contract gives longer notice, the longer period applies.",
  ],
  ejemplo: ["On KSh 50,000 a month you must give or receive {{ke.notice-days-monthly}} days' notice, or KSh 50,000 in lieu."],
  faq: [
    {
      pregunta: "Does notice have to be in writing?",
      respuesta: "Yes. If the employee cannot understand it, the employer must explain it orally in a language the employee understands.",
    },
    {
      pregunta: "Can my employer pay me instead of giving notice?",
      respuesta: "Yes. Either party can end the contract at once by paying the pay for the notice period.",
    },
    {
      pregunta: "Is redundancy notice different?",
      respuesta: "Yes. For redundancy the employer must give at least one month's notice or one month's wages in lieu.",
    },
  ],
  glosario: [{ termino: "Pay in lieu of notice", definicion: "Money paid instead of working out the notice period." }],
});
