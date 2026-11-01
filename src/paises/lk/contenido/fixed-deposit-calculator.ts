import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.fixed-deposit-calculator",
  h1: "Fixed deposit calculator Sri Lanka",
  title: "Fixed deposit calculator Sri Lanka: interest after tax",
  description:
    "Find out how much interest your fixed deposit earns after the {{lk.wht-interest}} advance income tax the bank withholds, and what you get back at maturity.",
  intro: [
    "Enter the amount, the annual rate your bank offers and the term. The calculator shows the interest, the tax the bank withholds and what you receive.",
    "It assumes the interest is paid at maturity, without compounding.",
  ],
  comoSeCalcula: [
    "Interest: the deposit times the annual rate, times the number of months divided by 12.",
    "Tax: the bank withholds {{lk.wht-interest}} of the interest as advance income tax.",
    "You get back the deposit plus the interest after tax.",
  ],
  ejemplo: ["Rs. 1,000,000 for 12 months at 8% earns Rs. 80,000. The bank withholds Rs. 8,000, so you receive Rs. 72,000 of interest."],
  faq: [
    {
      pregunta: "Is the tax the bank withholds a separate tax?",
      respuesta: "No. It is advance income tax, a payment towards your income tax for the year of assessment.",
    },
    {
      pregunta: "Why does the bank pay less than the rate it advertised?",
      respuesta: "The advertised rate is before tax. After {{lk.wht-interest}} is withheld, an 8% rate gives you 7.2%.",
    },
    {
      pregunta: "Is it the same for senior citizens?",
      respuesta: "Not necessarily. For interest paid to a senior citizen, the Inland Revenue Act says tax is withheld at the rate and in the manner set by regulations. Ask your bank which rate it applies.",
    },
  ],
  glosario: [
    { termino: "Fixed deposit", definicion: "Money left with a bank for a fixed term at an agreed rate." },
    { termino: "Maturity", definicion: "The end of the term, when the bank pays back the deposit." },
  ],
});
