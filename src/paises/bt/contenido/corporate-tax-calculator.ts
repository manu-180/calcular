import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.corporate-tax-calculator",
  h1: "Corporate income tax calculator Bhutan",
  title: "Corporate income tax Bhutan: flat {{bt.company-tax-rate}} on companies",
  description: "Work out tax on a company, body of persons or trust in Bhutan. Companies pay {{bt.company-tax-rate}} and trusts {{bt.trust-tax-rate}} under Schedule 1 of the Act. Enter taxable income.",
  intro: [
    "Companies in Bhutan pay a flat {{bt.company-tax-rate}} on taxable income, and a body of persons pays {{bt.body-of-persons-tax-rate}}. A trust pays {{bt.trust-tax-rate}}. These rates have applied since {{bt.company-tax-rate#desde}}, under Schedule 1 of the Income Tax Act of Bhutan 2025.",
    "A sole proprietor or a partner is not in this group: that income goes on the personal bands.",
  ],
  comoSeCalcula: [
    "Choose the entity. Multiply taxable income by its rate.",
    "There are no bands and no tax-free slice. The first ngultrum of profit pays the same rate as the last.",
    "Enter income after the deductions the Act allows. The calculator does not work out those deductions.",
  ],
  ejemplo: ["A company in Phuentsholing has a taxable income of Nu. 1,000,000. At 22 % the tax is Nu. 220,000, which leaves Nu. 780,000. A trust with the same income pays 30 %, or Nu. 300,000."],
  faq: [
    {
      pregunta: "What is the corporate tax rate in Bhutan?",
      respuesta: "{{bt.company-tax-rate}} of taxable income, for all companies registered under the applicable laws (Schedule 1, paragraph 4, and the notification of the Department of Revenue and Customs of 16 December 2025).",
    },
    {
      pregunta: "What is a body of persons?",
      respuesta: "The notification describes it as a non-individual entity other than a company. It pays {{bt.body-of-persons-tax-rate}}.",
    },
    {
      pregunta: "What about foreign businesses selling into Bhutan?",
      respuesta: "A non-resident with a significant economic presence can choose between 22 % on a return and 5 % of turnover, according to the same notification. This calculator does not cover that option.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Income less the deductions the Act allows." },
    { termino: "Trust", definicion: "An arrangement holding assets for others. It pays the higher flat rate, registered or not." },
    { termino: "Sole proprietor", definicion: "One person who owns a business. The income is taxed on the personal bands." },
  ],
});
