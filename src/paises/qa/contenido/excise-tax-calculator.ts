import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.excise-tax-calculator",
  h1: "Excise tax calculator for Qatar",
  title: "Excise tax in Qatar: tobacco and energy drinks",
  description:
    "Work out Qatar's excise tax on tobacco, energy drinks and special-category goods: {{qa.excise[tobacco]}} of the price before tax.",
  intro: [
    "Qatar charges excise tax on goods seen as harmful to health or the environment, under a GCC agreement.",
    "Enter the price to see the tax and the final price, or take the tax out of a price that already includes it.",
  ],
  comoSeCalcula: [
    "Tobacco products, energy drinks and special-category goods pay {{qa.excise[tobacco]}} of the higher of the standard price and the retail price before tax.",
    "If the price already includes the tax, the price before tax is the final price divided by two.",
    "Sweetened drinks are taxed per litre by sugar content instead, with their own calculator.",
  ],
  ejemplo: ["A pack of cigarettes priced at QAR 25 before tax pays QAR 25 of excise tax, for a final price of QAR 50."],
  faq: [
    {
      pregunta: "Who registers for excise tax?",
      respuesta: "Anyone who imports excise goods into Qatar or produces them in Qatar.",
    },
    {
      pregunta: "Since when has Qatar had excise tax?",
      respuesta: "Since January 2019, under Law No. 25 of 2018.",
    },
    {
      pregunta: "What is the digital tax stamp?",
      respuesta: "A sticker or digital code placed on excise goods and activated electronically, so the GTA can check that the tax was paid.",
    },
  ],
  glosario: [{ termino: "GTA", definicion: "General Tax Authority, which collects taxes in Qatar." }],
});
