import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator Fiji {{anio}}",
  title: "Capital gains tax Fiji {{anio}}: {{fj.cgt-rate}} on the gain",
  description: "FRCS lists capital gains tax at {{fj.cgt-rate}}. Enter the sale price, cost and selling costs to estimate the tax and the cash you keep.",
  intro: [
    "Capital gains tax (CGT) in Fiji is charged at {{fj.cgt-rate}} on the gain you make when you sell a taxable asset, as listed on the FRCS tax rates page. The rate is the same in every year FRCS shows, from 2018 to 2026.",
    "Enter the sale price, what the asset cost you and your buying and selling costs. The calculator shows the gain, the tax and what you keep.",
  ],
  comoSeCalcula: [
    "The gain is the sale price, less what the asset cost you, less the costs of buying and selling it that you can show.",
    "If the result is zero or negative, there is no gain and no tax on these figures.",
    "A positive gain is multiplied by the CGT rate of {{fj.cgt-rate}}. The cash you keep is the sale price less your selling costs and the tax.",
    "The calculator uses a plain rate. Some disposals are exempt and others follow special rules, and the 2026-2027 Budget extends one exemption for share disposals under the Access to Business Funding Act. Read the FRCS Capital Gains Tax guide for your case.",
  ],
  ejemplo: [
    "You sell a block of land for FJ$300,000. It cost you FJ$200,000 and you spent FJ$5,000 on legal and agent fees. Your gain is FJ$95,000. Tax at 10% is FJ$9,500, and you keep FJ$285,500 after fees and tax.",
  ],
  faq: [
    {
      pregunta: "What is the capital gains tax rate in Fiji?",
      respuesta: "The FRCS tax rates page shows {{fj.cgt-rate}} for 2026, and the same rate in each year back to 2018.",
    },
    {
      pregunta: "Do I tell FRCS before I sell?",
      respuesta: "FRCS issues CGT certificates for disposals. The 2026-2027 revenue policy summary says taxpayers must notify the tax office if a planned disposal with a certificate is not carried out.",
    },
    {
      pregunta: "Is a loss taxed?",
      respuesta: "No tax is due when the sale price is below cost and costs. This calculator shows the loss and charges no tax. It does not work out whether a loss can offset another gain.",
    },
  ],
  glosario: [
    { termino: "Capital gain", definicion: "The profit from selling an asset for more than it cost." },
    { termino: "CGT certificate", definicion: "A document FRCS issues in connection with a capital disposal." },
    { termino: "Disposal", definicion: "A sale or other transfer of an asset." },
  ],
});
