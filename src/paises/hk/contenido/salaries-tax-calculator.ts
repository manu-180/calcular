import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.salaries-tax-calculator",
  h1: "Hong Kong salaries tax calculator",
  title: "Salaries tax calculator Hong Kong 2026/27",
  description:
    "Work out your Hong Kong salaries tax for 2025/26 or 2026/27, with the IRD allowances, deductions, progressive rates and the standard rate.",
  intro: [
    "Salaries tax is the tax on what you earn from a job in Hong Kong. The year of assessment runs from 1 April to 31 March.",
    "Pick the year, enter your income, family and deductions, and see the tax at progressive rates, at the standard rate and the amount you actually pay.",
  ],
  comoSeCalcula: [
    "Net income is your income less deductions, such as MPF mandatory contributions (up to {{hk.deduction-limits[mpf]}}) and domestic rent (up to {{hk.deduction-limits[domestic-rent]}}).",
    "Net chargeable income is net income less your allowances. For 2026/27 the basic allowance is {{hk.basic-allowance[2026-27]}} and the married person's allowance {{hk.married-allowance[2026-27]}}.",
    "Progressive rates go from {{hk.salaries-tax-rates[0].tasa}} on the first {{hk.salaries-tax-rates[0].hasta}} up to {{hk.salaries-tax-rates[-1].tasa}} on what is above {{hk.salaries-tax-rates[-1].desde}}.",
    "The standard rate is {{hk.standard-rates[0].tasa}} of net income up to {{hk.standard-rates[0].hasta}} and {{hk.standard-rates[-1].tasa}} above. You pay whichever of the two is lower.",
  ],
  ejemplo: [
    "A single person earning $380,000 in 2026/27 with no deductions has net chargeable income of $235,000 after the basic allowance. The tax is $21,950.",
  ],
  faq: [
    {
      pregunta: "What is the basic allowance for 2026/27?",
      respuesta: "It is {{hk.basic-allowance[2026-27]}}, up from {{hk.basic-allowance[2025-26]}} in 2025/26. The child allowance went up to {{hk.child-allowance[2026-27]}} for each child.",
    },
    {
      pregunta: "Is there a tax reduction this year?",
      respuesta:
        "For 2025/26 the final salaries tax is reduced by 100%, up to {{hk.tax-reduction-cap[2025-26]}} per case. The IRD applies it on the final assessment and it doesn't cover provisional tax.",
    },
    {
      pregunta: "When does the standard rate apply?",
      respuesta:
        "When it gives a lower bill than the progressive rates. It is charged on net income before allowances, so it usually only matters for high incomes.",
    },
    {
      pregunta: "Should a married couple choose joint assessment?",
      respuesta:
        "Only if it lowers the total bill. The IRD says that if joint assessment doesn't result in less tax, it issues separate bills instead.",
    },
    {
      pregunta: "How long do I get the additional child allowance for a newborn?",
      respuesta: "From 2026/27 you can claim it in each of the first two years after the birth. Before that it was only for the year the child was born.",
    },
  ],
  glosario: [
    { termino: "Year of assessment", definicion: "The tax year in Hong Kong, from 1 April to 31 March." },
    { termino: "Net chargeable income", definicion: "Income less deductions and allowances. The progressive rates apply to it." },
    { termino: "Standard rate", definicion: "A flat rate on net income before allowances. You never pay more than this." },
  ],
});
