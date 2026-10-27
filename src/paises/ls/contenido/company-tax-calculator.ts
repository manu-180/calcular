import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.company-tax-calculator",
  h1: "Company income tax calculator for Lesotho",
  title: "Company tax calculator Lesotho: 25% and 10% rates",
  description:
    "Work out company income tax in Lesotho: {{ls.company-tax-rates[other]}} for most companies and {{ls.company-tax-rates[manufacturing]}} for manufacturing and commercial farming.",
  intro: [
    "Enter your company's chargeable income for the year and pick the type of business. You get the tax and the profit left after it.",
    "The rates are the ones on the Revenue Services Lesotho tax rates page.",
  ],
  comoSeCalcula: [
    "Start from chargeable income: taxable profit after allowable deductions.",
    "Apply the rate for your type of company: {{ls.company-tax-rates[other]}} in general, {{ls.company-tax-rates[manufacturing]}} for manufacturing and {{ls.company-tax-rates[farming]}} for commercial farming.",
  ],
  ejemplo: ["A trading company with M500 000 of chargeable income pays M125 000. A manufacturer with the same profit pays M50 000."],
  faq: [
    {
      pregunta: "What is the company tax rate in Lesotho?",
      respuesta: "{{ls.company-tax-rates[other]}} for most companies. Manufacturing companies and commercial farming pay {{ls.company-tax-rates[manufacturing]}}.",
    },
    {
      pregunta: "Does a sole trader pay company tax?",
      respuesta: "No. A sole trader pays personal income tax on business profit, at the same rates as employees. Use the income tax calculator.",
    },
    {
      pregunta: "Where do I check the rates?",
      respuesta: "On the Tax Rates page of Revenue Services Lesotho, which lists the company income tax rates next to VAT and withholding tax.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Taxable profit for the year after the deductions the Income Tax Act allows." },
    { termino: "CIT", definicion: "Company income tax." },
  ],
});
