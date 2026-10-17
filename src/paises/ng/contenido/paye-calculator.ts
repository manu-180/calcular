import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.paye-calculator",
  h1: "PAYE tax calculator 2026",
  title: "PAYE calculator 2026: Nigeria Tax Act income tax",
  description:
    "Work out your personal income tax and monthly PAYE under the Nigeria Tax Act 2025, with the new rent relief of {{ng.rent-relief-rate}} up to {{ng.rent-relief-cap}}.",
  intro: [
    "From 1 January 2026, personal income tax follows the Nigeria Tax Act, 2025. Enter your income and deductions to see your tax for the year and your monthly PAYE.",
    "The consolidated relief allowance is gone. In its place you can claim rent relief, and the first ₦800,000 of chargeable income is taxed at 0%.",
  ],
  comoSeCalcula: [
    "Start with your gross income and take off eligible deductions: your pension contribution, National Housing Fund, National Health Insurance, life insurance premiums and interest on a loan for your own home.",
    "Rent relief is {{ng.rent-relief-rate}} of the rent you paid, up to {{ng.rent-relief-cap}} a year.",
    "What is left is chargeable income. The first ₦800,000 is taxed at 0%, the next ₦2.2 million at 15%, the next ₦9 million at 18%, the next ₦13 million at 21%, the next ₦25 million at 23% and anything above ₦50 million at 25%.",
    "If you earn the national minimum wage of {{ng.minimum-wage}} a month or less, you pay no income tax on that job.",
  ],
  ejemplo: [
    "On ₦6 million a year, with ₦360,000 of pension and ₦1.2 million of rent, deductions add up to ₦600,000. Chargeable income is ₦5.4 million and the tax is ₦762,000, or ₦63,500 a month.",
  ],
  faq: [
    {
      pregunta: "When did the new tax bands start?",
      respuesta: "On 1 January 2026, when the Nigeria Tax Act, 2025 came into force. It was signed on 26 June 2025.",
    },
    {
      pregunta: "How do I claim rent relief?",
      respuesta: "Declare the rent you actually paid and the other details the tax authority asks for. The relief is the lower of {{ng.rent-relief-rate}} of the rent and {{ng.rent-relief-cap}}.",
    },
    {
      pregunta: "Is the consolidated relief allowance still available?",
      respuesta: "No. The Nigeria Tax Act replaced the old rules. Your deductions are now the eligible items listed above plus rent relief.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta: "Your employer spreads the tax over the year and may treat bonuses or allowances differently. Use the net salary calculator to see a monthly breakdown.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: income tax your employer deducts from each salary payment." },
    { termino: "Chargeable income", definicion: "Your income after eligible deductions and rent relief." },
    { termino: "Rent relief", definicion: "A deduction of part of the rent you pay for your home." },
  ],
});
