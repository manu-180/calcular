import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.rental-income-tax-calculator",
  h1: "Rental income tax calculator Rwanda",
  title: "Rental income tax Rwanda: calculator with RRA bands",
  description: "Work out tax on the rent you earn: {{rw.rental-deduction}} off for upkeep, then {{rw.rental-bands[1].tasa}} and {{rw.rental-bands[2].tasa}} bands. Loan interest is deductible.",
  intro: [
    "If you rent out a house, flat, shop or plot as an individual, you pay rental income tax to your district through the RRA. Enter the rent for the year to see the tax.",
  ],
  comoSeCalcula: [
    "Taxable income is gross rent less {{rw.rental-deduction}}, which covers upkeep. Bank interest on a loan to build or buy the property also comes off, with proof.",
    "Up to {{rw.rental-bands[1].desde}} a year: 0%. From {{rw.rental-bands[1].desde}} to {{rw.rental-bands[2].desde}}: {{rw.rental-bands[1].tasa}}. Above {{rw.rental-bands[2].desde}}: {{rw.rental-bands[2].tasa}}.",
  ],
  ejemplo: ["Rent of RWF 200,000 a month, RWF 2,400,000 for the year, gives taxable income of RWF 1,200,000 and tax of RWF 224,000."],
  faq: [
    {
      pregunta: "When is rental income tax due?",
      respuesta: "File and pay by 31 January of the following year, through the Rwanda Automated Local Government Taxes Management System.",
    },
    {
      pregunta: "Do I need a written lease?",
      respuesta: "Yes. The lease must be written and signed by owner and tenant, and a copy goes to the tax administration within 15 days of signing.",
    },
    {
      pregunta: "Do companies pay this tax?",
      respuesta: "No. It applies to individuals and any other person who is not subject to corporate income tax.",
    },
  ],
  glosario: [
    { termino: "Gross rent", definicion: "All rent received in the year before any deduction." },
    { termino: "Taxable rental income", definicion: "Gross rent less the standard deduction and allowed loan interest." },
  ],
});
