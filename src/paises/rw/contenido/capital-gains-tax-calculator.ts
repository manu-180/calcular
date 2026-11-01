import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Rwanda",
  title: "Capital gains tax Rwanda: 10% on shares and similar assets",
  description: "Work out capital gains tax at {{rw.cgt-rate}} on the sale of shares, licences, debt instruments, options and similar assets in Rwanda.",
  intro: [
    "When you sell or transfer shares or similar assets for more than you paid, the gain is taxed at {{rw.cgt-rate}}. Enter the price you sold at and what you paid.",
  ],
  comoSeCalcula: [
    "Capital gain: sale price less what you paid for the asset.",
    "Tax: {{rw.cgt-rate}} of the gain. A loss gives no tax.",
  ],
  ejemplo: ["Shares bought for RWF 6,000,000 and sold for RWF 10,000,000 give a gain of RWF 4,000,000 and tax of RWF 400,000."],
  faq: [
    {
      pregunta: "Which assets does it cover?",
      respuesta: "The direct or indirect sale or transfer of shares, licences, debt instruments, options, guarantees and similar assets.",
    },
    {
      pregunta: "Who declares the tax?",
      respuesta: "The company, the shareholder or the buyer declares and pays it within 15 days after the month of the sale or transfer.",
    },
    {
      pregunta: "What about selling a house or a plot?",
      respuesta: "The rate covers the assets listed above. The sale of immovable property has its own tax, paid to the district. Use the property sale tax calculator.",
    },
  ],
  glosario: [
    { termino: "Capital gain", definicion: "The profit from selling an asset for more than it cost." },
    { termino: "Debt instrument", definicion: "A bond or similar security that pays interest." },
  ],
});
