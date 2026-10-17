import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.paternity-leave-pay",
  h1: "Paternity leave pay calculator Hong Kong",
  title: "Paternity leave pay calculator Hong Kong",
  description:
    "Fathers in Hong Kong get {{hk.paternity-leave-days}} of paternity leave for each birth. Work out the pay at {{hk.leave-pay-fraction}} of your average daily wages.",
  intro: [
    "A male employee on a continuous contract gets {{hk.paternity-leave-days}} of paternity leave for each confinement of his spouse or partner.",
    "After 40 weeks on a continuous contract the leave is paid. Enter your wages to see how much.",
  ],
  comoSeCalcula: [
    "Paternity leave pay is {{hk.leave-pay-fraction}} of your average daily wages for each day taken.",
    "The average uses the 12 months before the first day of leave, leaving out days without full pay and what was paid for them.",
    "You can take the days together or separately, from 4 weeks before the expected birth to 14 weeks after it.",
  ],
  ejemplo: ["With an average daily wage of $600, each day of paternity leave pays $480, so five days pay $2,400."],
  faq: [
    {
      pregunta: "How many days of paternity leave do I get in Hong Kong?",
      respuesta: "{{hk.paternity-leave-days}} for each confinement. You don't have to be married to the child's mother.",
    },
    {
      pregunta: "How much notice do I give my employer?",
      respuesta: "Tell your employer you intend to take it at least 3 months before the expected birth. Otherwise, give the dates at least 5 days before the leave.",
    },
    {
      pregunta: "What do I need to get paid?",
      respuesta: "The child's birth certificate naming you as the father, given within 12 months of the first day of leave (or within 6 months of leaving the job).",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The delivery of a child." },
    { termino: "Paternity leave pay", definicion: "Pay for paternity leave days at four-fifths of your average daily wages." },
  ],
});
