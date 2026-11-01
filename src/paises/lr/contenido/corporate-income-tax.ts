import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.corporate-income-tax",
  h1: "Corporate income tax calculator Liberia",
  title: "Liberia corporate income tax calculator",
  description: "Work out a company's yearly corporate income tax in Liberia at the regular rate or the mining, petroleum and rice production rates, minus advance tax paid.",
  intro: [
    "Enter your taxable profit and activity to see the corporate income tax for the year and the balance left after your quarterly advance payments.",
    "The regular rate is {{lr.corporate-rates[regular]}}. Mining and petroleum projects pay {{lr.corporate-rates[mining]}}, and rice production {{lr.corporate-rates[rice]}}.",
  ],
  comoSeCalcula: [
    "Corporate income tax: taxable profit × the rate for your activity.",
    "Balance: the tax minus the quarterly advance tax already paid during the year.",
  ],
  ejemplo: ["A trading company with L$5,000,000 of taxable profit owes L$1,250,000 of corporate income tax."],
  faq: [
    {
      pregunta: "When is the annual return due?",
      respuesta: "Three months after the end of the calendar or fiscal year.",
    },
    {
      pregunta: "What are the quarterly payments?",
      respuesta: "Medium and large businesses pay an advance tax on turnover each quarter, and small businesses a presumptive tax. Our presumptive tax calculator works them out.",
    },
    {
      pregunta: "Does this calculator work out taxable profit?",
      respuesta: "No. Enter the taxable profit from your accounts after the deductions the Revenue Code allows.",
    },
  ],
  glosario: [
    { termino: "Taxable profit", definicion: "Business income minus allowable expenses, on which corporate income tax is charged." },
  ],
});
