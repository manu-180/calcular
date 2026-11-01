import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.corporate-tax-calculator",
  h1: "Company tax calculator Namibia",
  title: "Company tax calculator Namibia: corporate income tax",
  description:
    "Companies and close corporations outside mining pay income tax of {{na.corporate-tax-rate}} on taxable income. See the tax and the profit left after it.",
  intro: [
    "The Income Tax Amendment Act, 2024 brought the company tax rate down in two steps, to 30 cents in the dollar for years of assessment starting on or after 1 January 2025.",
    "Enter the company's taxable income to see the tax due and the profit after tax.",
  ],
  comoSeCalcula: [
    "Company income tax is {{na.corporate-tax-rate}} of taxable income, for any company or close corporation that does not earn its income from mining.",
    "Profit after tax is taxable income less the tax.",
  ],
  ejemplo: ["A company with taxable income of N$1,000,000 pays N$300,000 in tax and keeps N$700,000."],
  faq: [
    {
      pregunta: "What was the rate before?",
      respuesta: "32 cents in the dollar, then 31 cents for years of assessment starting on or after 1 January 2024, and 30 cents from 1 January 2025.",
    },
    {
      pregunta: "When is the company tax return due?",
      respuesta: "NamRA expects company and close corporation returns seven months after the financial year end.",
    },
    {
      pregunta: "How much of an old loss can a company set off?",
      respuesta: "Since the 2024 amendment, an assessed loss carried forward can reduce the year's taxable income by up to N$1 million or 80% of that income, whichever is greater.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Income less the deductions and allowances the Income Tax Act permits." },
    { termino: "Close corporation", definicion: "A small business entity registered under the Close Corporations Act, taxed like a company." },
  ],
});
