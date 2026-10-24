import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.notice-period",
  h1: "UAE notice period calculator",
  title: "Notice period UAE: payment in lieu of notice",
  description:
    "Work out the payment in lieu of notice under the UAE Labour Law, with notice periods of {{ae.notice-period[minimum]}} to {{ae.notice-period[maximum]}}.",
  intro: [
    "In the UAE either side can end an employment contract for a legitimate reason by giving written notice.",
    "If the notice isn't worked, the side that didn't respect it pays the other the wage for the notice period. Enter your details to see how much.",
  ],
  comoSeCalcula: [
    "The notice period is the one in the contract, but not less than {{ae.notice-period[minimum]}} and not more than {{ae.notice-period[maximum]}}.",
    "The compensation equals your wage for the whole notice period, or the part not worked.",
    "It uses the last wage you received.",
  ],
  ejemplo: ["On AED 12,000 a month with 60 days of notice and 20 already worked, the compensation for the other 40 days is AED 16,000."],
  faq: [
    {
      pregunta: "What is the notice period in the UAE?",
      respuesta: "Whatever your contract says, between {{ae.notice-period[minimum]}} and {{ae.notice-period[maximum]}}. It has to be the same for both sides unless a difference favours the worker.",
    },
    {
      pregunta: "Am I paid during the notice period?",
      respuesta: "Yes. The contract stays in force and you get your full wage, and you must work if the employer asks you to.",
    },
    {
      pregunta: "Can we agree to skip the notice?",
      respuesta: "Yes, you can agree to waive or shorten it, while keeping your rights for the notice period in the contract.",
    },
  ],
  glosario: [
    { termino: "Notice period", definicion: "The warning period before a contract ends, set in the contract within the legal limits." },
    { termino: "Payment in lieu of notice", definicion: "The wage paid for the notice period, or the part of it not worked." },
  ],
});
