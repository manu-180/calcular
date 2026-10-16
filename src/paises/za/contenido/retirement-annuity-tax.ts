import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.retirement-annuity-tax",
  h1: "Retirement annuity tax calculator",
  title: "Retirement annuity tax saving calculator 2026/27",
  description: "See how much tax you save with a retirement annuity or pension contributions: deductible up to {{za.retirement-deduction-rate}} of income, capped at {{za.retirement-deduction-cap}} a year.",
  intro: [
    "Enter your taxable income and what you put into retirement funds in the year. You see how much is deductible, the tax you save and what the contribution really costs you.",
    "The deduction covers pension, provident and retirement annuity (RA) funds together.",
  ],
  comoSeCalcula: [
    "You can deduct up to {{za.retirement-deduction-rate}} of your remuneration or taxable income, whichever is higher, with a cap of {{za.retirement-deduction-cap}} a year.",
    "The tax saving is the difference between the tax on your income with and without the deduction.",
    "Contributions above the limit are not lost: they carry forward to the next tax year.",
  ],
  ejemplo: ["On a taxable income of R600 000, contributions of R60 000 are fully deductible and save you R21 600 in tax, so they cost you R38 400."],
  faq: [
    {
      pregunta: "Do my employer's contributions count?",
      respuesta: "Yes. Contributions your employer makes for you are taxed as a fringe benefit and then treated as your own contributions, so they count towards the same limit.",
    },
    {
      pregunta: "What happens to contributions above the limit?",
      respuesta: "They carry forward to the next tax year and are treated as contributed in that year.",
    },
    {
      pregunta: "Why does the saving depend on my income?",
      respuesta: "Each rand you deduct saves tax at your marginal rate, from 18% up to 45%. The higher your bracket, the bigger the saving.",
    },
  ],
  glosario: [
    { termino: "Retirement annuity (RA)", definicion: "A personal retirement fund you contribute to yourself, outside your employer's fund." },
    { termino: "Carry forward", definicion: "Contributions above this year's limit move to next year's deduction." },
  ],
});
