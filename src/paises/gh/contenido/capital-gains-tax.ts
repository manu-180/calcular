import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.capital-gains-tax",
  h1: "Capital gains tax calculator Ghana",
  title: "Capital gains tax calculator Ghana ({{gh.cgt-rate}})",
  description: "Work out capital gains tax for individuals in Ghana: {{gh.cgt-rate}} of the net gain on the sale of land, buildings, shares and other assets.",
  intro: [
    "When you sell an asset for more than it cost you, the profit is a capital gain. For individuals it is taxed at {{gh.cgt-rate}}.",
    "Enter the sale price, what the asset cost you and the expenses of the sale.",
  ],
  comoSeCalcula: [
    "Net gain: sale price minus cost of acquisition, improvements, legal fees and other expenses necessarily incurred to sell.",
    "Capital gains tax for individuals: {{gh.cgt-rate}} of the net gain.",
  ],
  ejemplo: ["Selling for GH₵100,000 an asset that cost GH₵60,000, with GH₵5,000 of selling costs, gives a gain of GH₵35,000 and a tax of GH₵5,250."],
  faq: [
    {
      pregunta: "What is the capital gains tax rate in Ghana?",
      respuesta: "For individuals, {{gh.cgt-rate}} of the net gain, treated as an isolated transaction. For businesses the gain is included in the annual return.",
    },
    {
      pregunta: "What costs can I deduct?",
      respuesta: "The cost of acquisition, improvements, legal fees and other expenses necessarily incurred in selling the property.",
    },
    {
      pregunta: "How are gains on shares taxed?",
      respuesta: "The gain is the sale proceeds minus the purchase cost. It is taxed at the highest marginal rate, but an individual may opt for a rate of 15%.",
    },
  ],
  glosario: [{ termino: "Capital gain", definicion: "The amount by which the price received for an asset exceeds its cost." }],
});
