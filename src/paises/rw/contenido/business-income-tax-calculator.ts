import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.business-income-tax-calculator",
  h1: "Business income tax calculator Rwanda",
  title: "Corporate and business income tax calculator Rwanda",
  description: "Income tax on business profit: {{rw.cit-rate}} for companies, and the annual bands up to {{rw.pit-bands[3].tasa}} for sole traders on the real regime.",
  intro: [
    "Businesses on the real regime pay income tax on their actual profit. Choose whether you are a company or an individual and enter the taxable profit for the year.",
  ],
  comoSeCalcula: [
    "Companies: {{rw.cit-rate}} of taxable business profit.",
    "Individuals: 0% up to {{rw.pit-bands[1].desde}}, {{rw.pit-bands[1].tasa}} up to {{rw.pit-bands[2].desde}}, {{rw.pit-bands[2].tasa}} up to {{rw.pit-bands[3].desde}} and {{rw.pit-bands[3].tasa}} above.",
  ],
  ejemplo: ["A company with RWF 50,000,000 of taxable profit pays RWF 14,000,000. A sole trader with RWF 5,000,000 pays RWF 1,068,000."],
  faq: [
    {
      pregunta: "When is income tax declared?",
      respuesta: "By 31 March of the following year. After the first year you also pay quarterly prepayments by 30 June, 30 September and 31 December.",
    },
    {
      pregunta: "How are quarterly prepayments worked out?",
      respuesta: "Last year's tax divided by last year's turnover, times this quarter's turnover, less the tax withheld in the quarter.",
    },
    {
      pregunta: "Is there a lower rate for listed companies?",
      respuesta: "Yes. For five years after listing on the Rwandan capital market, a company pays 20% if it sells at least 40% of its shares to the public, or 25% if it sells at least 30%.",
    },
  ],
  glosario: [
    { termino: "Taxable business profit", definicion: "Income less the expenses the law allows, from the accounts." },
    { termino: "Real regime", definicion: "The regime for businesses with turnover above RWF 20 million, or those that choose it." },
  ],
});
