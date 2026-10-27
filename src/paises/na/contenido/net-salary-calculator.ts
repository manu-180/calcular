import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.net-salary-calculator",
  h1: "Net salary calculator Namibia",
  title: "Net salary calculator Namibia: take-home pay",
  description:
    "See your take-home pay after PAYE and Social Security at {{na.ssc-employee-rate}} of basic salary, with your pension contribution deducted before tax.",
  intro: [
    "Enter your basic salary, allowances and pension contribution and see what lands in your account each month.",
    "The calculator uses the NamRA income tax bands and the Social Security contribution with its current monthly ceiling of {{na.ssc-ceiling}}.",
  ],
  comoSeCalcula: [
    "Gross pay is your basic salary plus taxable allowances.",
    "PAYE: your yearly gross pay less your pension contribution (up to {{na.retirement-deduction-cap}} a year) goes through the income tax bands, then it is divided by 12.",
    "Social Security: {{na.ssc-employee-rate}} of your basic salary, counting at least {{na.ssc-floor}} and at most {{na.ssc-ceiling}} a month.",
    "Take-home pay is gross pay less PAYE, Social Security and your pension contribution.",
  ],
  ejemplo: [
    "With a basic salary of N$20,000 and nothing else, yearly pay is N$240,000 and PAYE is N$2,625 a month. Social Security is 0.9% of the N$12,500 ceiling, N$112.50. You take home N$17,262.50.",
  ],
  faq: [
    {
      pregunta: "Why is Social Security so small?",
      respuesta: "You pay {{na.ssc-employee-rate}} of your basic wage and your employer pays the same, but only up to a basic wage of {{na.ssc-ceiling}} a month. Above that the amount stays the same.",
    },
    {
      pregunta: "Are allowances part of the Social Security calculation?",
      respuesta: "No. The contribution is based on your basic wage. Allowances are taxed but do not change your Social Security.",
    },
    {
      pregunta: "Does my pension contribution lower my tax?",
      respuesta: "Yes. Contributions to an approved pension or provident fund, a retirement annuity and education policies are deductible, up to {{na.retirement-deduction-cap}} a year in total.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Your employer may also deduct medical aid, union dues or loan repayments. Those are not statutory, so the calculator leaves them out.",
    },
  ],
  glosario: [
    { termino: "SSC", definicion: "Social Security Commission, which runs the Maternity Leave, Sick Leave and Death Benefit Fund." },
    { termino: "Basic salary", definicion: "Your pay for ordinary hours of work, before allowances, overtime and bonuses." },
    { termino: "PAYE", definicion: "Employees' tax deducted from your salary every month." },
  ],
});
