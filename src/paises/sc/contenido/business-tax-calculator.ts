import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.business-tax-calculator",
  h1: "Seychelles business tax calculator {{anio}}",
  title: "Seychelles business tax {{anio}}: sole trader and company",
  description: "Estimate annual business tax. Companies pay {{sc.business-tax-company[0].tasa}} up to SCR 1 million and sole traders pay nothing on the first {{sc.business-tax-sole-trader[0].hasta}}.",
  intro: [
    "Business tax in Seychelles is charged on the taxable income of a business activity, which is assessable income less allowable deductions. The rate depends on the structure of the business.",
    "The bands below have applied since {{sc.business-tax-company#desde}}. Enter your annual taxable income to see the tax.",
  ],
  comoSeCalcula: [
    "A sole trader or partnership pays {{sc.business-tax-sole-trader[0].tasa}} % on the first {{sc.business-tax-sole-trader[0].hasta}}, then {{sc.business-tax-sole-trader[1].tasa}} % up to {{sc.business-tax-sole-trader[1].hasta}}.",
    "A company pays {{sc.business-tax-company[0].tasa}} % on the first {{sc.business-tax-company[0].hasta}}.",
    "Both structures pay {{sc.business-tax-company[1].tasa}} % on every rupee above SCR 1 million. Each rate applies only to its own slice.",
  ],
  ejemplo: [
    "A sole trader with taxable income of SCR 500,000 pays nothing on the first SCR 102,666 and 15 % on the remaining SCR 397,334. The tax is SCR 59,600.10. A company with the same income pays 15 % of SCR 500,000, which is SCR 75,000.",
  ],
  faq: [
    {
      pregunta: "When is the business tax return due?",
      respuesta: "The SRC FAQ says every business must lodge its return by 31 March of the following year, even when the income is nil or the business made a loss.",
    },
    {
      pregunta: "Can I pay during the year?",
      respuesta: "Yes. The Pay As You Go scheme lets a business pay monthly, on the 21st of the following month, with the Business Activity Statement.",
    },
    {
      pregunta: "Is there a simpler regime for small businesses?",
      respuesta: "A business with annual turnover below SCR 1 million can use presumptive tax at a flat rate on turnover. Our presumptive tax calculator covers it.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Assessable income of a business less the deductions the law allows." },
    { termino: "Sole trader", definicion: "An individual who runs a business in their own name." },
    { termino: "BAS", definicion: "The Business Activity Statement used to pay tax to the SRC." },
  ],
});
