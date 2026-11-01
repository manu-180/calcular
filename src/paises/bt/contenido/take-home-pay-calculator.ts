import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.take-home-pay-calculator",
  h1: "Take-home pay calculator Bhutan {{anio}}",
  title: "Take-home pay Bhutan {{anio}}: after tax and provident fund",
  description: "From gross salary to take-home pay in Bhutan. Takes off the {{bt.employment-deduction-rate}} employment deduction, income tax and your provident fund. Enter your pay.",
  intro: [
    "Since {{bt.pit-bands#desde}} an employee in Bhutan deducts {{bt.employment-deduction-rate}} of employment income, up to {{bt.employment-deduction-cap}} a year, and pays tax on the rest. This replaced the old deductions for provident fund and group insurance.",
    "Enter your monthly pay to see what reaches your account after income tax, your provident fund share and anything else your employer takes off.",
  ],
  comoSeCalcula: [
    "Multiply monthly gross pay by 12 and take off the employment deduction: {{bt.employment-deduction-rate}} of the total or {{bt.employment-deduction-cap}}, whichever is lower (section 44).",
    "Apply the bands of Schedule 1 to the result. Nothing up to {{bt.pit-bands[1].desde}}, then {{bt.pit-bands[1].tasa}}, {{bt.pit-bands[2].tasa}} and upward. Divide the tax by 12.",
    "Take your provident fund share from basic pay. The private scheme minimum is {{bt.pf-private-employee-min}}. Your employer's share is on top and does not leave your pay.",
    "Group insurance and other deductions are amounts you enter from your payslip.",
  ],
  ejemplo: [
    "Karma earns Nu. 50,000 a month, Nu. 600,000 a year. The deduction is Nu. 90,000, so taxable income is Nu. 510,000. Tax is Nu. 10,000 on the first Nu. 500,000 plus 10 % of Nu. 10,000, a total of Nu. 11,000, or Nu. 916.67 a month. Provident fund at 5 % is Nu. 2,500. Take-home pay is Nu. 46,583.33.",
  ],
  faq: [
    {
      pregunta: "Is my provident fund contribution still deductible?",
      respuesta: "Section 44 now gives one flat deduction for employment expenses, {{bt.employment-deduction-rate}} or {{bt.employment-deduction-cap}}, and this calculator does not take your own share off taxable income. Your employer's contribution to an approved fund stays outside your employment income, within the limits of the section on excluded amounts.",
    },
    {
      pregunta: "Why does my payslip show a different tax?",
      respuesta: "Rule 153 of the Rules on the Income Tax Act has employers withhold from monthly pay less 15 %, using the table in Annexure I. The table moves in steps and has no yearly ceiling, so the monthly figure can differ. The return for the year settles it.",
    },
    {
      pregunta: "Does this work for civil servants?",
      respuesta: "The tax part does. Civil service and armed forces provident fund rates are different from the private scheme, so enter the rate on your payslip.",
    },
    {
      pregunta: "Does it cover a second job or rent?",
      respuesta: "No. It takes one salary. The bands apply to your total taxable income, so a second source moves you up. Add it in the income tax calculator.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "Basic pay and allowances before anything is taken off." },
    { termino: "TDS", definicion: "Tax deducted at source: what your employer withholds and pays to the Department of Revenue and Customs." },
    { termino: "Basic pay", definicion: "Pay without allowances. Provident fund is worked out on it." },
  ],
});
