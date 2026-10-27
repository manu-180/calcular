import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.property-transfer-tax-calculator",
  h1: "Property transfer tax calculator Zambia",
  title: "Property transfer tax Zambia: land, shares and licences",
  description:
    "Work out property transfer tax on land, shares and intellectual property at {{zm.ptt-rates[land]}}, or on mining rights and processing licences at {{zm.ptt-rates[mining-licence]}}.",
  intro: [
    "Choose what is being sold and enter its realised value to see the property transfer tax (PTT) due to ZRA.",
    "PTT is generally paid by the seller, who files a provisional return on the ZRA portal before the transfer.",
  ],
  comoSeCalcula: [
    "Land, buildings, shares and intellectual property: {{zm.ptt-rates[land]}} of the realised value.",
    "Mining rights for a mining licence and mineral processing licences: {{zm.ptt-rates[mining-licence]}}. Mining rights for an exploration licence: {{zm.ptt-rates[exploration-licence]}}.",
    "For land the realised value is the higher of the market value and the price the parties declare.",
  ],
  ejemplo: ["A house sold for K1,000,000 attracts K80,000 of property transfer tax."],
  faq: [
    {
      pregunta: "Who pays property transfer tax?",
      respuesta: "Generally the seller (the transferor).",
    },
    {
      pregunta: "Do I pay PTT if I give land to my child?",
      respuesta: "No. A gift to a spouse, child, adopted child or stepchild gives no realised value, so PTT does not apply. If you sell it to them, PTT applies on the actual price.",
    },
    {
      pregunta: "Are listed shares taxed?",
      respuesta: "No. Shares listed on a recognised stock exchange such as the Lusaka Securities Exchange are exempt.",
    },
    {
      pregunta: "What documents does a land transfer need?",
      respuesta: "State consent to assign, the contract of sale or letter of sale, and tax clearance certificates for both buyer and seller. A valuation report is needed above K700,000.",
    },
  ],
  glosario: [{ termino: "Realised value", definicion: "The value PTT is charged on. For land, the higher of the market price and the declared price." }],
});
