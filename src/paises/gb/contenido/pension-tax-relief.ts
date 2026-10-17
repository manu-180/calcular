import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.pension-tax-relief",
  h1: "Pension tax relief calculator",
  title: "Pension tax relief calculator 2026/27: higher rate relief",
  description:
    "See how much tax relief you get on pension contributions in 2026/27, what your provider adds and the extra relief higher and Scottish rate taxpayers can claim.",
  intro: [
    "When you pay into a personal pension, or a workplace pension that uses relief at source, the government tops up your contribution with tax relief. Higher rate taxpayers can claim even more back.",
    "Enter your income, where you live and what you pay in from your take-home pay to see the full value of the relief.",
  ],
  comoSeCalcula: [
    "Your provider claims basic rate relief of 20% and adds it to your pension. If you pay £80, £100 goes in.",
    "If part of your income is taxed above the basic rate, you can claim the difference on the same amount through Self Assessment: 20% more at 40% and 25% more at 45%.",
    "In Scotland the extra relief is 1% at 21%, 22% at 42%, 25% at 45% and 28% at 48%. Starter rate taxpayers still get the full 20%.",
    "Because pension contributions reduce your adjusted net income, they can also bring back Personal Allowance lost above {{gb.personal-allowance-taper}}.",
  ],
  ejemplo: [
    "HMRC's example: someone earning £60,270 puts £12,000 into a relief at source scheme. The scheme claims the first 20%, and they can claim another 20% on the £10,000 taxed at 40%, which is £2,000.",
  ],
  faq: [
    {
      pregunta: "Is there a limit to the tax relief I can get?",
      respuesta:
        "You get relief on contributions up to 100% of your earnings in the tax year. If you have no earnings, you can still pay in up to £2,880 and get relief on it. There is also an annual allowance on total contributions.",
    },
    {
      pregunta: "My workplace pension comes out before tax. Does this apply?",
      respuesta: "No. With a net pay arrangement you get full relief automatically through payroll, so there is nothing extra to claim.",
    },
    {
      pregunta: "How do I claim the extra relief?",
      respuesta: "Through your Self Assessment tax return, or by contacting HMRC if you do not fill one in. HMRC usually adjusts your tax code or sends a refund.",
    },
  ],
  glosario: [
    { termino: "Relief at source", definicion: "You pay from your taxed pay and your provider claims basic rate relief from HMRC and adds it to your pension." },
    { termino: "Net pay arrangement", definicion: "Your employer takes the contribution before Income Tax is worked out." },
  ],
});
