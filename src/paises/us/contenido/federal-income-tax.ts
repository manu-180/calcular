import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.federal-income-tax",
  h1: "Federal income tax calculator",
  title: "Federal Income Tax Calculator 2026: brackets and refund",
  description:
    "Estimate your 2026 federal income tax with the IRS brackets, the {{us.standard-deduction[single]}} standard deduction and the new senior deduction. See your refund or balance due.",
  intro: [
    "Enter your filing status and your adjusted gross income to see your federal income tax for 2026, your top bracket and your effective rate.",
    "If you add what was withheld from your paychecks, you also get an estimate of your refund or of what you still owe.",
  ],
  comoSeCalcula: [
    "Your deduction is the standard deduction for your filing status or your itemized deductions, whichever is larger. Each box for age 65 or blindness adds {{us.additional-standard-deduction[married]}} for married filers and {{us.additional-standard-deduction[unmarried]}} for single filers and heads of household.",
    "Each person 65 or older also gets the senior deduction of {{us.senior-deduction}}. It shrinks by {{us.senior-deduction-phaseout-rate}} of your income above {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} on a joint return).",
    "Taxable income is your AGI minus those deductions. The tax applies each bracket rate only to the slice of income inside that bracket: 10%, 12%, 22%, 24%, 32%, 35% and 37%.",
    "The effective rate divides the tax by your AGI. The refund compares the tax with what was already withheld.",
  ],
  ejemplo: [
    "A single filer with $75,000 of AGI takes the {{us.standard-deduction[single]}} standard deduction and has $58,900 of taxable income. The tax is $7,670: 10% on the first $12,400, 12% up to $50,400 and 22% on the remaining $8,500. The effective rate is about 10.2%.",
  ],
  faq: [
    {
      pregunta: "What is the standard deduction for 2026?",
      respuesta:
        "{{us.standard-deduction[single]}} for single filers and married people filing separately, {{us.standard-deduction[mfj]}} for married couples filing jointly and {{us.standard-deduction[hoh]}} for heads of household.",
    },
    {
      pregunta: "Does moving into a higher bracket tax all my income at that rate?",
      respuesta: "No. Only the dollars above the start of a bracket pay that bracket's rate. A raise never lowers your take-home pay because of the federal brackets.",
    },
    {
      pregunta: "Who can claim the senior deduction?",
      respuesta:
        "People 65 or older by the end of the year with a valid Social Security number. It is {{us.senior-deduction}} per person, it applies whether you itemize or not, and married couples must file jointly to claim it.",
    },
    {
      pregunta: "Why is my real refund different?",
      respuesta:
        "Credits such as the child tax credit, other income, and state taxes change the final number. This calculator shows the federal tax before credits, so use it as a starting point for your return.",
    },
  ],
  glosario: [
    { termino: "Adjusted gross income (AGI)", definicion: "Your total income minus adjustments such as traditional 401(k) and HSA contributions." },
    { termino: "Taxable income", definicion: "AGI minus the standard or itemized deduction and other deductions such as the senior deduction." },
    { termino: "Marginal rate", definicion: "The rate that applies to your last dollar of taxable income." },
  ],
});
