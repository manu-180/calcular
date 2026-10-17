import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.company-income-tax-calculator",
  h1: "Company income tax calculator Nigeria",
  title: "Company income tax Nigeria 2026: small company check",
  description:
    "Check if your business is a small company (0% tax) and work out companies income tax at {{ng.cit-rate}} plus the {{ng.development-levy}} development levy.",
  intro: [
    "Under the Nigeria Tax Act, 2025, small companies pay no companies income tax. Other companies pay {{ng.cit-rate}} of total profits and a development levy of {{ng.development-levy}}.",
  ],
  comoSeCalcula: [
    "A small company has gross turnover of {{ng.small-company-turnover}} or less a year and total fixed assets of no more than {{ng.small-company-assets}}. Both conditions must be met.",
    "A small company pays tax at 0% and is outside the development levy.",
    "Any other company pays {{ng.cit-rate}} of total profits, plus a development levy of {{ng.development-levy}} of assessable profits.",
  ],
  ejemplo: ["A company with ₦250 million turnover and ₦40 million profit pays ₦12 million of companies income tax and ₦1.6 million of development levy."],
  faq: [
    {
      pregunta: "Will the 30% rate go down?",
      respuesta: "The Act allows the rate to fall to 25% from a date the President sets by order, on the advice of the National Economic Council.",
    },
    {
      pregunta: "Where does the development levy go?",
      respuesta: "It is shared among several funds. Half goes to the Tertiary Education Trust Fund.",
    },
    {
      pregunta: "Does a small company still file returns?",
      respuesta: "Paying 0% does not remove filing duties. Check the filing rules with the Nigeria Revenue Service.",
    },
  ],
  glosario: [
    { termino: "Small company", definicion: "A business with turnover of {{ng.small-company-turnover}} or less and fixed assets of {{ng.small-company-assets}} or less." },
    { termino: "Development levy", definicion: "A levy of {{ng.development-levy}} on assessable profits of companies that are not small." },
  ],
});
