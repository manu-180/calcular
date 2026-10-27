import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.leave-days-calculator",
  h1: "Leave days and leave pay calculator",
  title: "Leave days calculator Zambia: days earned and leave pay",
  description:
    "Work out your annual leave days at {{zm.leave-days-per-month}} days a month and what they are worth with the Employment Code formula: full pay × days ÷ {{zm.leave-pay-divisor}}.",
  intro: [
    "Enter your monthly pay, the months that count and the days you have taken. You get the days still due and the leave pay for them.",
    "Use it for leave pay on a payslip, for selling leave days back to your employer, or for the leave due when a contract ends.",
  ],
  comoSeCalcula: [
    "You earn at least {{zm.leave-days-per-month}} days of annual leave for every month of continuous service.",
    "Leave pay follows the Fifth Schedule of the Employment Code: full pay multiplied by the days due, divided by {{zm.leave-pay-divisor}}.",
  ],
  ejemplo: ["After 12 months on K5,200 a month you have 24 days due, worth K5,200 × 24 ÷ 26 = K4,800."],
  faq: [
    {
      pregunta: "Who is entitled to annual leave?",
      respuesta: "Every employee other than a temporary or casual employee who has been with the same employer for 12 consecutive months.",
    },
    {
      pregunta: "Can my employer pay me instead of giving me leave?",
      respuesta: "Yes, if you agree. And if your contract ends with leave still due, your employer has to pay you for the accumulated days.",
    },
    {
      pregunta: "Do public holidays count as leave days?",
      respuesta: "No. Annual leave comes on top of public holidays and weekly rest days.",
    },
    {
      pregunta: "Does maternity leave reduce my annual leave?",
      respuesta: "No. A female employee keeps her annual leave entitlement after maternity leave.",
    },
  ],
  glosario: [
    { termino: "Full pay", definicion: "Your monthly pay used in the leave formula." },
    { termino: "Commutation of leave", definicion: "Being paid for leave days instead of taking them." },
  ],
});
