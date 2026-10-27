import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.capital-gains-tax",
  h1: "Capital gains tax calculator for The Gambia",
  title: "Capital gains tax calculator Gambia: land and shares",
  description: "Work out capital gains tax on land, buildings or shares in The Gambia: the higher of {{gm.cgt-rates[individual-gain]}} of the gain or {{gm.cgt-rates[individual-consideration]}} of the price.",
  intro: [
    "Selling land, a building, machinery or shares? Enter the price and your costs to see the capital gains tax the GRA expects.",
    "An individual pays the higher of {{gm.cgt-rates[individual-gain]}} of the gain and {{gm.cgt-rates[individual-consideration]}} of the selling price. Companies, partnerships and trusts pay the higher of {{gm.cgt-rates[company-gain]}} of the gain and {{gm.cgt-rates[company-consideration]}} of the price.",
  ],
  comoSeCalcula: [
    "Gain: selling price minus what you paid, improvement costs and selling expenses.",
    "Tax on the gain and tax on the selling price are both worked out, and the higher one is due.",
    "A gain that does not exceed {{gm.cgt-exempt-gain}} is exempt.",
  ],
  ejemplo: ["Land bought for D1.5 million, improved for D100,000 and sold for D2 million with D20,000 of costs gives a gain of D380,000. 15% of the gain is D57,000, but 5% of the price is D100,000, so the tax is D100,000."],
  faq: [
    {
      pregunta: "When must I pay?",
      respuesta: "Within 15 days after the sale. You file the capital gains tax return at the GRA office of the region, with proof of ownership, cost and selling price.",
    },
    {
      pregunta: "Is selling my home taxed?",
      respuesta: "Not if you or your parents lived in it for the two years before the sale and you reinvest the full price in another home within one year. Agricultural land has a similar rule with two years to reinvest.",
    },
    {
      pregunta: "Can I use a loss on another asset?",
      respuesta: "No. A capital loss cannot reduce the gain on another asset and cannot be carried forward.",
    },
  ],
  glosario: [
    { termino: "Consideration", definicion: "The full selling price of the asset." },
    { termino: "Capital asset", definicion: "Land, machinery, shares, an interest in a partnership and rights over them, but not depreciable assets or trading stock." },
  ],
});
