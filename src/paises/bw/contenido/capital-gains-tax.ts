import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.capital-gains-tax",
  h1: "Capital gains tax calculator Botswana",
  title: "Capital gains tax calculator Botswana for individuals",
  description: "Work out capital gains tax on selling property, shares or other assets in Botswana with the rates for individuals in the current Income Tax Act.",
  intro: [
    "Since 1 July 2026 an individual pays capital gains tax on the net aggregate gain for the year, on its own scale and separately from income tax.",
    "Enter the sale price and the cost of the asset, plus any other gains or losses in the same tax year.",
  ],
  comoSeCalcula: [
    "The gain is the sale price less the cost of the asset.",
    "All gains in the tax year are added together and the losses come off. Last year's net loss can also be used, but only for one year.",
    "The first {{bw.cgt-individual[1].desde}} of net aggregate gain is not taxed. Above that the rates go from {{bw.cgt-individual[1].tasa}} up to {{bw.cgt-individual[-1].tasa}} on gains over {{bw.cgt-individual[-1].desde}}.",
  ],
  ejemplo: [
    "You sell a plot for P900 000 that cost you P600 000. The gain is P300 000 and, with no other gains, the tax is P49 650.",
  ],
  faq: [
    {
      pregunta: "Is capital gains tax added to my income tax?",
      respuesta: "No. Under section 102 of the Income Tax Act, 2026 the net aggregate gain of an individual is taxed at its own rates in Schedule 1, apart from your salary or business income.",
    },
    {
      pregunta: "Can I adjust the cost of property for inflation?",
      respuesta: "Yes, for immovable property held for more than a year. Parts of the cost are multiplied by the national cost of living index for the month of the sale, divided by the index for the month the cost was incurred.",
    },
    {
      pregunta: "What if a non-resident sells an asset?",
      respuesta: "If the seller has no permanent establishment in Botswana, the buyer must withhold {{bw.wht-non-resident[capital-gain]}} of the price unless BURS agrees to a different rate.",
    },
  ],
  glosario: [
    { termino: "Net aggregate gain", definicion: "Your capital gains for the tax year less your capital losses for the same year." },
  ],
});
