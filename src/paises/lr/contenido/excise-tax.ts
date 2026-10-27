import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.excise-tax",
  h1: "Excise tax calculator Liberia",
  title: "Liberia excise tax on beer, spirits, tobacco and drinks",
  description: "Work out Liberia's excise tax on beer, wine, spirits, sweet drinks, water and tobacco with the specific US dollar rates of the Tax Amendment Act of December 2025.",
  intro: [
    "Pick a product and enter a quantity to see the excise tax due under the new tariff.",
    "Beer and wine pay {{lr.excise-specific[beer]}} a litre and spirits {{lr.excise-specific[spirits]}} a litre, whether imported or made in Liberia.",
  ],
  comoSeCalcula: [
    "Excise tax: rate per unit × quantity.",
    "Drinks are taxed per litre, cigarettes and cigars per pack of 20, tobacco per kg and vaping liquid per mL.",
    "Unsweetened water made in Liberia pays nothing. Imported unsweetened water pays {{lr.excise-specific[water-imported]}} a litre.",
  ],
  ejemplo: ["A shipment of 1,000 packs of cigarettes pays US$500 of excise tax."],
  faq: [
    {
      pregunta: "Do imported and local products pay the same rate?",
      respuesta: "Yes, for every product on the tariff except unsweetened water. The Act ended the lower rates for local beer, spirits and tobacco.",
    },
    {
      pregunta: "Will these rates change?",
      respuesta: "Yes. From 1 January 2027 the specific rates on tobacco, alcohol and sugar-sweetened drinks are adjusted every year for US dollar inflation and half of nominal GDP growth. The LRA must publish the new rates by 1 December.",
    },
    {
      pregunta: "Are heated tobacco and e-cigarettes covered?",
      respuesta: "Yes. Products for inhaling nicotine without combustion pay {{lr.excise-specific[nicotine]}} a kg, and vaping liquid pays {{lr.excise-specific[vape]}} a mL.",
    },
  ],
  glosario: [
    { termino: "Specific excise", definicion: "An excise charged per unit, such as per litre or per pack, instead of a percentage of the price." },
  ],
});
