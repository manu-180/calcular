import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.winnings-tax-calculator",
  h1: "Betting winnings tax calculator Malawi",
  title: "Betting and lottery winnings tax Malawi: 15% on every win",
  description:
    "See how much of a betting, gambling or lottery win you keep after the {{mw.winnings-tax}} withholding tax, which applies to every win since 30 December 2025.",
  intro: [
    "Enter the amount you won to see the tax the bookmaker or lottery takes off and what you actually receive.",
    "Since the Taxation (Amendment) Act 2025 there is no tax-free amount on winnings.",
  ],
  comoSeCalcula: [
    "The payer withholds {{mw.winnings-tax}} of the win before paying you.",
    "What you receive is the win less that tax.",
  ],
  ejemplo: ["On a win of K500,000 the tax is K75,000 and you receive K425,000."],
  faq: [
    {
      pregunta: "Is there still a tax-free amount on small wins?",
      respuesta: "No. The thresholds of K100,000 for betting and K500,000 for lotteries were removed, so every win is taxed.",
    },
    {
      pregunta: "Who sends the tax to the MRA?",
      respuesta: "The betting company, casino or lottery that pays you. It deducts the tax and remits it.",
    },
    {
      pregunta: "Is the tax worked out on my stake or on my win?",
      respuesta: "On the winnings paid to you. Enter the amount of the win before tax.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "Tax the payer takes off a payment and sends to the MRA for you." },
    { termino: "Winnings", definicion: "Money you win from betting, gambling or a lottery." },
  ],
});
