import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.maternity-leave-pay",
  h1: "Maternity leave pay calculator Hong Kong",
  title: "Maternity leave pay Hong Kong: 14 weeks",
  description:
    "Work out your maternity leave pay in Hong Kong: {{hk.maternity-leave-weeks}} at {{hk.leave-pay-fraction}} of your average daily wages, with the {{hk.maternity-pay-cap}} cap on the last four weeks.",
  intro: [
    "A pregnant employee on a continuous contract gets {{hk.maternity-leave-weeks}} of maternity leave under the Employment Ordinance.",
    "If you've been employed for at least 40 weeks before the leave, it is paid. Enter your wages to see how much.",
  ],
  comoSeCalcula: [
    "The daily rate is {{hk.leave-pay-fraction}} of your average daily wages over the 12 months before the first day of leave.",
    "The first 10 weeks are paid in full at that rate.",
    "The pay for the 11th to 14th weeks is capped at {{hk.maternity-pay-cap}} in total.",
  ],
  ejemplo: ["With an average daily wage of $600, the daily rate is $480. Fourteen weeks pay $47,040 before tax."],
  faq: [
    {
      pregunta: "How long is maternity leave in Hong Kong?",
      respuesta: "{{hk.maternity-leave-weeks}}. It can be longer if the baby arrives after the expected date, and up to 4 more weeks for illness or disability due to the pregnancy or confinement.",
    },
    {
      pregunta: "When can I start maternity leave?",
      respuesta: "With your employer's agreement, 2 to 4 weeks before the expected date of confinement. If you don't choose a date, it starts 4 weeks before.",
    },
    {
      pregunta: "Who pays the last four weeks?",
      respuesta: "Your employer pays you. It can then apply to the Government to be reimbursed for the 11th to 14th weeks.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The delivery of a child." },
    { termino: "Average daily wages", definicion: "Your wages in the last 12 months divided by the days, after leaving out days without full pay." },
  ],
});
