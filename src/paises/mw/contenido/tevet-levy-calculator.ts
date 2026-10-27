import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.tevet-levy-calculator",
  h1: "TEVET levy calculator Malawi",
  title: "TEVET levy calculator Malawi: 1% of basic payroll",
  description:
    "Work out your TEVET levy: {{mw.tevet-rate}} of the basic annual payroll, collected by the MRA for TEVETA, with the penalty if it is not paid.",
  intro: [
    "Enter your basic payroll for the year to see the TEVET levy you owe and the monthly instalment if you spread it out.",
    "The MRA has collected the levy on behalf of TEVETA since 1 November 2015.",
  ],
  comoSeCalcula: [
    "The levy is {{mw.tevet-rate}} of the basic annual payroll paid to employees.",
    "You can pay it in monthly instalments over up to twelve months.",
    "If it goes unpaid, an extra {{mw.tevet-penalty}} of the unpaid levy becomes due as a penalty.",
  ],
  ejemplo: ["A business with a basic payroll of MK 60,000,000 a year owes MK 600,000, or MK 50,000 a month over twelve months."],
  faq: [
    {
      pregunta: "Who has to pay the TEVET levy?",
      respuesta: "Employers. They register with the MRA for the levy and pay it on the basic payroll of their staff.",
    },
    {
      pregunta: "Can I claim training costs back?",
      respuesta: "Compliant employers can be reimbursed up to 20% of the direct cost of TEVETA approved in-house training, capped at 20% of the levy paid the year before.",
    },
    {
      pregunta: "Is the levy tax deductible?",
      respuesta: "Yes. The MRA says any levy paid under the TEVET Act is deductible under the Taxation Act.",
    },
  ],
  glosario: [
    { termino: "TEVETA", definicion: "The Technical, Entrepreneurial and Vocational Education and Training Authority." },
    { termino: "Basic payroll", definicion: "The total basic pay of all employees, without allowances." },
  ],
});
