import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.rental-income-tax-calculator",
  h1: "Rental income tax calculator Ethiopia",
  title: "Rental income tax calculator Ethiopia {{anio}} (Schedule B)",
  description:
    "Work out the yearly tax on rental income of individuals with the Schedule B bands of Proclamation 1395/2025: 0% on the first {{et.rental-income-tax[1].desde}}.",
  intro: [
    "Individuals who rent out a building, a home or a warehouse pay rental income tax under Schedule B. Enter your taxable rental income for the year to see the tax and your band.",
  ],
  comoSeCalcula: [
    "The first {{et.rental-income-tax[1].desde}} of taxable rental income a year pays nothing.",
    "Then {{et.rental-income-tax[1].tasa}} up to {{et.rental-income-tax[2].desde}}, {{et.rental-income-tax[2].tasa}} up to {{et.rental-income-tax[3].desde}}, {{et.rental-income-tax[3].tasa}} up to {{et.rental-income-tax[4].desde}} and {{et.rental-income-tax[4].tasa}} up to {{et.rental-income-tax[5].desde}}.",
    "Income above {{et.rental-income-tax[-1].desde}} pays {{et.rental-income-tax[-1].tasa}}.",
    "Enter the income after the deductions you are allowed. This calculator does not work out the deductions.",
  ],
  ejemplo: [
    "ETB 100,000 of taxable rental income pays ETB 14,800 a year.",
  ],
  faq: [
    {
      pregunta: "What counts as rental income?",
      respuesta: "Income from renting out any building, residence or warehouse. Rent from industrial park buildings built by a developer, and some leases under the capital goods lease law, are left out.",
    },
    {
      pregunta: "Since when do these bands apply?",
      respuesta: "Proclamation 1395/2025 set them for income derived from 8 July 2025.",
    },
    {
      pregunta: "Do companies use these bands?",
      respuesta: "No. The bands are for individuals. Bodies such as companies are taxed differently.",
    },
  ],
  glosario: [
    { termino: "Schedule B", definicion: "The part of the income tax law that covers rental income." },
    { termino: "Taxable rental income", definicion: "Rent for the year after the deductions the law allows." },
  ],
});
