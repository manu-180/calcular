import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.take-home-salary-calculator",
  h1: "Take-home salary calculator Pakistan",
  title: "Take-home salary calculator 2026-27 Pakistan",
  description: "See your monthly take-home salary after income tax for tax year 2027 and your EOBI contribution of {{pk.eobi-employee}} of the minimum wage.",
  intro: ["Enter your gross monthly salary to see what reaches your account after income tax and EOBI."],
  comoSeCalcula: [
    "Income tax is worked out on the yearly salary with the salaried slabs for tax year 2027, then divided by 12.",
    "If you are registered with EOBI, you pay {{pk.eobi-employee}} of the minimum wage of {{pk.minimum-wage}} each month.",
    "Take-home salary is gross salary minus tax, EOBI and any other deductions you enter.",
  ],
  ejemplo: ["On Rs. 300,000 a month, tax is about Rs. 34,667 and EOBI Rs. 407, so you take home about Rs. 264,926."],
  faq: [
    {
      pregunta: "Why is EOBI so small?",
      respuesta: "EOBI is worked out on the minimum wage, not on your full salary. Your employer pays {{pk.eobi-employer}} of the same base.",
    },
    {
      pregunta: "Does a provincial minimum wage change EOBI?",
      respuesta: "EOBI uses the minimum wage declared for unskilled workers. Provinces can declare their own, so your deduction can differ a little.",
    },
    {
      pregunta: "Are allowances taxed?",
      respuesta: "Most allowances are part of taxable salary. Enter the taxable amount from your payslip for the closest result.",
    },
  ],
  glosario: [
    { termino: "Take-home salary", definicion: "What reaches your bank after deductions." },
    { termino: "EOBI", definicion: "Employees' Old-Age Benefits Institution, which pays old-age pensions." },
  ],
});
