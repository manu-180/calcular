import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.paye-calculator",
  h1: "PAYE calculator Uganda 2026/27",
  title: "PAYE calculator Uganda 2026/27: URA monthly rates",
  description: "Work out the PAYE deducted from your salary in Uganda. No PAYE up to {{ug.paye-bands[0].hasta}} a month, then {{ug.paye-bands[1].tasa}} to {{ug.paye-bands[3].tasa}}.",
  intro: [
    "PAYE (Pay As You Earn) is the income tax your employer deducts from your salary every month and pays to URA.",
    "Enter your gross pay for the month to see the PAYE, what it costs you in a year and the rate on your last shilling.",
  ],
  comoSeCalcula: [
    "PAYE is charged on your total monthly income: salary, allowances and other payments.",
    "For residents, the first {{ug.paye-bands[0].hasta}} is tax free.",
    "The next slice, up to {{ug.paye-bands[1].hasta}}, pays {{ug.paye-bands[1].tasa}}. Up to {{ug.paye-bands[2].hasta}} it is {{ug.paye-bands[2].tasa}}, and above that {{ug.paye-bands[3].tasa}}.",
    "Above {{ug.paye-bands[-1].desde}} a month there is an extra 10%, so that slice pays {{ug.paye-bands[-1].tasa}}.",
    "Non-residents pay {{ug.paye-bands-non-resident[0].tasa}} from the first shilling, then {{ug.paye-bands-non-resident[1].tasa}} and {{ug.paye-bands-non-resident[2].tasa}}.",
  ],
  ejemplo: [
    "A resident earning Ushs 1,500,000 a month pays Ushs 338,250 in PAYE: nothing on the first {{ug.paye-bands[0].hasta}}, Ushs 15,000 on the next slice, Ushs 18,750 on the one after and Ushs 304,500 on the rest.",
  ],
  faq: [
    {
      pregunta: "When did the PAYE threshold rise to Ushs 335,000?",
      respuesta: "The new rates apply from {{ug.paye-bands#desde}}, the start of the 2026/27 year of income. Before that the tax-free amount was Ushs 235,000 a month.",
    },
    {
      pregunta: "Who counts as a resident?",
      respuesta: "URA treats you as resident if you have a permanent home in Uganda, are in the country 183 days or more in a year of income, or more than 122 days a year on average over that year and the two before it.",
    },
    {
      pregunta: "What if I have two employers?",
      respuesta: "URA says employees with more than one employer are taxed at a flat 30% on their employment income. You can file a return of all your income to claim back any tax overpaid.",
    },
    {
      pregunta: "Is NSSF deducted before PAYE?",
      respuesta: "No. PAYE is worked out on your total monthly income, and the NSSF contribution is a separate deduction. Our net salary calculator shows both.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: income tax deducted from salary by the employer." },
    { termino: "URA", definicion: "Uganda Revenue Authority, the body that collects tax." },
    { termino: "Year of income", definicion: "The tax year, from 1 July to 30 June." },
  ],
});
