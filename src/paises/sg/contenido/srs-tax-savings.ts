import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.srs-tax-savings",
  h1: "SRS tax savings calculator",
  title: "SRS tax savings calculator: how much tax you save",
  description: "See how much income tax you save by putting money into your Supplementary Retirement Scheme account, up to {{sg.srs-tope[ciudadano-pr]}} for citizens and PRs.",
  intro: [
    "Money you put into your Supplementary Retirement Scheme (SRS) account is taken off your chargeable income, so it lowers your income tax for the year.",
    "Enter your chargeable income and how much you plan to put in to see the tax saving at your rates.",
  ],
  comoSeCalcula: [
    "Your SRS contribution is taken off your chargeable income, up to the yearly limit: {{sg.srs-tope[ciudadano-pr]}} for Singapore Citizens and PRs and {{sg.srs-tope[extranjero]}} for foreigners.",
    "Tax is worked out with the resident rates before and after the relief. The difference is your saving.",
    "The saving depends on your top tax rate, so it is larger the higher your income.",
  ],
  ejemplo: [
    "With $120,000 of chargeable income, putting in $15,300 cuts your tax from $7,950 to $6,190.50, a saving of $1,759.50.",
  ],
  faq: [
    {
      pregunta: "By when do I have to contribute?",
      respuesta: "Contributions must be made by 31 December to get relief in the next Year of Assessment. For example, money put in by 31 December 2025 counts for the Year of Assessment 2026.",
    },
    {
      pregunta: "Is the SRS money taxed later?",
      respuesta: "Yes, but only 50% of what you withdraw from SRS at retirement is taxable.",
    },
    {
      pregunta: "Does SRS relief count towards the relief cap?",
      respuesta: "Yes. SRS relief is part of the overall yearly cap on personal income tax reliefs.",
    },
    {
      pregunta: "Can I get my SRS contribution back if I change my mind?",
      respuesta: "No. IRAS does not refund SRS contributions, so check whether you need the relief before you put money in.",
    },
  ],
  glosario: [
    { termino: "SRS", definicion: "Supplementary Retirement Scheme, a voluntary account for retirement savings that gives you tax relief." },
    { termino: "Chargeable income", definicion: "Your income after deductions and reliefs, which the tax rates apply to." },
  ],
});
