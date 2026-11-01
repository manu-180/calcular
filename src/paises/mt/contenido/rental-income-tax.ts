import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.rental-income-tax",
  h1: "Rental income tax calculator Malta",
  title: "Rental income tax Malta: {{mt.rental-income-tax-rate}} final tax calculator",
  description: "Work out the {{mt.rental-income-tax-rate}} final tax on rental income in Malta from the gross rent you receive in a month or a year.",
  intro: [
    "Landlords in Malta can choose to pay a final tax of {{mt.rental-income-tax-rate}} on the gross rent they receive, instead of adding it to their other income.",
    "Enter the rent and say whether it is monthly or yearly. You get the tax for the year and what is left.",
  ],
  comoSeCalcula: [
    "The tax is {{mt.rental-income-tax-rate}} of the gross rent, with no deduction for expenses.",
    "If you let more than one property and choose this option, it applies to the total rent from all of them for that year.",
  ],
  ejemplo: ["Rent of €1,000 a month is €12,000 a year, so the tax is €1,800."],
  faq: [
    {
      pregunta: "Is the tax final?",
      respuesta: "Yes. Rent taxed this way is kept apart from your other income, you do not declare it in your tax return and no refund or set-off is given.",
    },
    {
      pregunta: "What if I do not declare my rent?",
      respuesta: "If an enquiry finds rent that should have been declared, it is taxed at 35 cents on every euro, plus interest and additional tax.",
    },
    {
      pregunta: "Do I have to use the flat rate?",
      respuesta: "No. It is an option. Otherwise the rent is added to your income and taxed at your normal rates, with the deductions the law allows.",
    },
  ],
  glosario: [
    { termino: "Gross rental income", definicion: "All the rent received, before any expenses." },
    { termino: "Tenement", definicion: "The legal word for a property let out, such as a flat, house or shop." },
  ],
});
