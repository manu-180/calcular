import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.notice-period-calculator",
  h1: "Notice period calculator Bhutan",
  title: "Notice period in Bhutan: days and pay in lieu",
  description: "Work out how much notice you owe or are owed in Bhutan. The Act sets {{bt.notice-days-min}} as the floor. Enter your pay to see the pay in lieu.",
  intro: [
    "A contract of employment in Bhutan must give at least {{bt.notice-days-min}} of notice, and the same period binds the employer and the employee. This calculator turns that rule into a number of days and a sum of money.",
    "The Labour and Employment Act of Bhutan 2007 treats three cases differently: a normal resignation or dismissal, an ending during probation, and a redundancy. Pick the one that fits and the page applies the matching section.",
  ],
  comoSeCalcula: [
    "Normal case: at least {{bt.notice-days-min}} (section 68). If the contract says nothing, or is unwritten, the same minimum is deemed to apply (section 69).",
    "During probation: either side may end the contract with {{bt.probation-notice-days}} of notice (section 72).",
    "Redundancy: the {{bt.notice-days-min}} minimum plus {{bt.redundancy-extra-days-per-year}} for every year of continuous employment, with the extra days capped at {{bt.redundancy-extra-days-max}} (section 91).",
    "If your contract promises more notice than the Act, the longer period is the one that counts.",
    "Pay in lieu is the basic pay you would have earned during the notice period (section 83). We take one month of basic pay as the value of {{bt.notice-days-min}}.",
  ],
  ejemplo: [
    "You are made redundant after 4 complete years and your basic pay is Nu. 30,000 a month. The extra notice is 4 × {{bt.redundancy-extra-days-per-year}}, which is 28 days, so the total is 58 days. If the employer pays instead of letting you work the notice, the sum is 30,000 ÷ 30 × 58, or Nu. 58,000.",
  ],
  faq: [
    {
      pregunta: "How much notice must I give if I resign in Bhutan?",
      respuesta: "At least {{bt.notice-days-min}}. Section 68 of the Labour and Employment Act of Bhutan 2007 sets that floor for the employer and the employee alike, and section 70 says the length must be the same for both.",
    },
    {
      pregunta: "Can my employer pay me instead of giving notice?",
      respuesta: "Yes. Under section 83 either party can end the contract at once by paying a sum equal to the basic rate of pay the employee would have earned during the notice period.",
    },
    {
      pregunta: "Is notice shorter during probation?",
      respuesta: "Yes. A contract of one year or more may include a probation period, and during it either side may end the contract with {{bt.probation-notice-days}} of notice (section 72).",
    },
    {
      pregunta: "How is redundancy notice worked out?",
      respuesta: "Section 91 adds {{bt.redundancy-extra-days-per-year}} for each year of continuous employment to the normal notice, up to {{bt.redundancy-extra-days-max}} of extra notice. The employer must also consult the workers and tell the Chief Labour Administrator.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Money paid instead of working out the notice period." },
    { termino: "Redundancy", definicion: "The employer no longer needs the work or the skills of an employee (section 90)." },
    { termino: "Probation", definicion: "A trial period of up to {{bt.probation-max-days}} that a contract of one year or more may contain." },
  ],
});
