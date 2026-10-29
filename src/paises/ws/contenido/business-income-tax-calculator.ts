import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.business-income-tax-calculator",
  h1: "Business income tax calculator Samoa {{anio}}",
  title: "Business tax calculator Samoa {{anio}}: company, sole trader",
  description: "Company income tax in Samoa is {{ws.company-tax-rate}}. Sole traders and partners pay {{ws.income-tax-bands[1].tasa}} and {{ws.income-tax-bands[2].tasa}} above a tax-free {{ws.income-tax-bands[0].hasta}}.",
  intro: [
    "Samoa taxes business income by structure. A company pays a flat {{ws.company-tax-rate}} of taxable income. A sole trader pays on a progressive scale, and a partnership pays nothing itself because each partner is taxed on their own share.",
    "Choose a structure and enter taxable income for the year to see the tax, the income left and the provisional tax payment to plan for next year.",
  ],
  comoSeCalcula: [
    "Company: taxable income times {{ws.company-tax-rate}}.",
    "Sole trader or partner: the first {{ws.income-tax-bands[0].hasta}} is taxed at nil, the slice up to {{ws.income-tax-bands[2].desde}} at {{ws.income-tax-bands[1].tasa}} and everything above at {{ws.income-tax-bands[2].tasa}}.",
    "The last line divides the tax by {{ws.provisional-tax-instalments}}, the number of provisional tax instalments, to show a typical payment next year if your tax stays the same.",
  ],
  ejemplo: [
    "A company with WS$60,000 of taxable income pays WS$16,200. A sole trader with the same income pays 20% on WS$10,000, which is WS$2,000, and 27% on the remaining WS$35,000, which is WS$9,450. The tax is WS$11,450.",
  ],
  faq: [
    {
      pregunta: "When is the income tax return due?",
      respuesta: "The Ministry for Revenue sets the tax year at 1 January to 31 December, with the return due by 31 March of the next year. A substitute balance date needs the Commissioner's approval.",
    },
    {
      pregunta: "Does a sole trader pay tax on a small profit?",
      respuesta: "Information Sheet IS01 says a sole trader is liable only if the year's net profit is above WS$15,000, the top of the nil band.",
    },
    {
      pregunta: "Can I pay myself a salary and deduct it?",
      respuesta: "Not as a sole trader. IS01 says you cannot claim salary and wage income as an expense when it is paid to yourself.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Business income after the costs the law allows." },
    { termino: "Sole trader", definicion: "One person running a business in their own name." },
    { termino: "Partnership", definicion: "A business owned by two or more people, taxed through its partners." },
  ],
});
