import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.pension-tax-deduction-calculator",
  h1: "Pension and retirement annuity tax calculator",
  title: "Pension tax deduction Namibia: how much tax you save",
  description:
    "See how much income tax you save with pension, provident, retirement annuity and education policy contributions, deductible up to {{na.retirement-deduction-cap}} a year.",
  intro: [
    "Namibia lets you deduct contributions to an approved pension or provident fund, a retirement annuity and education policies from your taxable income.",
    "Enter your income and contributions to see the tax saved and how much room is left under the yearly cap.",
  ],
  comoSeCalcula: [
    "Add up your pension or provident fund, retirement annuity and education policy payments for the tax year.",
    "The deduction is that total, up to {{na.retirement-deduction-cap}} a year.",
    "Tax is worked out with the NamRA bands on your income with and without the deduction. The difference is your saving.",
  ],
  ejemplo: [
    "On N$480,000 a year, N$36,000 in pension contributions brings tax down from N$95,400 to N$85,320, a saving of N$10,080.",
  ],
  faq: [
    {
      pregunta: "Which contributions count towards the cap?",
      respuesta: "Contributions to an approved pension or provident fund made as a condition of employment, contributions to a retirement annuity fund and premiums on a policy for a child's education. Together they are limited to {{na.retirement-deduction-cap}} a year.",
    },
    {
      pregunta: "What happens if I withdraw my pension when I resign?",
      respuesta: "NamRA says a withdrawal from a pension or provident fund on resignation is fully taxed. If you move the money to a preservation fund, it is taxed only when you withdraw it.",
    },
    {
      pregunta: "Can I deduct more than the cap?",
      respuesta: "No. Whatever you pay above {{na.retirement-deduction-cap}} a year in total does not lower your tax for that year.",
    },
  ],
  glosario: [
    { termino: "Retirement annuity", definicion: "A private retirement savings policy you pay into yourself, outside your employer's fund." },
    { termino: "Preservation fund", definicion: "A fund that keeps your retirement savings invested when you change jobs." },
  ],
});
