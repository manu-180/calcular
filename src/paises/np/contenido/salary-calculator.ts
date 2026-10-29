import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.salary-calculator",
  h1: "Salary calculator Nepal {{anio}}: gross to take-home",
  title: "Salary calculator Nepal {{anio}}: take-home pay after SSF, tax",
  description:
    "See your monthly take-home pay after the Social Security Fund contribution of {{np.ssf-employee-rate}} of basic pay and income tax at slabs from {{np.income-tax-bands[0].tasa}} to {{np.income-tax-bands[-1].tasa}}.",
  intro: [
    "Enter your gross pay for the month and see what reaches your bank account. The calculator takes off your Social Security Fund contribution and the income tax your employer withholds.",
    "It uses the income tax slabs of the 2083/84 income year and the contribution rates of the Fund. Tell it how much of your pay is basic pay, because the Fund works on basic pay only.",
  ],
  comoSeCalcula: [
    "The Fund keeps {{np.ssf-employee-rate}} of your basic pay. Of that, {{np.ssf-provident-rate}} is your provident fund share and the rest is the social security contribution. Your employer adds {{np.ssf-employer-rate}} on top, which is not taken from your pay.",
    "Twelve months of gross pay is your annual income. The provident share is deducted, up to the retirement cap of {{np.retirement-deduction-cap}} or one third of income. The Income Tax Act lets contributors skip the {{np.income-tax-bands[0].tasa}} band, so the first {{np.income-tax-bands[0].hasta}} of taxable income carries no tax for them.",
    "Above that the bands run at {{np.income-tax-bands[1].tasa}}, {{np.income-tax-bands[2].tasa}}, {{np.income-tax-bands[3].tasa}} and {{np.income-tax-bands[-1].tasa}}. The annual tax is divided by twelve to give the monthly withholding.",
  ],
  ejemplo: [
    "With gross pay of NPR 100,000 and basic pay of NPR 50,000, the Fund takes NPR 5,500 and income tax is NPR 1,166.67. Take-home pay is NPR 93,333.33.",
  ],
  faq: [
    {
      pregunta: "How much does the Social Security Fund take from my salary?",
      respuesta: "The Fund procedure says the employer deducts 11% of the worker's basic pay and adds 20% of the worker's basic pay, for a total of 31% paid into the Fund.",
    },
    {
      pregunta: "Is the SSF contribution taken from gross pay or basic pay?",
      respuesta: "From basic pay. Allowances are outside the contribution base, so a higher basic share means a higher deduction.",
    },
    {
      pregunta: "Why is my payslip different from this result?",
      respuesta: "Payslips can include allowances taxed on their own terms, loan repayments, insurance or deductions your employer agreed with you. Use the income tax calculator to add insurance premiums and the remote area allowance.",
    },
  ],
  glosario: [
    { termino: "Basic pay", definicion: "The fixed part of your pay before allowances. It is the base for the Fund contribution." },
    { termino: "SSF", definicion: "The Social Security Fund, which collects contributions from workers and employers." },
    { termino: "Provident fund", definicion: "The old-age savings part of the contribution, 10% from the worker and 10% from the employer." },
  ],
});
