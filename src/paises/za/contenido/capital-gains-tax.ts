import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.capital-gains-tax",
  h1: "Capital gains tax calculator 2026/27",
  title: "Capital gains tax calculator South Africa 2026/27",
  description: "Work out CGT on shares, property or other assets: annual exclusion of {{za.cgt-annual-exclusion}}, {{za.cgt-inclusion-rate}} inclusion rate and your income tax bracket.",
  intro: [
    "Enter your capital gain and your other taxable income. You get the extra tax the gain adds to your bill for the year.",
    "In South Africa a capital gain is not taxed on its own: part of it is added to your taxable income and taxed at your normal rates.",
  ],
  comoSeCalcula: [
    "If the gain is on your primary residence, the first {{za.cgt-primary-residence-exclusion}} of the gain is excluded.",
    "Your capital gains for the year, less the annual exclusion of {{za.cgt-annual-exclusion}}, give the net capital gain.",
    "{{za.cgt-inclusion-rate}} of the net capital gain is added to your taxable income.",
    "The CGT is the difference between the tax on your income with and without that amount.",
  ],
  ejemplo: [
    "A gain of R300 000 on shares, with R500 000 of other income, adds R100 000 to your taxable income and R34 490 to your tax.",
  ],
  faq: [
    {
      pregunta: "What is the highest effective CGT rate?",
      respuesta: "For individuals it is 18%: {{za.cgt-inclusion-rate}} of the gain taxed at the top income tax rate of 45%.",
    },
    {
      pregunta: "Is the annual exclusion different in the year of death?",
      respuesta: "Yes. In the year a person dies, the annual exclusion is {{za.cgt-death-exclusion}} instead of {{za.cgt-annual-exclusion}}.",
    },
    {
      pregunta: "Do I pay CGT on a tax-free savings account?",
      respuesta: "No. Growth in a tax-free investment is exempt from income tax, including tax on capital gains.",
    },
  ],
  glosario: [
    { termino: "Inclusion rate", definicion: "The part of your net capital gain that is added to taxable income: {{za.cgt-inclusion-rate}} for individuals." },
    { termino: "Annual exclusion", definicion: "The part of your capital gains for the year that is not taxed." },
  ],
});
