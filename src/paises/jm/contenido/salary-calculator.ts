import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.salary-calculator",
  h1: "Salary calculator Jamaica",
  title: "Salary calculator Jamaica {{anio}}: net pay after PAYE and NIS",
  description:
    "Work out your take-home pay after PAYE, NIS, NHT and Education Tax. Uses the monthly income tax threshold of {{jm.paye-threshold-monthly}} from TAJ.",
  intro: [
    "Put in your gross monthly salary and see what reaches your account on payday. Every statutory deduction shows line by line, the way it appears on your payslip.",
    "The figures follow the method Tax Administration Jamaica (TAJ) uses in its own payroll examples.",
  ],
  comoSeCalcula: [
    "NIS: {{jm.nis-employee-rate}} of your gross pay, on pay up to {{jm.nis-ceiling}} a year.",
    "NHT: {{jm.nht-employee-rate}} of your gross pay.",
    "Statutory income: gross pay less NIS and any contribution to an approved pension scheme.",
    "Education Tax: {{jm.education-tax-employee-rate}} of your statutory income.",
    "PAYE: {{jm.income-tax-rate}} of statutory income above the monthly threshold of {{jm.paye-threshold-monthly}}, and {{jm.income-tax-higher-rate}} on statutory income above {{jm.income-tax-higher-band-monthly}} a month.",
  ],
  ejemplo: [
    "On a gross salary of J$250,000 with no pension plan you pay NIS of J$7,500, NHT of J$5,000, Education Tax of J$5,456.25 and PAYE of J$20,992.50. You take home J$211,051.25.",
  ],
  faq: [
    {
      pregunta: "How much can I earn in Jamaica before paying income tax?",
      respuesta:
        "PAYE starts above {{jm.paye-threshold-monthly}} of statutory income a month. Over the whole 2026 year of assessment the tax-free amount is {{jm.income-tax-threshold}}, because the threshold went up on April 1.",
    },
    {
      pregunta: "Is NHT taken from my gross pay or my statutory income?",
      respuesta: "From your gross pay. Education Tax and PAYE are worked out on your statutory income, which is your pay after NIS and approved pension contributions.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta:
        "Your employer may deduct union dues, loans, salary deductions for insurance or credit union savings. Taxable benefits that are not paid in cash, like a company car, also change the figures.",
    },
    {
      pregunta: "Does a pension contribution lower my tax?",
      respuesta: "Yes. Contributions to an approved pension scheme come off before Education Tax and PAYE are worked out, so both go down.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. Income tax your employer takes from each pay and sends to TAJ." },
    { termino: "NIS", definicion: "National Insurance Scheme. It pays pensions and other benefits." },
    { termino: "NHT", definicion: "National Housing Trust. Your contributions give you access to NHT mortgages and a refund later." },
    { termino: "Statutory income", definicion: "Gross pay less NIS and approved pension contributions." },
  ],
});
