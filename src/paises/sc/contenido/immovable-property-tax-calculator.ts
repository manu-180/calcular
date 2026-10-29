import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.immovable-property-tax-calculator",
  h1: "Seychelles immovable property tax calculator {{anio}}",
  title: "Seychelles property tax {{anio}}: {{sc.property-tax-rate}} of value",
  description: "Immovable Property Tax for non-Seychellois owners is {{sc.property-tax-rate}} of market value a year. Check the amount and the exemptions.",
  intro: [
    "Immovable Property Tax applies to non-Seychellois who own property in Seychelles. The Immovable Property Tax Act 2019 brought it in from January 2020.",
    "The rate is {{sc.property-tax-rate}} of the market value of a residential property. The tax for each year is imposed on 1 January and is payable by 31 December.",
  ],
  comoSeCalcula: [
    "Start with the approved market value on the valuation notice from the Chief Valuation Officer.",
    "Multiply it by {{sc.property-tax-rate}} to get the tax for the year.",
    "Check the exemptions: commercial and industrial property, residential property of a taxpayer married to a Seychellois, and the first year of a first time owner who applies in writing.",
  ],
  ejemplo: [
    "A non-Seychellois owner of a villa with an approved value of SCR 5,000,000 pays 0.50 % of that value, which is SCR 25,000 a year. The same villa owned by someone married to a Seychellois pays nothing.",
  ],
  faq: [
    {
      pregunta: "How long does a valuation last?",
      respuesta: "The SRC says an approved valuation is valid for five years. After that the owner submits a new valuation form to the Chief Valuation Officer.",
    },
    {
      pregunta: "Can I pay in foreign currency?",
      respuesta: "Yes. Non-Seychellois can pay by bank transfer in dollars, euros or pounds. The SRC converts at the Central Bank of Seychelles mid rate of the day the payment arrives.",
    },
    {
      pregunta: "What if I do not register the property?",
      respuesta: "The SRC lists fines payable to the Registrar General: SCR 50,000 for commercial, industrial and multi-purpose properties including villas, and SCR 10,000 for any other immovable property.",
    },
  ],
  glosario: [
    { termino: "Immovable property", definicion: "Land and buildings, such as condominium units, villas and commercial premises." },
    { termino: "Chief Valuation Officer", definicion: "The official who values the property and issues the notice of valuation." },
    { termino: "Non-Seychellois", definicion: "A person who does not hold Seychellois status, the group this tax is aimed at." },
  ],
});
