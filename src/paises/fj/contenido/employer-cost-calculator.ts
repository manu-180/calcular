import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.employer-cost-calculator",
  h1: "Employer cost calculator Fiji {{anio}}",
  title: "Employer cost of an employee in Fiji {{anio}}",
  description: "Add the {{fj.fnpf-employer-rate}} employer FNPF contribution to a wage and see the full monthly and yearly cost. Includes the 150% deduction on FNPF above the mandatory rate.",
  intro: [
    "An employee paid FJ$3,000 a month costs you more than FJ$3,000, because you also pay the employer share of the Fiji National Provident Fund. The mandatory rate is {{fj.fnpf-employer-rate}} for the twelve months from 1 August 2026.",
    "Enter the gross monthly pay to see the real monthly and yearly cost. You can also test paying more than the mandatory rate, up to {{fj.fnpf-incentive-cap}}.",
  ],
  comoSeCalcula: [
    "The employer FNPF contribution is a percentage of the gross wage. The calculator adds it to the wage to give the monthly cost, then multiplies by twelve for the yearly figure.",
    "The 2026-2027 Budget lets an employer that pays above the mandatory rate, up to {{fj.fnpf-incentive-cap}}, deduct {{fj.fnpf-excess-deduction}} of the excess from taxable profit.",
    "To show what that is worth, the calculator multiplies the yearly excess by {{fj.fnpf-excess-deduction}}, then by the standard corporate tax rate of {{fj.corporate-tax-rate}}.",
    "Other costs are not included. PAYE is deducted from the employee's pay and sent to FRCS, so it does not add to your cost. Fringe benefits provided on top of the wage are taxed to the employer under the fringe benefits tax.",
  ],
  ejemplo: [
    "An employee earns FJ$3,000 a month. At the mandatory 8%, you pay FJ$240 to FNPF and the cost is FJ$3,240 a month, or FJ$38,880 a year. If you keep paying 10%, the cost rises to FJ$3,300 a month. The extra 2% is FJ$720 a year. Deducting 150% of it gives FJ$1,080, and at 25% company tax that cuts your tax bill by FJ$270.",
  ],
  faq: [
    {
      pregunta: "What is the mandatory employer FNPF rate?",
      respuesta: "The 2026-2027 Budget Supplement sets it at {{fj.fnpf-employer-rate}} for 1 August 2026 to 31 July 2027. Before that it was 10%.",
    },
    {
      pregunta: "How much of the extra FNPF can an employer deduct?",
      respuesta: "The FRCS summary of revenue policies says contributions above the mandatory 8%, up to 10%, are eligible for a {{fj.fnpf-excess-deduction}} tax deduction on the excess.",
    },
    {
      pregunta: "What is the standard company tax rate?",
      respuesta: "FRCS lists {{fj.corporate-tax-rate}} for companies from the 2024 tax year, apart from listed companies and some concessions that have their own rates.",
    },
  ],
  glosario: [
    { termino: "Employer cost", definicion: "Wages plus the statutory contributions an employer pays on top." },
    { termino: "Mandatory rate", definicion: "The least an employer must pay into FNPF for each employee." },
    { termino: "Tax deduction", definicion: "An amount taken off profit before company tax is worked out." },
  ],
});
