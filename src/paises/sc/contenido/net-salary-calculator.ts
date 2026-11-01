import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.net-salary-calculator",
  h1: "Seychelles net salary calculator {{anio}}",
  title: "Seychelles take-home pay {{anio}}: gross to net",
  description: "Turn gross monthly pay into take-home pay after income tax and the {{sc.spf-employee-rate}} Seychelles Pension Fund contribution.",
  intro: [
    "Enter your gross monthly pay and see what reaches your bank account. Two statutory deductions come off a citizen's pay: income tax and the employee share of the Seychelles Pension Fund.",
    "The calculator uses the SRC monthly bands in force since {{sc.income-tax-bands#desde}} and the pension rate in force since {{sc.spf-employee-rate#desde}}.",
  ],
  comoSeCalcula: [
    "Income tax: {{sc.income-tax-bands[0].tasa}} % up to {{sc.income-tax-bands[0].hasta}}, then {{sc.income-tax-bands[1].tasa}} %, {{sc.income-tax-bands[2].tasa}} % and {{sc.income-tax-bands[3].tasa}} % on the slices above.",
    "Pension: {{sc.spf-employee-rate}} of your gross pay goes to the Seychelles Pension Fund (SPF).",
    "Take-home pay is gross pay less income tax and the SPF contribution.",
  ],
  ejemplo: [
    "With gross pay of SCR 25,000, income tax is SCR 3,216.68 and the SPF contribution is SCR 1,250. You take home SCR 20,533.32, which is 82.1 % of your gross pay.",
  ],
  faq: [
    {
      pregunta: "How much does an employee pay to the SPF?",
      respuesta: "The SPF raised the employee rate from 4 % to 5 % on 1 January 2023. The employer pays its own share on top, and it is not deducted from your pay.",
    },
    {
      pregunta: "Is the 13th month pay included?",
      respuesta: "No. The thirteenth month pay is a separate payment due under section 46C of the Employment Act, so it is not part of this monthly figure.",
    },
    {
      pregunta: "Why does my payslip differ?",
      respuesta: "Your payslip may show a loan, a union fee or a benefit taxed in kind. The calculator shows only the statutory deductions.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "What you earn before any deduction, with allowances included." },
    { termino: "SPF", definicion: "The Seychelles Pension Fund, which collects mandatory pension contributions from employees, employers and the self-employed." },
    { termino: "Take-home pay", definicion: "The amount paid into your account once tax and pension are taken off." },
  ],
});
