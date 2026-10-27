import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.sugar-tax-calculator",
  h1: "Sugar tax calculator for sweetened drinks in Qatar",
  title: "Sugar tax in Qatar: excise per litre by sugar content",
  description:
    "Work out Qatar's excise tax on sweetened drinks: {{qa.sugar-tax[medium]}} a litre for medium sugar and {{qa.sugar-tax[high]}} for high sugar, from {{qa.sugar-tax#desde}}.",
  intro: [
    "Since {{qa.sugar-tax#desde}}, Qatar taxes sweetened drinks by how much sugar they contain, following a model agreed by the GCC countries.",
    "Enter the sugar per 100 ml from the label and the volume to see the tax.",
  ],
  comoSeCalcula: [
    "Drinks with less than {{qa.sugar-tax-tiers[medium]}} g of sugar per 100 ml are exempt.",
    "From {{qa.sugar-tax-tiers[medium]}} g to just under {{qa.sugar-tax-tiers[high]}} g the tax is {{qa.sugar-tax[medium]}} a litre, and from {{qa.sugar-tax-tiers[high]}} g it's {{qa.sugar-tax[high]}} a litre.",
    "Drinks with only artificial sweeteners and no added sugar are exempt.",
  ],
  ejemplo: ["A case of 24 cans of 330 ml with 10.6 g of sugar per 100 ml holds 7.92 litres and pays about QAR 8.40."],
  faq: [
    {
      pregunta: "What counts as a medium sugar drink?",
      respuesta: "One with between {{qa.sugar-tax-tiers[medium]}} and 7.99 g of total sugar per 100 ml.",
    },
    {
      pregunta: "Are diet drinks taxed?",
      respuesta: "Not if they contain only artificial sweeteners and no added sugar.",
    },
    {
      pregunta: "Who pays the tax?",
      respuesta: "Importers and producers of excise goods register and pay it. It usually reaches shoppers through the shelf price.",
    },
  ],
  glosario: [{ termino: "Tiered volumetric model", definicion: "A tax charged per litre at a rate that rises with the sugar content." }],
});
