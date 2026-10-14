import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.capital-gains-tax",
  h1: "Capital Gains Tax calculator Ireland",
  title: "Capital Gains Tax calculator Ireland: CGT at {{ie.cgt-rate}}",
  description: "Work out Capital Gains Tax on selling a property, shares or other assets in Ireland, with the {{ie.cgt-annual-exemption}} personal exemption and the {{ie.cgt-rate}} rate.",
  intro: [
    "When you sell or give away an asset for more than it cost you, the profit is a chargeable gain and you may owe Capital Gains Tax (CGT).",
    "The rate for most gains is {{ie.cgt-rate}} for disposals from {{ie.cgt-rate#desde}}. Enter your figures to see the tax.",
  ],
  comoSeCalcula: [
    "Take the sale price (or market value, if you gave the asset away) and subtract what you paid and your allowable expenses, such as solicitor's and auctioneer's fees.",
    "Subtract any losses you can use and your personal exemption of {{ie.cgt-annual-exemption}} a year.",
    "Multiply what is left by the CGT rate of {{ie.cgt-rate}}.",
  ],
  ejemplo: ["Mary sold a house in July 2025 for €380,000 that cost €130,000, with €6,690 of fees. Her gain was €243,310, or €242,040 after the exemption, and her CGT at 33% was €79,873.20."],
  faq: [
    {
      pregunta: "Has the CGT rate changed?",
      respuesta: "Yes. It was 33% for disposals up to 6 October 2026, and it is 31% for most gains from 7 October 2026.",
    },
    {
      pregunta: "Are all gains taxed at {{ie.cgt-rate}}?",
      respuesta: "No. Gains from development land pay 33%, gains from foreign life policies and foreign investment products pay 40%, and some venture capital fund gains pay less.",
    },
    {
      pregunta: "Do I pay CGT on my car?",
      respuesta: "No. Private motor cars are exempt from CGT, along with some other assets on Revenue's exempt list.",
    },
    {
      pregunta: "Do I need to file a return if no tax is due?",
      respuesta: "Yes. You must file a return if you disposed of an asset, even when there is no tax to pay.",
    },
  ],
  glosario: [
    { termino: "Disposal", definicion: "Selling, giving away, exchanging or otherwise parting with an asset." },
    { termino: "Allowable expenses", definicion: "Costs you can deduct from the gain, such as fees and money spent that added value to the asset." },
  ],
});
