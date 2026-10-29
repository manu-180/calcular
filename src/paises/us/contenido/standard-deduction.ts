import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.standard-deduction",
  h1: "Standard deduction calculator",
  title: "Standard Deduction {{anio}}: calculator by filing status",
  description:
    "Find your {{anio}} standard deduction: {{us.standard-deduction[single]}} single, {{us.standard-deduction[mfj]}} married filing jointly, {{us.standard-deduction[hoh]}} head of household, plus the extra for 65 and blind.",
  intro: [
    "The standard deduction is the amount of income you don't pay federal income tax on if you don't itemize.",
    "Pick your filing status and the boxes for age and blindness to see yours for 2026, and compare it with your itemized deductions.",
  ],
  comoSeCalcula: [
    "The basic amount is {{us.standard-deduction[single]}} for single filers and married people filing separately, {{us.standard-deduction[mfj]}} for married couples filing jointly and {{us.standard-deduction[hoh]}} for heads of household.",
    "Each person who is 65 or older adds {{us.additional-standard-deduction[married]}} if married or {{us.additional-standard-deduction[unmarried]}} if unmarried. Being blind adds the same amount again.",
    "If your itemized deductions are larger, itemizing lowers your tax more.",
  ],
  ejemplo: ["A married couple filing jointly, both over 65 and one of them blind, gets $32,200 plus three extra amounts of $1,650, for $37,150."],
  faq: [
    {
      pregunta: "When should I itemize instead?",
      respuesta: "When mortgage interest, state and local taxes, charitable gifts and large medical bills add up to more than your standard deduction.",
    },
    {
      pregunta: "When am I considered 65?",
      respuesta: "The IRS considers you 65 on the day before your 65th birthday. For 2026, that means anyone born before January 2, 1962.",
    },
    {
      pregunta: "Is the new senior deduction part of the standard deduction?",
      respuesta: "No. The enhanced deduction for seniors is separate and is claimed on Schedule 1-A, so it adds to the amounts shown here.",
    },
  ],
  glosario: [
    { termino: "Itemized deductions", definicion: "Specific expenses you list on Schedule A instead of taking the standard deduction." },
    { termino: "Filing status", definicion: "Single, married filing jointly, married filing separately, head of household or qualifying surviving spouse." },
  ],
});
