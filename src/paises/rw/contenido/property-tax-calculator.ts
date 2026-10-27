import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.property-tax-calculator",
  h1: "Property tax calculator Rwanda",
  title: "Immovable property tax Rwanda: buildings and land",
  description: "Work out the yearly immovable property tax on a building ({{rw.property-residential}} for homes, {{rw.property-commercial}} commercial) or on a plot of land.",
  intro: [
    "Owners of buildings and plots pay immovable property tax to their district every year. Choose what you own and enter its value or area.",
  ],
  comoSeCalcula: [
    "Residential building and its plot: {{rw.property-residential}} of market value. Three floors: {{rw.property-residential-3}}. More than three floors: {{rw.property-residential-4}}.",
    "Commercial building and its plot: {{rw.property-commercial}}. Industrial, or belonging to a micro or small business: {{rw.property-industrial}}.",
    "Land: the district rate per square metre, from zero up to {{rw.land-max}}.",
    "The home you live in is exempt, with its annexes on the same plot.",
  ],
  ejemplo: ["A house rented out with a market value of RWF 50,000,000 pays RWF 250,000 a year. A 600 square metre plot at RWF 80 a square metre pays RWF 48,000."],
  faq: [
    {
      pregunta: "When is property tax due?",
      respuesta: "Declare and pay by 31 December of the tax year, online through the Rwanda Automated Local Government Taxes Management System.",
    },
    {
      pregunta: "Which land is exempt?",
      respuesta: "Farm, livestock or forestry land of two hectares or less, and land set aside for housing where no basic infrastructure has been built.",
    },
    {
      pregunta: "How often is the value updated?",
      respuesta: "Property is valued every five years, starting on 1 January of the first tax year.",
    },
    {
      pregunta: "What if I buy during the year?",
      respuesta: "The buyer owes the tax from the date of the transfer, prorated for the rest of the year.",
    },
  ],
  glosario: [
    { termino: "Market value", definicion: "What the building and its plot would sell for." },
    { termino: "District council", definicion: "The local authority that sets the land rate in its district." },
  ],
});
