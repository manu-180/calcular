import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.rental-income-tax",
  h1: "Rental income tax calculator for The Gambia",
  title: "Rental income tax calculator Gambia: tax on rent",
  description: "Work out rental income tax in The Gambia: {{gm.rental-tax-rates[residential]}} of gross residential rent and {{gm.rental-tax-rates[commercial]}} of gross commercial rent, paid every quarter.",
  intro: [
    "Landlords in The Gambia pay rental income tax on the gross rent they receive. Enter the rent for the year to see the tax and the quarterly payments.",
    "Residential rent is taxed at {{gm.rental-tax-rates[residential]}} and commercial rent at {{gm.rental-tax-rates[commercial]}}. No expenses can be deducted.",
  ],
  comoSeCalcula: [
    "Residential rent × {{gm.rental-tax-rates[residential]}}.",
    "Commercial rent × {{gm.rental-tax-rates[commercial]}}. Hotels, guest houses, inns and boarding houses count as commercial.",
    "The yearly tax is paid in four quarterly instalments.",
  ],
  ejemplo: ["The GRA example: D600,000 of residential rent pays D48,000 a year, and D1,200,000 of commercial rent pays D180,000, or D45,000 a quarter."],
  faq: [
    {
      pregunta: "When do I pay?",
      respuesta: "Quarterly, by the 15th of the month after each quarter. The annual return and any balance are due three months after the end of the tax year.",
    },
    {
      pregunta: "What about rent paid in advance?",
      respuesta: "Rental income tax works on a cash basis: rent received in advance is taxed in the quarter you receive it.",
    },
    {
      pregunta: "Is rental income tax a final tax?",
      respuesta: "Yes. The quarterly payments are set against the total you declare at the end of the year, and the rent is not taxed again.",
    },
    {
      pregunta: "My tenant is a business. Does it withhold the tax?",
      respuesta: "Yes. The GRA withholding tax rules require the tenant to withhold the same rates on rent and pay them to the GRA, giving you a withholding certificate.",
    },
  ],
  glosario: [
    { termino: "Gross rent", definicion: "The full rent received, before any repairs, fees or other costs." },
    { termino: "Final tax", definicion: "A tax that settles the liability on that income, with nothing more to pay on it." },
  ],
});
