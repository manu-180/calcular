import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Kenya",
  title: "Capital gains tax calculator Kenya: {{ke.cgt-rate}} on the gain",
  description: "Work out capital gains tax on land, buildings or shares in Kenya: {{ke.cgt-rate}} of the net gain after purchase, improvement and selling costs.",
  intro: [
    "When you sell land, a building or shares for more than they cost, the gain is taxed. Enter the figures to see the tax and what you keep.",
    "CGT is a final tax: once it is paid, the gain is not taxed again.",
  ],
  comoSeCalcula: [
    "Start with the transfer value and take off the costs of selling.",
    "Then take off what you paid, with the costs of buying, and what you spent improving the property. The result is the net gain.",
    "The tax is {{ke.cgt-rate}} of the net gain. If there is no gain, there is no tax.",
  ],
  ejemplo: ["A plot bought for KSh 6 million, improved for KSh 500,000 and sold for KSh 10 million with KSh 300,000 of selling costs leaves a gain of KSh 3.2 million. The tax is KSh 480,000."],
  faq: [
    {
      pregunta: "Are transfers between spouses taxed?",
      respuesta: "KRA lists several exempt transfers, among them transfers between spouses and to a company owned entirely by the spouses or close family.",
    },
    {
      pregunta: "Do shares in foreign companies with Kenyan land count?",
      respuesta: "Yes, since 1 July 2023, when the company gets more than 20% of its value from property in Kenya.",
    },
    {
      pregunta: "Is CGT added to my income tax?",
      respuesta: "No. It is a final tax at {{ke.cgt-rate}} of the net gain.",
    },
  ],
  glosario: [{ termino: "Net gain", definicion: "Sale price less selling costs, purchase cost and improvements." }],
});
