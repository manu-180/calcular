import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.fixed-term-contract",
  h1: "Fixed-term contract termination calculator Malta",
  title: "Ending a fixed-term contract early in Malta: what is owed",
  description:
    "Work out the compensation when a fixed-term contract in Malta ends early: half the wages for the time left, whether the employer or the employee ends it.",
  intro: [
    "A contract of service for a fixed term in Malta can be ended early by either side, but the side that ends it has to pay compensation.",
    "Enter the weekly wage, the last day of work and the end date in the contract. You get the amount due and who pays it.",
  ],
  comoSeCalcula: [
    "Work out the full wages for the time left between the last day of employment and the end date in the contract.",
    "If the employer ends the contract early, it pays the employee half of those wages.",
    "If the employee leaves early, the employee pays the employer half of those wages.",
    "The wages used are the basic wage only, without overtime, bonuses, allowances, payments in kind or commissions.",
  ],
  ejemplo: ["An employee on €500 a week whose contract is ended 70 days early is owed half of ten weeks' wages: €2,500."],
  faq: [
    {
      pregunta: "Does this apply during probation?",
      respuesta: "No. During the probationary period either side can end the employment without a reason. After one month of service, a week's notice is needed.",
    },
    {
      pregunta: "How long can a probationary period be on a fixed-term contract?",
      respuesta: "It has to be in proportion to the length of the contract. The probation period calculator works it out.",
    },
    {
      pregunta: "Which law sets this?",
      respuesta: "Article 36(11) and (12) of the Employment and Industrial Relations Act.",
    },
  ],
  glosario: [
    { termino: "Fixed-term contract", definicion: "A contract of service that ends on a date or event stated in the contract." },
    { termino: "Full wages", definicion: "The basic wage, without overtime, bonuses, allowances, payments in kind or commissions." },
  ],
});
