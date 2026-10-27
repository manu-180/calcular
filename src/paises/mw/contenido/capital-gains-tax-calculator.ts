import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Malawi",
  title: "Capital gains tax calculator Malawi: CPI indexation",
  description:
    "Work out the capital gain on a house, land or shares with the CPI indexation the MRA publishes, and the {{mw.cgt-provisional-rate}} provisional tax on it.",
  intro: [
    "Enter what you paid for an asset, when, and what you sold it for. The calculator adjusts the cost for inflation the way the Taxation Act requires.",
    "It uses the consumer price indices the Malawi Revenue Authority publishes each month, with 1970 as the base year.",
  ],
  comoSeCalcula: [
    "Indexation factor: the CPI for the month of the sale divided by the CPI for the month you bought or built the asset.",
    "Adjusted cost: the original cost multiplied by the indexation factor.",
    "Capital gain or loss: the selling price less the adjusted cost.",
    "Provisional tax: {{mw.cgt-provisional-rate}} of the gain. A loss pays no provisional tax.",
  ],
  ejemplo: [
    "The MRA's example: a house that cost K1,000,000 to build in March 1992 and sold for K85,000,000 in June 2014. The factor is 73.95, the adjusted cost K73,950,000, the gain K11,050,000 and the provisional tax K3,315,000.",
  ],
  faq: [
    {
      pregunta: "Is all of the gain taxable?",
      respuesta: "Yes, 100% of the gain is taxable. If you also made a capital loss, you can set the loss against the gain and only the rest is taxed.",
    },
    {
      pregunta: "Are gains on shares taxed?",
      respuesta: "Yes. Since 30 December 2025 all gains from selling shares are taxed, however long you held them. The old exemption for listed shares held for twelve months is gone.",
    },
    {
      pregunta: "Which CPI is the latest?",
      respuesta: "The latest index in the MRA notice is for the month starting {{mw.cpi#desde}}. The calculator does not take sales after that month.",
    },
  ],
  glosario: [
    { termino: "Basis", definicion: "What the asset cost you to buy or build." },
    { termino: "Indexation factor", definicion: "How much prices rose between the month you bought the asset and the month you sold it." },
  ],
});
