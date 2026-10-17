import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.advance-tax-calculator",
  h1: "Advance tax calculator 2026-27",
  title: "Advance tax calculator 2026-27: due dates and instalments",
  description:
    "See how much advance tax to pay by 15 June, 15 September, 15 December and 15 March when your tax after TDS is {{in.advance-tax-threshold}} or more.",
  intro: [
    "If TDS does not cover your tax, you pay the rest during the year in instalments. Enter your estimated tax and TDS to get each payment.",
    "Freelancers, people with rent, capital gains or large interest income and salaried people with side income usually need this.",
  ],
  comoSeCalcula: [
    "Advance tax is your estimated tax for the year minus the TDS and TCS you expect.",
    "You pay it only if that amount is {{in.advance-tax-threshold}} or more (section 404).",
    "Section 408 sets the instalments: at least {{in.advance-tax-instalments[jun15]}} by 15 June, {{in.advance-tax-instalments[sep15]}} by 15 September, {{in.advance-tax-instalments[dec15]}} by 15 December and the whole amount by 15 March, each counting what you already paid.",
    "If you declare business profits on a presumptive basis, you can pay it all by 15 March.",
  ],
  ejemplo: [
    "With ₹2 lakh of tax and ₹50,000 of TDS, advance tax is ₹1.5 lakh: ₹22,500 by 15 June, ₹45,000 by 15 September, ₹45,000 by 15 December and ₹37,500 by 15 March.",
  ],
  faq: [
    {
      pregunta: "Do senior citizens pay advance tax?",
      respuesta: "Not if they are resident, aged 60 or more and have no business or professional income (section 403).",
    },
    {
      pregunta: "What if I miss an instalment?",
      respuesta: "The Act charges interest for a shortfall or delay. Pay as soon as you can to keep it low.",
    },
    {
      pregunta: "Does a payment on 31 March count?",
      respuesta: "Yes. Tax paid by 31 March is treated as advance tax for that financial year.",
    },
  ],
  glosario: [
    { termino: "Advance tax", definicion: "Income tax paid during the year instead of in one go after it ends." },
    { termino: "TDS", definicion: "Tax deducted at source by whoever pays you." },
    { termino: "Presumptive taxation", definicion: "A scheme where small businesses declare profit as a set share of turnover." },
  ],
});
