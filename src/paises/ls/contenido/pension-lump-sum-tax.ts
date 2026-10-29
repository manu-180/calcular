import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.pension-lump-sum-tax",
  h1: "Tax on a pension lump sum in Lesotho",
  title: "Pension lump sum tax calculator for Lesotho",
  description:
    "Work out the tax on a lump sum from a pension or provident fund in Lesotho: {{ls.standard-rate}} flat, or added to your income if that costs less.",
  intro: [
    "When you take a lump sum from an approved pension or provident fund, the Income Tax Act gives you a choice. Pay tax at the standard rate, or add the lump sum to your income for the year.",
    "Enter the lump sum, any part you roll over, and your other income. The calculator works out both options and shows the cheaper one.",
  ],
  comoSeCalcula: [
    "Any part rolled over into another approved fund, or used to buy an annuity from a resident provider within 90 days, is exempt.",
    "The rest is taxed at the standard rate of {{ls.standard-rate}}, unless you elect to include it in your gross income.",
    "If you include it, it is taxed with your other income at {{ls.income-tax-bands[0].tasa}} and {{ls.income-tax-bands[1].tasa}}, after the {{ls.tax-credit}} credit. The extra tax is the difference with and without the lump sum.",
  ],
  ejemplo: [
    "A M300 000 lump sum for someone with M60 000 of other income costs M75 000 at the standard rate, against M87 984 if included in income. The standard rate is cheaper.",
  ],
  faq: [
    {
      pregunta: "Which funds does this apply to?",
      respuesta: "Complying superannuation funds, the resident pension and provident funds that meet the conditions in the regulations. A lump sum from a non-complying fund is always included in gross income.",
    },
    {
      pregunta: "Does the same rule apply when a member dies?",
      respuesta: "Yes. A lump sum paid to a dependant of a member who has died is treated the same way. A dependant here means the spouse or a child under 18.",
    },
    {
      pregunta: "How long do I have to roll over the lump sum?",
      respuesta: "90 days from the date of the payment, into another complying fund or to buy an annuity from a resident person.",
    },
  ],
  glosario: [
    { termino: "Superannuation fund", definicion: "A pension, provident, benefit or retirement fund." },
    { termino: "Standard rate of tax", definicion: "A flat rate set in section 2 of the Income Tax Act." },
  ],
});
