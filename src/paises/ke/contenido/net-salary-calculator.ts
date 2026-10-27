import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.net-salary-calculator",
  h1: "Net salary calculator Kenya",
  title: "Net salary calculator Kenya {{anio}}: gross to take-home pay",
  description:
    "See your take-home pay after PAYE, NSSF, SHIF at {{ke.shif-rate}} and the Housing Levy at {{ke.housing-levy-rate}}. Uses the KRA bands and the {{anio}} NSSF limits.",
  intro: [
    "Enter your gross monthly salary and see what lands in your account. You get every deduction line by line, the same way it shows on your payslip.",
    "The calculator uses the current PAYE bands, the NSSF Year 4 limits, SHIF and the Affordable Housing Levy.",
  ],
  comoSeCalcula: [
    "NSSF: {{ke.nssf-rate}} of your pay up to {{ke.nssf-lel}} goes to Tier I, and {{ke.nssf-rate}} of pay between {{ke.nssf-lel}} and {{ke.nssf-uel}} goes to Tier II.",
    "SHIF: {{ke.shif-rate}} of gross pay, at least {{ke.shif-minimum}}. Housing Levy: {{ke.housing-levy-rate}} of gross pay.",
    "PAYE: the KRA bands apply to your pay after those deductions, less the personal relief of {{ke.personal-relief}}.",
    "Net pay is gross pay less PAYE, NSSF, SHIF, the Housing Levy and any other pension contribution you make.",
  ],
  ejemplo: [
    "A gross salary of KSh 100,000 leaves KSh 70,441.65 after NSSF of KSh 6,000, SHIF of KSh 2,750, Housing Levy of KSh 1,500 and PAYE of KSh 19,308.35.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Your employer may add deductions such as a SACCO, a loan, HELB or union dues. Allowances or benefits that are taxed but not paid in cash also change the figures.",
    },
    {
      pregunta: "Is NSSF the same for everyone?",
      respuesta: "No. It grows with your pay until it reaches {{ke.nssf-uel}}. Above that the deduction stays at the maximum.",
    },
    {
      pregunta: "Does a pension contribution lower my tax?",
      respuesta: "Yes. Contributions to a registered pension scheme, NSSF included, are deductible up to {{ke.pension-deduction-cap}} a month.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your pay before any deduction, allowances included." },
    { termino: "Net salary", definicion: "What you receive after statutory and voluntary deductions." },
    { termino: "SHIF", definicion: "Social Health Insurance Fund, run by the Social Health Authority." },
  ],
});
