import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.property-sale-tax-calculator",
  h1: "Property sale tax calculator Rwanda",
  title: "Tax on sale of immovable property in Rwanda",
  description: "Work out the district tax on selling a house, building or plot: {{rw.sale-tax-other}} or {{rw.sale-tax-registered}} of the price above {{rw.sale-tax-allowance}}.",
  intro: [
    "Selling a house, a building or a plot in Rwanda carries a tax paid to the district. Enter the sale value to see what is due.",
  ],
  comoSeCalcula: [
    "The first {{rw.sale-tax-allowance}} of the sale value is not taxed.",
    "A seller not registered for income tax pays {{rw.sale-tax-other}} on the rest.",
    "A seller registered for income tax pays {{rw.sale-tax-registered}} on the sale of property for commercial use.",
  ],
  ejemplo: ["A house sold for RWF 30,000,000 by a private owner pays 2.5% on RWF 25,000,000: RWF 625,000."],
  faq: [
    {
      pregunta: "How do I declare it?",
      respuesta: "Through the Rwanda Automated Local Government Taxes Management System, then pay by mobile money, MobiCash or bank.",
    },
    {
      pregunta: "Is this the same as capital gains tax?",
      respuesta: "No. This tax is worked out on the sale value of immovable property. Capital gains tax applies to shares and similar assets.",
    },
    {
      pregunta: "Does a cheap plot pay anything?",
      respuesta: "No tax is due when the sale value is {{rw.sale-tax-allowance}} or less.",
    },
  ],
  glosario: [
    { termino: "Immovable property", definicion: "Land, buildings and what is built on the land." },
    { termino: "Sale value", definicion: "The price agreed for the property." },
  ],
});
