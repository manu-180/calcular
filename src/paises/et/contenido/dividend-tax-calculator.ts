import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.dividend-tax-calculator",
  h1: "Dividend, interest and royalty tax calculator Ethiopia",
  title: "Tax on dividends, interest and winnings in Ethiopia",
  description:
    "Work out the tax on a dividend ({{et.dividend-tax}}), interest ({{et.interest-tax}}), royalties or winnings ({{et.winnings-tax}}) received by a resident of Ethiopia.",
  intro: [
    "Dividends, interest, royalties and winnings from games of chance are each taxed at a flat rate on the gross amount. Choose the type of income and enter the amount to see the tax and what is left.",
    "The rates are those of Proclamation 1395/2025 for income derived from 8 July 2025.",
  ],
  comoSeCalcula: [
    "Dividend: {{et.dividend-tax}} of the gross dividend.",
    "Interest: {{et.interest-tax}} of the gross interest.",
    "Royalty: {{et.royalty-tax}}, or {{et.royalty-art-tax}} for royalties from art and culture.",
    "Winnings from games of chance held in Ethiopia: {{et.winnings-tax}} of the gross winnings.",
  ],
  ejemplo: [
    "A dividend of ETB 10,000 pays ETB 1,500 of tax and leaves ETB 8,500.",
  ],
  faq: [
    {
      pregunta: "Are expenses deducted first?",
      respuesta: "No. These taxes apply to the gross amount of the dividend, interest, royalty or winnings.",
    },
    {
      pregunta: "Is interest earned by a bank taxed this way?",
      respuesta: "No. Interest a financial institution earns on deposits with another financial institution is business income under Schedule C.",
    },
    {
      pregunta: "What about non-residents?",
      respuesta: "A non-resident with a permanent establishment in Ethiopia pays {{et.dividend-tax}} on dividends and {{et.interest-tax}} on interest attributable to it.",
    },
  ],
  glosario: [
    { termino: "Dividend", definicion: "A share of profit paid by a company to its shareholders." },
    { termino: "Royalty", definicion: "A payment for the use of a right, such as a copyright or a patent." },
  ],
});
