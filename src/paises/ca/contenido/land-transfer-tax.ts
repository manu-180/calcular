import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.land-transfer-tax",
  h1: "Land transfer tax calculator: Ontario, Toronto and BC",
  title: "Land transfer tax calculator: Ontario, Toronto, BC",
  description: "Calculate Ontario land transfer tax, the Toronto municipal land transfer tax and BC property transfer tax, with first-time buyer refunds in Ontario and Toronto.",
  intro: [
    "Enter the purchase price of a home to see the land transfer tax you pay when the sale closes.",
    "In Toronto you pay both the provincial land transfer tax and the municipal one. First-time buyers can get a refund of up to {{ca.on-ltt-first-time-refund}} from Ontario and up to {{ca.toronto-mltt-first-time-rebate}} from Toronto.",
  ],
  comoSeCalcula: [
    "Ontario charges 0.5% on the first $55,000, 1% up to $250,000, 1.5% up to $400,000, 2% up to $2,000,000 and 2.5% above that for homes with one or two single family residences.",
    "Toronto's municipal tax uses the same rates up to $3,000,000 and higher luxury rates above that, in force since April 1, 2026.",
    "BC charges 1% on the first $200,000, 2% up to $2,000,000 and 3% above, plus a further {{ca.bc-ptt-surcharge-rate}} on residential value over {{ca.bc-ptt-surcharge-threshold}}.",
    "First-time buyer refunds are taken off the tax, up to their maximum.",
  ],
  ejemplo: [
    "A $700,000 home in Ontario outside Toronto pays $10,475 of land transfer tax. In Toronto a first-time buyer pays $10,475 to Ontario and $10,475 to the city, less refunds of $4,000 and $4,475, for $12,475 in total.",
    "A $650,000 home in BC pays $11,000 of property transfer tax: $2,000 on the first $200,000 and $9,000 on the rest.",
  ],
  faq: [
    {
      pregunta: "Are the rates the same for every property?",
      respuesta: "No. The Ontario 2.5% rate above $2,000,000 and the Toronto luxury rates apply to land with one or two single family residences. Other property types have their own rules.",
    },
    {
      pregunta: "Does the BC first time home buyers' exemption apply here?",
      respuesta: "Not yet. The official BC pages give different figures for the current exemption, so it is left out until they match.",
    },
    {
      pregunta: "What is the Toronto first-time buyer rebate?",
      respuesta: "Up to {{ca.toronto-mltt-first-time-rebate}} off the municipal land transfer tax, on top of the Ontario refund of up to {{ca.on-ltt-first-time-refund}}.",
    },
  ],
  glosario: [
    { termino: "Land transfer tax", definicion: "A tax on the purchase price of land and homes, paid when ownership is registered." },
    { termino: "MLTT", definicion: "Municipal Land Transfer Tax, charged by the City of Toronto on top of the Ontario tax." },
  ],
});
