import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.teli-metavivasis",
  h1: "Property transfer fees calculator for Cyprus",
  title: "Cyprus property transfer fees at the Land Registry 2026",
  description: "Work out Cyprus property transfer fees: {{cy.teli-metavivasis[0].tasa}}, {{cy.teli-metavivasis[1].tasa}} and {{cy.teli-metavivasis[2].tasa}} bands, a {{cy.meiosi-telon-metavivasis}} reduction and no fees with VAT.",
  intro: [
    "When you buy property you pay the Department of Lands and Surveys fees to transfer the title.",
    "Enter the property value and whether the purchase carried VAT.",
  ],
  comoSeCalcula: [
    "The scale is tiered: {{cy.teli-metavivasis[0].tasa}} up to {{cy.teli-metavivasis[0].hasta}}, {{cy.teli-metavivasis[1].tasa}} from there up to {{cy.teli-metavivasis[1].hasta}} and {{cy.teli-metavivasis[2].tasa}} above.",
    "When no VAT is charged, the fees are reduced by {{cy.meiosi-telon-metavivasis}}.",
    "When the same sale is subject to VAT, no transfer fees are due.",
  ],
  ejemplo: [
    "For a €200,000 property without VAT, the scale gives €9,200. With the 50% reduction you pay €4,600.",
  ],
  faq: [
    { pregunta: "When are no transfer fees due?", respuesta: "When the sale was subject to VAT, usually new property bought from a developer." },
    { pregunta: "Does the reduction apply to repossessed property?", respuesta: "No. The law gives no reduction when the property was bought in a mortgaged-property sale procedure." },
    { pregunta: "On what value are fees charged?", respuesta: "On the sale price. If the Director of the Land Registry finds it below market value, fees can be charged on the market value." },
  ],
  glosario: [
    { termino: "Land Registry", definicion: "The Department of Lands and Surveys, which registers property titles." },
  ],
});
