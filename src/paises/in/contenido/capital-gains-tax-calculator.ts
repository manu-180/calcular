import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.capital-gains-tax-calculator",
  h1: "Capital gains tax calculator for shares and mutual funds",
  title: "Capital gains tax on shares and equity mutual funds",
  description:
    "Tax on gains from listed shares and equity funds: {{in.stcg-equity-rate}} on short-term gains and {{in.ltcg-equity-rate}} on long-term gains above {{in.ltcg-equity-exemption}}.",
  intro: [
    "Enter your short-term and long-term gains from listed shares and equity mutual funds for the tax year, and see the tax with cess.",
    "These rates apply when securities transaction tax (STT) was paid. Debt funds, property and gold follow other rules.",
  ],
  comoSeCalcula: [
    "Listed shares and equity fund units are short-term if you held them for 12 months or less, and long-term if you held them longer.",
    "Short-term gains are taxed at {{in.stcg-equity-rate}} under section 196.",
    "Long-term gains up to {{in.ltcg-equity-exemption}} in a year are not taxed. The rest is taxed at {{in.ltcg-equity-rate}} under section 198.",
    "{{in.cess}} Health and Education Cess is added on top.",
  ],
  ejemplo: [
    "With ₹1 lakh of short-term gains and ₹3 lakh of long-term gains, you pay ₹20,000 plus ₹21,875 of tax and ₹1,675 of cess: ₹43,550 in all.",
  ],
  faq: [
    {
      pregunta: "Does the new or old regime change these rates?",
      respuesta: "No. These special rates apply in both regimes. Only the tax on your other income depends on the regime.",
    },
    {
      pregunta: "My total income is low. Do I still pay this tax?",
      respuesta:
        "If you are resident and your other income is below the basic exemption limit, the shortfall is taken off your gains first. This calculator does not apply that, so your real tax can be lower.",
    },
    {
      pregunta: "Is the rebate available on these gains?",
      respuesta: "The section 156 rebate is not allowed against tax on long-term gains under section 198.",
    },
  ],
  glosario: [
    { termino: "STCG", definicion: "Short-term capital gain." },
    { termino: "LTCG", definicion: "Long-term capital gain." },
    { termino: "STT", definicion: "Securities transaction tax, charged when you buy or sell listed shares and equity fund units." },
  ],
});
