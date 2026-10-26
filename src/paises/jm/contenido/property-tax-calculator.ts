import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.property-tax-calculator",
  h1: "Property tax calculator Jamaica",
  title: "Property tax calculator Jamaica: tax on your land value",
  description:
    "Work out your annual property tax in Jamaica from the unimproved value of your land with the TAJ rates: {{jm.property-tax-minimum}} on the first {{jm.property-tax-bands[0].hasta}}, then rising bands.",
  intro: [
    "Property tax in Jamaica is charged every year on the unimproved value of your land. The house or building on it does not change the tax.",
    "Enter the land value from your valuation notice to see the tax for the year.",
  ],
  comoSeCalcula: [
    "The first {{jm.property-tax-bands[0].hasta}} of unimproved value pays a flat {{jm.property-tax-minimum}}.",
    "From {{jm.property-tax-bands[1].desde}} to {{jm.property-tax-bands[1].hasta}} the rate is {{jm.property-tax-bands[1].tasa}}, then {{jm.property-tax-bands[2].tasa}} up to {{jm.property-tax-bands[2].hasta}} and {{jm.property-tax-bands[3].tasa}} up to {{jm.property-tax-bands[3].hasta}}.",
    "The rates keep rising by band: {{jm.property-tax-bands[4].tasa}} up to {{jm.property-tax-bands[4].hasta}}, {{jm.property-tax-bands[5].tasa}} up to {{jm.property-tax-bands[5].hasta}}, {{jm.property-tax-bands[6].tasa}} up to {{jm.property-tax-bands[6].hasta}} and {{jm.property-tax-bands[-1].tasa}} above that.",
    "When the land is worth more than {{jm.property-tax-split}}, the band from {{jm.property-tax-bands-over-30m[-2].desde}} to {{jm.property-tax-bands-over-30m[-2].hasta}} is charged at {{jm.property-tax-bands-over-30m[-2].tasa}} and the rest at {{jm.property-tax-bands-over-30m[-1].tasa}}.",
  ],
  ejemplo: ["Land with an unimproved value of J$5,000,000 pays J$29,100 a year in property tax."],
  faq: [
    {
      pregunta: "What is the unimproved value?",
      respuesta: "The value of the land alone, as set by the Commissioner of Land Valuation. Buildings and other improvements are left out.",
    },
    {
      pregunta: "Where do I find my land value?",
      respuesta: "On your notice of valuation, or in the TAJ property tax online query with your valuation number.",
    },
    {
      pregunta: "Is the property tax the same in every parish?",
      respuesta: "Yes. The TAJ rate schedule applies to all parishes.",
    },
  ],
  glosario: [
    { termino: "Valuation number", definicion: "The number that identifies your land on the valuation roll." },
    { termino: "Valuation roll", definicion: "The official list of land values used to charge property tax." },
  ],
});
