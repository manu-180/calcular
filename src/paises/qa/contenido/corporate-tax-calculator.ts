import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.corporate-tax-calculator",
  h1: "Corporate income tax calculator for Qatar",
  title: "Corporate tax in Qatar: 10% on the foreign share",
  description:
    "Work out Qatar's income tax on company profits: {{qa.corporate-tax}} of taxable income, with the share owned by Qataris exempt.",
  intro: [
    "Qatar taxes business profits at a flat rate, but the share of profits that belongs to Qataris is exempt.",
    "Enter the taxable income and the Qatari ownership to see the tax for the year.",
  ],
  comoSeCalcula: [
    "Taxable income is gross income less allowed deductions, including losses carried forward.",
    "The share of profits that belongs to Qatari individuals resident in Qatar, or to companies wholly owned by Qataris, is exempt.",
    "The rest pays {{qa.corporate-tax}}.",
  ],
  ejemplo: ["A company 51% owned by Qataris with QAR 1 million of taxable income pays 10% on QAR 490,000: QAR 49,000."],
  faq: [
    {
      pregunta: "Do listed companies pay tax on profits for foreign shareholders?",
      respuesta: "The share of non-Qatari investors in the profits of companies whose shares trade on the stock exchange is exempt.",
    },
    {
      pregunta: "Are capital gains taxed?",
      respuesta: "Yes, at {{qa.corporate-tax}}. Gains made by individuals selling property or securities that aren't business assets are exempt.",
    },
    {
      pregunta: "Is there a minimum tax for multinationals?",
      respuesta: "Yes. Groups with yearly revenue above 750 million euros in two of the last four years are generally subject to a minimum effective rate of 15%.",
    },
  ],
  glosario: [{ termino: "Taxable income", definicion: "Income after allowed deductions, on which the tax is charged." }],
});
