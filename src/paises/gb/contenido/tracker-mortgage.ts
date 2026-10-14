import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.tracker-mortgage",
  h1: "Tracker mortgage calculator",
  title: "Tracker mortgage calculator: repayments at today's Bank Rate",
  description:
    "Work out your tracker mortgage repayments with today's Bank of England Bank Rate plus your margin, and what a 0.25 point change would cost you.",
  intro: [
    "A tracker mortgage follows the Bank of England's Bank Rate at a set margin, for example Bank Rate plus 1 point. When Bank Rate moves, your repayments move with it.",
    "Enter the loan, the term and your margin to see your monthly repayment today, using the latest Bank Rate published by the Bank of England.",
  ],
  comoSeCalcula: [
    "Your interest rate is Bank Rate plus your margin.",
    "The monthly repayment is worked out as a standard repayment mortgage, where each payment covers interest and part of the loan.",
    "We also show how much your payment would go up or down if Bank Rate changed by 0.25 points, the usual size of a move.",
  ],
  ejemplo: [
    "With Bank Rate at 3.75% (its level in October 2026) and a margin of 1 point, a £200,000 mortgage over 25 years costs £1,140.23 a month. A 0.25 point rise would add about £28.95.",
  ],
  faq: [
    {
      pregunta: "How often does Bank Rate change?",
      respuesta: "The Bank of England's Monetary Policy Committee meets eight times a year and can raise, cut or hold Bank Rate at each meeting.",
    },
    {
      pregunta: "Is a tracker better than a fixed rate?",
      respuesta:
        "A tracker gets cheaper straight away when Bank Rate falls, but costs more when it rises. A fixed rate gives you the same payment for the fixed period. Many trackers have no early repayment charges, which is worth checking.",
    },
    {
      pregunta: "Does this include fees or Stamp Duty?",
      respuesta: "No. Add any arrangement fee to the loan if you are adding it to the mortgage. Use the Stamp Duty calculator for the tax on the purchase.",
    },
  ],
  glosario: [
    { termino: "Bank Rate", definicion: "The interest rate the Bank of England pays on reserves. It drives most variable rates in the UK." },
    { termino: "Margin", definicion: "The fixed amount a tracker sits above or below Bank Rate." },
  ],
});
