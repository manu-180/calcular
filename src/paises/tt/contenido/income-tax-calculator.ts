import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.income-tax-calculator",
  h1: "Income tax calculator Trinidad and Tobago",
  title: "Income tax calculator Trinidad and Tobago {{anio}}",
  description:
    "Work out your yearly income tax with the {{tt.personal-allowance}} personal allowance, the NIS deduction and the {{tt.income-tax-rate}} and {{tt.income-tax-higher-rate}} rates.",
  intro: [
    "Check how much income tax you owe for the year, or whether you are due a refund when you file your return.",
    "It uses the allowance, deductions and rates published by the Inland Revenue Division (IRD).",
  ],
  comoSeCalcula: [
    "Start with your total income for the year.",
    "Take off the personal allowance of {{tt.personal-allowance}}.",
    "Take off {{tt.nis-deductible-share}} of the NIS you paid plus your pension and annuity contributions. Together they are capped at {{tt.pension-nis-deduction-cap}}.",
    "Take off any other deductions you can claim. What is left is your chargeable income.",
    "Chargeable income up to {{tt.income-tax-higher-band}} pays {{tt.income-tax-rate}}. Anything above pays {{tt.income-tax-higher-rate}}.",
  ],
  ejemplo: [
    "With TT$240,000 of income and TT$8,814 of NIS, the deduction is TT$6,169.80 and chargeable income is TT$143,830.20. The tax is TT$35,957.55.",
  ],
  faq: [
    {
      pregunta: "What is the personal allowance in Trinidad and Tobago?",
      respuesta: "It is {{tt.personal-allowance}} a year for every resident individual. You pay no income tax on that part of your income.",
    },
    {
      pregunta: "Can I deduct my NIS contributions?",
      respuesta:
        "Yes, {{tt.nis-deductible-share}} of what you paid. It shares one limit of {{tt.pension-nis-deduction-cap}} with approved pension plans, deferred annuities and provident funds.",
    },
    {
      pregunta: "When does the higher rate apply?",
      respuesta: "Only on chargeable income above {{tt.income-tax-higher-band}}. The first {{tt.income-tax-higher-band}} is always taxed at {{tt.income-tax-rate}}.",
    },
    {
      pregunta: "What other deductions can I claim?",
      respuesta:
        "The IRD allows tertiary education expenses, the first acquisition of a house for five years, alimony paid under a court order and some deeds of covenant. Each has its own limit and documents.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Your income after the personal allowance and deductions. The tax rates apply to this amount." },
    { termino: "Personal allowance", definicion: "The part of your yearly income that is free of income tax." },
    { termino: "TD4", definicion: "The certificate your employer gives you each year with your pay and the tax deducted." },
  ],
});
