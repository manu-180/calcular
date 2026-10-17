import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.pay-calculator",
  h1: "Pay calculator: take-home pay 2026-27",
  title: "Pay calculator 2026-27: weekly, fortnightly, monthly",
  description: "Work out your take-home pay after income tax, Medicare levy and HELP for 2026-27. See it per week, fortnight, month and year, plus your super.",
  intro: [
    "Enter your pay before tax for a year, month, fortnight or week. You see what you take home each payday after income tax, the Medicare levy and any study loan repayment.",
    "It also shows the super your employer pays on top, at the {{au.super-guarantee}} super guarantee rate.",
  ],
  comoSeCalcula: [
    "Your pay is turned into a yearly salary: 52 weeks, 26 fortnights or 12 months.",
    "If the amount is a package that includes super, the super is taken out first.",
    "Income tax uses the 2026-27 resident rates, minus the low income tax offset when you qualify. The Medicare levy is {{au.medicare-levy}}.",
    "If you have a study loan, the compulsory repayment starts above {{au.help-2026-27[umbral]}} of income.",
  ],
  ejemplo: [
    "On $85,000 a year you pay $16,020 income tax and $1,700 Medicare levy. You take home $67,280 a year, which is $2,587.69 a fortnight. Your employer also pays $10,200 into your super.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip slightly different?",
      respuesta: "Your employer withholds tax every payday with the ATO tax tables for each pay period, not with a yearly calculation. Over the full year the result is settled in your tax return.",
    },
    {
      pregunta: "Is super taken out of my pay?",
      respuesta: "No. The super guarantee of {{au.super-guarantee}} is paid by your employer on top of your salary, unless your contract sets a package that includes super.",
    },
    {
      pregunta: "Do I have to repay HELP if I earn less than the threshold?",
      respuesta: "No. In 2026-27 you only make a compulsory repayment on income above {{au.help-2026-27[umbral]}}.",
    },
    {
      pregunta: "Does this include the tax-free threshold?",
      respuesta: "Yes. It assumes you are an Australian resident and claim the tax-free threshold from this employer.",
    },
  ],
  glosario: [
    { termino: "Take-home pay", definicion: "What reaches your bank account after tax and other deductions." },
    { termino: "Fortnight", definicion: "Two weeks. Many Australian employers pay every fortnight, 26 times a year." },
    { termino: "Super guarantee", definicion: "The minimum super your employer must pay for you, as a percentage of your earnings." },
    { termino: "PAYG withholding", definicion: "The tax your employer takes from each pay and sends to the ATO for you." },
  ],
});
