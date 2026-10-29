import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.private-provident-fund-calculator",
  h1: "Private provident fund calculator Bhutan",
  title: "Private provident fund in Bhutan: your {{bt.pf-private-employee-min}} minimum",
  description: "Work out your NPPF private provident fund contribution. The guidelines set a minimum of {{bt.pf-private-employee-min}} of basic salary, matched by your employer.",
  intro: [
    "In the National Pension and Provident Fund's private sector scheme, an employee contributes at least {{bt.pf-private-employee-min}} of basic salary, and the employing agency makes a matching contribution on the employee's behalf.",
    "A self-employed person, owner or partner who joins the scheme contributes at least {{bt.pf-private-self-employed-min}} of total income. The rules are in the Private Provident Fund Scheme Guidelines 2021 of the NPPF.",
  ],
  comoSeCalcula: [
    "Employee: multiply basic salary by your rate. The rate cannot be lower than {{bt.pf-private-employee-min}}, but the contract or company rules may set a higher one.",
    "The employer matches your contribution, so the amount paid into your account each month is double your own share.",
    "Self-employed: multiply total income by your rate, which cannot be lower than {{bt.pf-private-self-employed-min}}. There is no employer share.",
    "The employer must remit both shares, shown separately, on or before the {{bt.pf-remit-day}}th of the following month.",
  ],
  ejemplo: [
    "You are an employee on a basic salary of Nu. 25,000 and contribute 5 %. Your share is Nu. 1,250 and your employer adds Nu. 1,250, so Nu. 2,500 goes into your provident fund account each month. Over 12 months that is Nu. 30,000. If you were self-employed on Nu. 60,000 at the 10 % minimum, you would pay Nu. 6,000 a month yourself.",
  ],
  faq: [
    {
      pregunta: "What is the minimum private provident fund contribution in Bhutan?",
      respuesta: "For an employee, not lower than {{bt.pf-private-employee-min}} of basic salary or of the total income of the period (clause 9(A)(i) of the NPPF Private Provident Fund Scheme Guidelines 2021).",
    },
    {
      pregunta: "Does my employer have to contribute too?",
      respuesta: "Yes. Clause 9(B)(i) says the employing agency makes a matching contribution on behalf of the employee.",
    },
    {
      pregunta: "When must contributions be paid in?",
      respuesta: "Employers remit both shares on or before the {{bt.pf-remit-day}}th of the following month, or at the end of the agreed period (clause 9(B)(ii)).",
    },
    {
      pregunta: "What about someone who works for themselves?",
      respuesta: "A self-employed individual, owner or partner may contribute at least {{bt.pf-private-self-employed-min}} of the total income of the period (clause 9(C)(i)).",
    },
  ],
  glosario: [
    { termino: "Basic salary", definicion: "The basic pay under the rules and regulations of the firm. Allowances are not part of it." },
    { termino: "Matching contribution", definicion: "An employer payment equal to the employee's own contribution." },
    { termino: "NPPF", definicion: "The National Pension and Provident Fund, trustee of the scheme." },
  ],
});
