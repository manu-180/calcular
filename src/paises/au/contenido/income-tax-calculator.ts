import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.income-tax-calculator",
  h1: "Income tax calculator 2026-27",
  title: "Income tax calculator 2026-27 and 2025-26 (Australia)",
  description: "Work out your income tax, low income tax offset and Medicare levy for 2026-27 or 2025-26 with the ATO resident tax rates.",
  intro: [
    "Enter your taxable income and pick the income year. You get your income tax, the low income tax offset, the Medicare levy and what you keep after tax.",
    "It uses the resident tax rates published by the ATO, for someone who was an Australian resident for the full year and can claim the tax-free threshold.",
  ],
  comoSeCalcula: [
    "Tax is worked out band by band on your taxable income. The first $18,200 is tax-free.",
    "The low income tax offset of up to {{au.lito[maximo]}} reduces your tax. It shrinks above {{au.lito[umbral-1]}} and is gone above {{au.lito[tope]}}. It can lower your tax to zero but is never paid out.",
    "The Medicare levy is {{au.medicare-levy}} of your taxable income. Below {{au.medicare-umbrales[umbral]}} you pay none, and up to {{au.medicare-umbrales[limite]}} it is capped at {{au.medicare-tasa-reduccion}} of the income above that threshold.",
  ],
  ejemplo: [
    "On a taxable income of $85,000 in 2026-27, the tax is $16,020 and the Medicare levy is $1,700. You keep $67,280 of your income.",
  ],
  faq: [
    {
      pregunta: "What changed in 2026-27?",
      respuesta: "The rate on income between $18,201 and $45,000 fell from 16c to 15c in the dollar from 1 July 2026. The other rates and thresholds stayed the same.",
    },
    {
      pregunta: "Who can use these rates?",
      respuesta: "They apply if you were an Australian resident for tax purposes for the whole year and are entitled to the full tax-free threshold. If that is not your case, the ATO publishes other rates.",
    },
    {
      pregunta: "Does the low income tax offset reduce the Medicare levy?",
      respuesta: "No. The offset can only reduce your income tax to zero. Any unused amount is not refunded and does not count against the Medicare levy.",
    },
    {
      pregunta: "Why might my tax return show a different amount?",
      respuesta: "This calculator covers a single person with no dependants. Other offsets, the Medicare levy surcharge, a family income reduction or HELP repayments change the final figure on your notice of assessment.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your assessable income minus the deductions you can claim." },
    { termino: "Low income tax offset (LITO)", definicion: "A tax offset for residents on lower incomes that the ATO works out when you lodge your return." },
    { termino: "Medicare levy", definicion: "An amount on top of income tax that helps fund Australia's public health system." },
    { termino: "Income year", definicion: "The financial year from 1 July to 30 June." },
  ],
});
