import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.redundancy-pay-calculator",
  h1: "Redundancy pay calculator Zambia",
  title: "Redundancy pay calculator Zambia: your minimum package",
  description:
    "Minimum redundancy package under the Employment Code: {{zm.redundancy-months}} of basic pay per year served. Also covers death in service and medical discharge.",
  intro: [
    "Choose why the job ended, then enter the basic pay and the completed years of service.",
    "The result is the legal minimum. A collective agreement or your contract can give you more, never less.",
  ],
  comoSeCalcula: [
    "Redundancy: at least {{zm.redundancy-months}} of basic pay for every year served.",
    "Death in service: {{zm.redundancy-months}} of basic pay for each year served, paid to the estate if needed.",
    "Medical discharge: at least {{zm.medical-discharge-months}} of basic pay for each completed year of service, on top of other accrued benefits.",
  ],
  ejemplo: ["Five years on basic pay of K6,000 ends in a redundancy package of at least 10 months' pay, K60,000."],
  faq: [
    {
      pregunta: "Is redundancy pay taxed?",
      respuesta: "No. ZRA lists redundancy pay, severance pay and salary in lieu of notice among the payments exempt from PAYE.",
    },
    {
      pregunta: "What must the employer do before a redundancy?",
      respuesta: "Give at least 30 days' notice to you or your representative, consult on ways to limit the job losses, and notify a labour officer at least 60 days before the terminations.",
    },
    {
      pregunta: "Who does not get severance pay?",
      respuesta: "Casual and temporary employees, employees on a long-term contract (they get gratuity instead) and employees still on probation.",
    },
    {
      pregunta: "When must it be paid?",
      respuesta: "No later than your last day of duty. If the employer cannot pay by then, it has to keep paying your full wages until it does.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "Losing your job because the business closes, needs fewer people for your kind of work, or changes your conditions for the worse without your consent." },
    { termino: "Basic pay", definicion: "The standard rate of pay before allowances and bonuses, for up to one month." },
  ],
});
