import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.gift-tax",
  h1: "Gift tax calculator Ghana",
  title: "Gift tax calculator Ghana: {{gh.gift-tax[resident]}} for residents",
  description: "Work out the tax on a gift from investment in Ghana: {{gh.gift-tax[resident]}} for residents and {{gh.gift-tax[non-resident]}} for non-residents.",
  intro: [
    "A gift you receive that is not related to your job or business is a gift from investment, and it is taxed on its market value.",
    "Gifts under a will, on intestacy, or from a spouse, child or parent are not taxable.",
  ],
  comoSeCalcula: [
    "Value the gift at its market value when you receive it.",
    "Residents pay {{gh.gift-tax[resident]}} of that value; non-residents pay {{gh.gift-tax[non-resident]}}.",
  ],
  ejemplo: ["A resident who receives a gift worth GH₵10,000 pays GH₵1,500."],
  faq: [
    {
      pregunta: "Which gifts are taxed?",
      respuesta: "Gifts received in respect of employment, business or investment, other than under a will, upon intestacy or by transfer to the spouse, child or parent of the person.",
    },
    {
      pregunta: "How are gifts from employment or business taxed?",
      respuesta: "They are added to your employment or business income for the year and taxed at the graduated rates. This calculator covers gifts from investment.",
    },
    {
      pregunta: "When must I file?",
      respuesta: "Within 21 days of receiving the gift, with a return that describes it, its value, the tax and the donor, and pay the tax at the same time.",
    },
  ],
  glosario: [{ termino: "Gift from investment", definicion: "A gift received other than in respect of business or employment." }],
});
