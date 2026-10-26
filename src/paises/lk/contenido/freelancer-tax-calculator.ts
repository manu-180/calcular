import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.freelancer-tax-calculator",
  h1: "Freelancer tax calculator Sri Lanka",
  title: "Freelancer tax Sri Lanka: foreign income at {{lk.foreign-income-max-rate}} at most",
  description:
    "Estimate income tax on services you sell to clients abroad and get paid for in foreign currency. Rates are capped at {{lk.foreign-income-max-rate}} from 1 April 2025.",
  intro: [
    "If you work for clients outside Sri Lanka and bring the money in through a bank, the Inland Revenue Act taxes those profits at a maximum rate of {{lk.foreign-income-max-rate}}.",
    "Enter your profits from that work for the year of assessment.",
  ],
  comoSeCalcula: [
    "The personal relief of {{lk.personal-relief}} comes off first.",
    "The rest goes through the normal bands, starting at {{lk.income-tax-bands[0].tasa}}, but no band can go above {{lk.foreign-income-max-rate}}.",
    "The calculator also shows how much less you pay than at the normal rates, which reach {{lk.income-tax-bands[-1].tasa}}.",
  ],
  ejemplo: [
    "Profits of Rs. 6,000,000 leave Rs. 4,200,000 taxable. The first Rs. 1,000,000 pays 6% and the rest 15%, so Rs. 540,000 for the year.",
  ],
  faq: [
    {
      pregunta: "Which income gets the lower rate?",
      respuesta: "Profits from services given in or outside Sri Lanka to be used outside Sri Lanka, paid in foreign currency and remitted through a bank. Foreign source income earned in foreign currency and remitted through a bank also qualifies.",
    },
    {
      pregunta: "What if the money stays in an account abroad?",
      respuesta: "The rule requires the payment to be remitted to Sri Lanka through a bank. Income that is not brought in that way does not get the {{lk.foreign-income-max-rate}} cap.",
    },
    {
      pregunta: "I also have a salary in Sri Lanka. Can I use this?",
      respuesta: "This calculator covers foreign income alone. With a local salary the relief and the bands are shared between both, so the result changes.",
    },
  ],
  glosario: [
    { termino: "Remitted through a bank", definicion: "Brought into Sri Lanka through a bank transfer, not in cash." },
    { termino: "Maximum rate", definicion: "The highest rate any slice of this income can pay." },
  ],
});
