import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.turnover-tax-calculator",
  h1: "Turnover tax calculator Zambia",
  title: "Turnover tax calculator Zambia 2026: ZRA's {{zm.tot-rate}} on sales",
  description:
    "Work out your monthly turnover tax: {{zm.tot-rate}} on sales, with the first {{zm.tot-exempt-monthly}} of the month at 0%, for businesses with sales up to {{zm.tot-limit}} a year.",
  intro: [
    "Turnover tax is the simple tax for small businesses in Zambia. It is charged on gross sales, not on profit.",
    "Enter the month's sales and see the tax to pay ZRA by the 14th of the next month.",
  ],
  comoSeCalcula: [
    "The first {{zm.tot-exempt-monthly}} of sales in the month is taxed at 0%.",
    "Sales above that are taxed at {{zm.tot-rate}}, as in ZRA's own worked example.",
  ],
  ejemplo: ["ZRA's example: a shop sells K6,000 in January 2026. K6,000 − K2,500 = K3,500, and 5% of that is K175."],
  faq: [
    {
      pregunta: "Who can use turnover tax?",
      respuesta: "Businesses with annual sales of {{zm.tot-limit}} or less. Above that you register for income tax.",
    },
    {
      pregunta: "Who cannot?",
      respuesta: "Partnerships, operators of public service vehicles carrying fewer than 50 passengers, mining businesses other than artisanal and small-scale miners, and businesses providing management and consultancy services.",
    },
    {
      pregunta: "When are the return and payment due?",
      respuesta: "On or before the 14th day of the month after the month of the sales. Sales made in January are due by 14 February.",
    },
    {
      pregunta: "How long must I keep my records?",
      respuesta: "At least six years: sales records, invoices and receipts, bank statements and accounting records.",
    },
  ],
  glosario: [{ termino: "Turnover", definicion: "All earnings from the business: sales, revenue, takings and proceeds." }],
});
