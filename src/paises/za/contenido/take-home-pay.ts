import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.take-home-pay",
  h1: "Take-home pay calculator 2026/27",
  title: "Take-home pay calculator: salary after PAYE and UIF",
  description:
    "Work out your take-home pay after PAYE, UIF, medical aid tax credits and retirement contributions, with the SARS tax tables for 2026/27.",
  intro: [
    "Enter your gross monthly salary and see what lands in your account after PAYE and UIF. Add your medical aid members and your pension or retirement annuity contribution for a closer match to your payslip.",
    "It uses the SARS tax tables for the year from 1 March 2026 to 28 February 2027, with the primary rebate of {{za.tax-rebates[primary]}}.",
  ],
  comoSeCalcula: [
    "Your monthly salary is turned into a yearly figure, the same way PAYE annualises your pay.",
    "Your retirement contribution comes off first, up to {{za.retirement-deduction-rate}} of your pay and {{za.retirement-deduction-cap}} a year.",
    "Tax is worked out on the SARS brackets and reduced by your rebates: the primary rebate for everyone, plus the secondary rebate from 65 and the tertiary rebate from 75.",
    "The medical scheme fees tax credit comes off the tax: {{za.medical-tax-credits[main-member]}} a month for you, {{za.medical-tax-credits[first-dependant]}} for the first dependant and {{za.medical-tax-credits[additional-dependant]}} for each one after that.",
    "UIF is {{za.uif-employee-rate}} of your pay, on a maximum of {{za.uif-ceiling-monthly}} a month.",
  ],
  ejemplo: [
    "On R30 000 a month, under 65 and without medical aid, PAYE is R4 681 and UIF is R177,12. Your take-home pay is R25 141,88 a month.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip a little different?",
      respuesta:
        "Employers can use the SARS tax deduction tables or a payroll system that rounds differently, and bonuses or fringe benefits change the tax for the month. Over a full tax year the totals should be very close.",
    },
    {
      pregunta: "What is the medical tax credit?",
      respuesta:
        "It is a fixed amount a month that SARS takes off your tax for each person on your medical aid. It is a credit, so it lowers the tax itself, not your taxable income.",
    },
    {
      pregunta: "How much UIF do I pay?",
      respuesta:
        "You pay {{za.uif-employee-rate}} of your pay and your employer adds the same. Pay above {{za.uif-ceiling-monthly}} a month does not count, so the most you pay is 1% of that amount.",
    },
    {
      pregunta: "Does a retirement annuity lower my PAYE?",
      respuesta:
        "Yes, when your employer deducts it through payroll. If you pay it yourself, the deduction comes through when you file your tax return. Contributions are deductible up to {{za.retirement-deduction-rate}} of your remuneration or taxable income, whichever is higher, with a yearly cap of {{za.retirement-deduction-cap}}.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. The income tax your employer takes from your salary and pays to SARS each month." },
    { termino: "UIF", definicion: "Unemployment Insurance Fund. A contribution from you and your employer that pays benefits if you lose your job or go on maternity leave." },
    { termino: "Tax year", definicion: "Runs from 1 March to the end of February. SARS calls 1 March 2026 to 28 February 2027 the 2027 year of assessment." },
  ],
});
