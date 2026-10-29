import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.take-home-pay",
  h1: "Take-home pay calculator Brunei {{anio}}",
  title: "Brunei take-home pay {{anio}}: salary after SPK",
  description:
    "Brunei charges {{bn.personal-income-tax-rate}} income tax on salaries. Enter your gross pay to see what is left after the {{bn.spk-employee-rate}} SPK deduction.",
  intro: [
    "In Brunei Darussalam your take-home pay is simple to work out. The Ministry of Finance and Economy says no tax is levied on personal income, so there is no income tax line on your payslip. The only statutory deduction is your share of the national retirement scheme, SPK, at {{bn.spk-employee-rate}} of basic salary.",
    "Type your gross monthly salary and tell us whether you are a citizen or permanent resident. Foreign employees are not registered in SPK, so their statutory deductions are nil.",
  ],
  comoSeCalcula: [
    "Income tax: {{bn.personal-income-tax-rate}}. Income tax in Brunei applies to companies only.",
    "SPK: {{bn.spk-employee-rate}} of basic salary for citizens and permanent residents under 60. There is no maximum. Before SPK started, the same 8.5 percent was split between the TAP and SCP schemes.",
    "Take-home pay is gross salary less the SPK deduction. Your employer also pays SPK for you, but that is on top of your salary and does not reduce your pay.",
  ],
  ejemplo: [
    "A citizen earning BND 2,000 a month pays BND 170.00 into SPK and keeps BND 1,830.00, or BND 21,960.00 over 12 months. A foreign employee on the same gross salary receives the full BND 2,000.00.",
  ],
  faq: [
    {
      pregunta: "Do I pay income tax on my salary in Brunei?",
      respuesta: "No. The Ministry of Finance and Economy lists personal income, including earnings from employment, self-employment, dividends and interest, as not taxed. Capital gains and unincorporated businesses are not taxed either.",
    },
    {
      pregunta: "Which deductions can appear on a payslip?",
      respuesta: "Only the SPK share is set by law. Anything else, such as a loan repayment or a company scheme, comes from your contract or your own request.",
    },
    {
      pregunta: "Is my SPK deduction capped?",
      respuesta: "No. The Employees Trust Fund says SPK has no maximum mandatory contribution, so a higher salary means a higher deduction.",
    },
    {
      pregunta: "Who is registered in SPK?",
      respuesta: "Citizens and permanent residents of Brunei Darussalam under 60. The Employees Trust Fund says registration is mandatory for every eligible employee, whatever the type of employment.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your pay before any deduction, allowances included." },
    { termino: "Take-home pay", definicion: "What reaches your bank account after the SPK deduction." },
    { termino: "SPK", definicion: "The national retirement scheme run by the Employees Trust Fund." },
  ],
});
