import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.employer-cost-calculator",
  h1: "Employer cost calculator Malawi",
  title: "Employer cost calculator Malawi: pension and TEVET",
  description:
    "Work out what an employee really costs in Malawi: gross pay plus the {{mw.pension-employer}} employer pension contribution and the {{mw.tevet-rate}} TEVET levy.",
  intro: [
    "Enter the basic pay and other guaranteed earnings to see the full monthly cost of an employee.",
    "The calculator adds the two payroll costs every employer carries: the pension contribution and the TEVET levy.",
  ],
  comoSeCalcula: [
    "Employer pension contribution: at least {{mw.pension-employer}} of pensionable pay, which is guaranteed wages and other earnings.",
    "TEVET levy: {{mw.tevet-rate}} of the basic payroll, collected by the MRA for TEVETA.",
    "PAYE and the employee's own pension come out of gross pay, so they do not add to the cost.",
  ],
  ejemplo: ["For basic pay of MK 500,000 the employer pays MK 50,000 into the pension and MK 5,000 of TEVET levy. The employee costs MK 555,000 a month."],
  faq: [
    {
      pregunta: "Is the TEVET levy deductible for income tax?",
      respuesta: "Yes. The MRA says any levy paid under the TEVET Act is deductible under the Taxation Act.",
    },
    {
      pregunta: "What happens if an employer does not pay the TEVET levy?",
      respuesta: "A penalty of 20% of the unpaid levy becomes due on top of the levy, and TEVETA can recover it as a civil debt.",
    },
    {
      pregunta: "Does fringe benefit tax add to the cost?",
      respuesta: "Yes, if you give staff benefits such as a car, housing or school fees. Fringe benefit tax is paid by the employer and is not included here.",
    },
  ],
  glosario: [
    { termino: "TEVET levy", definicion: "A payroll levy that funds technical, entrepreneurial and vocational education and training." },
    { termino: "Basic payroll", definicion: "The total basic pay of all employees, without allowances." },
  ],
});
