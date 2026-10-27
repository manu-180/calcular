import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.take-home-pay",
  h1: "Take-home pay calculator Botswana",
  title: "Take-home pay calculator: salary after PAYE in Botswana",
  description: "Work out your take-home pay after PAYE with the BURS tax table in force from July 2026, including the new 27.5% bracket and pension fund deductions.",
  intro: [
    "Enter your gross monthly salary and see what is left after PAYE. If you pay into a pension or provident fund through payroll, add it for a closer match to your payslip.",
    "Botswana has no national social security deduction from salaries, so for most employees PAYE is the only statutory deduction.",
  ],
  comoSeCalcula: [
    "Your monthly salary is turned into a yearly figure, as the BURS tax table does.",
    "Residents deduct their contributions to an approved retirement fund, up to {{bw.pension-deduction-cap}} of taxable income.",
    "Residents pay nothing on the first {{bw.paye-resident[1].desde}} a year. Above that the rates go from {{bw.paye-resident[1].tasa}} to {{bw.paye-resident[-1].tasa}}, the top rate on income over {{bw.paye-resident[-1].desde}}.",
    "Non-residents pay {{bw.paye-non-resident[0].tasa}} from the first pula, with the same higher brackets.",
    "The yearly tax is divided by 12 to give your monthly PAYE.",
  ],
  ejemplo: [
    "A resident earning P18 000 a month has P216 000 a year. The tax is P28 050 a year, so PAYE is P2 337.50 a month and take-home pay is P15 662.50. BURS uses this same example in its tax table.",
  ],
  faq: [
    {
      pregunta: "What changed in July 2026?",
      respuesta: "The Income Tax Act, 2026 came into force on 1 July 2026. It added a top bracket of {{bw.paye-resident[-1].tasa}} on taxable income above {{bw.paye-resident[-1].desde}} a year. The lower brackets did not change.",
    },
    {
      pregunta: "Why is my payslip a little different?",
      respuesta: "Employers read the tax from the BURS monthly tables, which round the income bands, and bonuses, allowances or benefits such as a company car change the tax for the month. The difference is usually a few thebe.",
    },
    {
      pregunta: "Does my pension contribution lower my PAYE?",
      respuesta: "Yes, if you are a resident and the fund is approved by BURS. The deduction is capped at {{bw.pension-deduction-cap}} of your taxable income. Non-residents cannot deduct it.",
    },
    {
      pregunta: "When does the tax year start?",
      respuesta: "The Botswana tax year runs from 1 July to 30 June. BURS calls the year that ends on 30 June 2027 the 2027 tax year.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. The income tax your employer takes from your salary each month and pays to BURS." },
    { termino: "BURS", definicion: "Botswana Unified Revenue Service, the tax authority." },
    { termino: "Marginal rate", definicion: "The rate you pay on your last pula of income. Your average rate is always lower." },
  ],
});
