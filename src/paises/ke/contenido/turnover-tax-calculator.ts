import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.turnover-tax-calculator",
  h1: "Turnover tax calculator",
  title: "Turnover tax calculator Kenya: {{ke.tot-rate}} on gross sales",
  description: "Work out your monthly turnover tax at {{ke.tot-rate}} of gross sales and check if TOT applies to a turnover between {{ke.tot-lower}} and {{ke.tot-upper}}.",
  intro: [
    "Turnover tax (TOT) is a simple tax for small businesses. You pay a share of your sales instead of income tax on profit.",
    "Enter your sales for the month and what you expect for the year. You will see the tax and whether TOT applies to you.",
  ],
  comoSeCalcula: [
    "TOT is {{ke.tot-rate}} of gross sales, with no deductions for expenses.",
    "It applies to residents with a yearly turnover of more than {{ke.tot-lower}} and up to {{ke.tot-upper}}.",
    "You can choose, in writing to the Commissioner, not to pay TOT and use the normal income tax rules.",
  ],
  ejemplo: ["A shop selling KSh 400,000 in a month pays KSh 6,000 of turnover tax."],
  faq: [
    {
      pregunta: "Can I deduct expenses?",
      respuesta: "No. TOT is charged on gross sales, so rent, stock and wages do not reduce it.",
    },
    {
      pregunta: "What if I sell more than {{ke.tot-upper}} a year?",
      respuesta: "Then TOT does not apply and you pay income tax on your profit.",
    },
    {
      pregunta: "What are the penalties for paying late?",
      respuesta: "KRA charges a penalty of 5% of the tax due and interest of 1% on unpaid tax.",
    },
  ],
  glosario: [{ termino: "Gross sales", definicion: "Everything you sold in the period, before any cost." }],
});
