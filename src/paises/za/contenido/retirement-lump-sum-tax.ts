import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.retirement-lump-sum-tax",
  h1: "Retirement lump sum tax calculator",
  title: "Retirement lump sum tax calculator 2026/27",
  description: "Work out the tax on a lump sum from a pension, provident or retirement annuity fund, at retirement or on withdrawal, with the SARS tables for 2026/27.",
  intro: [
    "Choose whether you are retiring or withdrawing, and enter the taxable lump sum. You get the tax SARS charges and what you keep.",
    "Lump sums are not taxed with your salary. They have their own tables, and the one for retirement is much kinder than the one for withdrawals.",
  ],
  comoSeCalcula: [
    "At retirement, death, retrenchment or for a severance benefit, the first R550 000 is tax-free. Above that, 18%, 27% and 36% apply.",
    "On a withdrawal, only the first R27 500 is tax-free, and the rates of 18%, 27% and 36% start much sooner.",
    "Earlier lump sums count: the table is applied to all of them together and the tax on the earlier ones is taken off.",
  ],
  ejemplo: [
    "A retirement lump sum of R800 000 pays R47 700 in tax. The same R800 000 taken as a withdrawal pays R145 710.",
  ],
  faq: [
    {
      pregunta: "Which earlier lump sums count?",
      respuesta:
        "Retirement fund lump sums from October 2007, withdrawal benefits from March 2009 and severance benefits from March 2011. SARS adds them up when it works out the tax on a new one.",
    },
    {
      pregunta: "Is a severance package taxed like a retirement lump sum?",
      respuesta: "Yes. Severance benefits from your employer use the same table as retirement lump sums and share the same tax-free amount.",
    },
    {
      pregunta: "Why is a withdrawal taxed so much more?",
      respuesta: "The withdrawal table has a much smaller tax-free amount, so more of the money is taxed and it reaches the higher rates sooner.",
    },
  ],
  glosario: [
    { termino: "Lump sum", definicion: "A once-off cash payment from a retirement fund, instead of or on top of a monthly pension." },
    { termino: "Withdrawal benefit", definicion: "Money you take out of a retirement fund before you retire." },
  ],
});
