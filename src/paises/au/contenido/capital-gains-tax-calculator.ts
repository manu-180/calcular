import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator",
  title: "Capital gains tax calculator Australia 2026-27",
  description: "Estimate the capital gains tax on selling shares, crypto or an investment property, with the {{au.cgt-descuento}} CGT discount and the 2026-27 resident tax rates.",
  intro: [
    "Capital gains tax is part of your income tax, not a separate tax. A capital gain increases the tax you pay at your individual income tax rate.",
    "Enter what the asset cost you, what you sold it for and your other income for the year. You see the extra tax the sale adds to your bill.",
  ],
  comoSeCalcula: [
    "The capital gain is the sale price minus the cost base.",
    "If you are an Australian resident and owned the asset for at least 12 months, you reduce the gain by {{au.cgt-descuento}}.",
    "The net capital gain is added to your other income. The extra tax is the difference between the tax with and without the gain, using the 2026-27 rates and the {{au.medicare-levy}} Medicare levy.",
  ],
  ejemplo: [
    "Selling for $400,000 an asset that cost $300,000, after more than 12 months, gives a $100,000 gain and a $50,000 net capital gain. With $85,000 of other income, the extra tax is $16,000.",
  ],
  faq: [
    {
      pregunta: "How are the 12 months counted?",
      respuesta: "You exclude the day you acquired the asset and the day of the CGT event. If there is a contract of sale, the CGT event happens on the contract date, not at settlement.",
    },
    {
      pregunta: "Is the 50% CGT discount changing?",
      respuesta: "The 2026-27 Federal Budget proposes replacing it with an inflation-based discount for gains arising after 1 July 2027. It is not law yet, and the ATO says the changes don't apply to Tax Time 2026.",
    },
    {
      pregunta: "Is every asset subject to CGT?",
      respuesta: "No. The ATO keeps a list of CGT assets and exemptions. Check it first, because this calculator assumes the whole gain is taxable.",
    },
  ],
  glosario: [
    { termino: "Cost base", definicion: "What the asset cost you, plus other costs the ATO lets you include." },
    { termino: "CGT event", definicion: "The point at which you make a capital gain or loss, usually when you sell." },
    { termino: "Capital loss", definicion: "When you sell for less than the cost base. It can reduce capital gains." },
  ],
});
