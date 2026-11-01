import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.salary-calculator",
  h1: "Salary calculator Mauritius",
  title: "Salary calculator Mauritius {{anio}}: net pay after PAYE",
  description:
    "Work out your take-home pay in Mauritius after PAYE, CSG at {{mu.csg-employee-low}} or {{mu.csg-employee-high}} and NSF at {{mu.nsf-employee}}. Uses the 2026-27 MRA tax bands.",
  intro: [
    "Enter your basic salary and see what reaches your bank account each month. Every deduction on your payslip is shown on its own line.",
    "The figures follow the income tax bands for the income year that started on 1 July 2026 and the CSG and NSF rates collected by MRA.",
  ],
  comoSeCalcula: [
    "CSG: {{mu.csg-employee-low}} of your basic salary if it is {{mu.csg-threshold}} or less, and {{mu.csg-employee-high}} of all of it if it is more.",
    "NSF: {{mu.nsf-employee}} of your basic salary, counted between {{mu.nsf-minimum-wage}} and {{mu.nsf-maximum-wage}}.",
    "PAYE: MRA spreads the year over 13 pay periods. Your pay times 13, less your EDF deductions, goes through the bands: {{mu.income-tax-bands[0].tasa}} up to {{mu.income-tax-bands[0].hasta}}, {{mu.income-tax-bands[1].tasa}} up to {{mu.income-tax-bands[1].hasta}}, {{mu.income-tax-bands[2].tasa}} up to {{mu.income-tax-bands[2].hasta}} and {{mu.income-tax-bands[-1].tasa}} above. The monthly PAYE is that tax divided by 13 and rounded down to the rupee.",
    "Net pay is your gross pay less PAYE, CSG and NSF.",
  ],
  ejemplo: [
    "A basic salary of Rs 60,000 leaves Rs 55,749.90. CSG takes Rs 1,800, NSF Rs 297.10 and PAYE Rs 2,153.",
  ],
  faq: [
    {
      pregunta: "Do I pay PAYE on a salary of Rs 38,000?",
      respuesta: "No. MRA does not withhold PAYE when monthly emoluments are Rs 38,462 or less, because 13 such months stay inside the 0% band of {{mu.income-tax-bands[0].hasta}}.",
    },
    {
      pregunta: "Why does CSG jump when I pass Rs 50,000?",
      respuesta: "The rate is set for the whole basic salary, not for the part above the limit. At {{mu.csg-threshold}} or less you pay {{mu.csg-employee-low}}. Above it you pay {{mu.csg-employee-high}} on everything.",
    },
    {
      pregunta: "Is overtime subject to CSG?",
      respuesta: "No. CSG and NSF are worked out on the basic wage, which leaves out overtime and allowances. Overtime and taxable allowances do count for PAYE.",
    },
    {
      pregunta: "What happened to the Fair Share Contribution?",
      respuesta: "For individuals it now covers only the 2025-26 income year. From July 2026 chargeable income above {{mu.income-tax-bands[2].hasta}} is taxed at {{mu.income-tax-bands[-1].tasa}} through the normal bands instead.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: the income tax your employer withholds every month and pays to MRA." },
    { termino: "CSG", definicion: "Contribution Sociale Généralisée, the social contribution that funds pensions and benefits." },
    { termino: "NSF", definicion: "National Savings Fund, which pays a lump sum when you retire." },
    { termino: "EDF", definicion: "Employee Declaration Form, where you claim your deductions for the income year." },
  ],
});
