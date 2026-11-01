import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.property-transfer-tax-calculator",
  h1: "Barbados property transfer tax calculator {{anio}}",
  title: "Property transfer tax calculator {{anio}} for Barbados",
  description:
    "Estimate the Barbados property transfer tax on a sale at {{bb.property-transfer-tax-rate}}, with the exempt part of the price when the land has a house.",
  intro: [
    "Property transfer tax is charged on the sale of land in Barbados under the Property Transfer Tax Act, Cap. 84A. Section 5 sets the rate at {{bb.property-transfer-tax-rate}} of the sale price.",
    "When the land has a dwelling house, part of the price is exempt. Enter the sale price and say whether a house stands on the land to see the tax.",
  ],
  comoSeCalcula: [
    "Exempt part: with a dwelling house, the first {{bb.property-transfer-tax-exemption}} of the price is left out of the tax.",
    "Taxable part: the sale price minus the exempt part. Without a dwelling house the whole price is taxable.",
    "Tax: the taxable part multiplied by {{bb.property-transfer-tax-rate}}.",
    "Reliefs and exemptions that depend on the seller or on how long the property was owned are not included.",
  ],
  ejemplo: [
    "A house sells for Bds$600,000. The exempt part is Bds$150,000, so Bds$450,000 is taxable. At 2.5% the tax is Bds$11,250.00. Vacant land that sells for Bds$200,000 has no exempt part, so the tax is Bds$5,000.00.",
  ],
  faq: [
    {
      pregunta: "What is the property transfer tax rate in Barbados?",
      respuesta: "Section 5 of the Property Transfer Tax Act, Cap. 84A sets {{bb.property-transfer-tax-rate}}.",
    },
    {
      pregunta: "Is part of the price exempt?",
      respuesta: "For land with a dwelling house the Act leaves part of the price out of the tax. Confirm the amount in section 5 before you rely on this estimate.",
    },
    {
      pregunta: "Who pays the tax?",
      respuesta: "The Act places the tax on the person who transfers the property. A lawyer handling the sale normally settles it at completion.",
    },
  ],
  glosario: [
    { termino: "Property transfer tax", definicion: "A tax charged on the transfer of land by sale." },
    { termino: "Dwelling house", definicion: "A building used as a home, which brings an exempt part of the price." },
    { termino: "Taxable part", definicion: "The portion of the price on which the tax rate is applied." },
  ],
});
