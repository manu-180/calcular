import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.vat-calculator",
  h1: "Oman VAT calculator",
  title: "Oman VAT calculator at {{om.vat}}: add or remove VAT",
  description:
    "Work out VAT in Oman at {{om.vat}}: add it to a price or take it out of a price that includes it, in Omani rials.",
  intro: [
    "VAT in Oman is charged on the supply and import of goods and services at {{om.vat}} of the taxable value, unless the law sets an exemption or a zero rate.",
    "Choose whether to add VAT to a price or take it out of a price that includes it, then enter the amount.",
  ],
  comoSeCalcula: [
    "Adding VAT: VAT = price × {{om.vat}}, and the price with VAT = price + VAT.",
    "Removing VAT: price before VAT = price with VAT ÷ (1 + {{om.vat}}), and VAT is the difference.",
    "Results are rounded to three decimal places.",
  ],
  ejemplo: [
    "An item priced at OMR 100 before VAT carries OMR 5 of VAT, for OMR 105 in total. If the price with VAT is OMR 105, the price before VAT is OMR 100.",
  ],
  faq: [
    {
      pregunta: "What is the VAT rate in Oman?",
      respuesta: "{{om.vat}} of the taxable value, under article 36 of the VAT Law issued by Royal Decree 121/2020.",
    },
    {
      pregunta: "Since when has Oman charged VAT?",
      respuesta: "The law came into force 180 days after publication of the decree issued on 12 October 2020, that is, from {{om.vat#desde}}.",
    },
    {
      pregunta: "Do prices have to include VAT?",
      respuesta: "Yes. Article 37 of the law requires taxable persons to show prices of goods and services including VAT.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value added tax charged on the import and supply of goods or services at each stage of production and distribution." },
  ],
});
