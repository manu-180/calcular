import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.paye-calculator",
  h1: "PAYE calculator Botswana",
  title: "PAYE calculator Botswana: tax on weekly or monthly pay",
  description: "Work out the PAYE on a weekly, fortnightly, monthly or yearly pay with the BURS rates for residents and non-residents in force from 1 July 2026.",
  intro: [
    "Enter your taxable pay and how often you are paid. The calculator gives the PAYE your employer should withhold, your yearly tax and your tax rates.",
    "Taxable pay is your salary plus taxable allowances and benefits, less any contribution you make to an approved pension fund.",
  ],
  comoSeCalcula: [
    "The pay is turned into a yearly amount: × 52 for weekly pay, × 26 for fortnightly pay and × 12 for monthly pay.",
    "Residents pay nothing up to {{bw.paye-resident[1].desde}}. Then {{bw.paye-resident[1].tasa}} up to {{bw.paye-resident[2].desde}}, {{bw.paye-resident[2].tasa}} up to {{bw.paye-resident[3].desde}}, {{bw.paye-resident[3].tasa}} up to {{bw.paye-resident[4].desde}}, {{bw.paye-resident[4].tasa}} up to {{bw.paye-resident[5].desde}} and {{bw.paye-resident[5].tasa}} above that.",
    "Non-residents have no tax-free band: they pay {{bw.paye-non-resident[0].tasa}} on the first {{bw.paye-non-resident[1].desde}} and then the same rates as residents.",
    "The yearly tax is divided back by the number of pay periods.",
  ],
  ejemplo: [
    "BURS uses this example: a resident paid P4 000 a fortnight earns P104 000 a year. The tax is P1 800 plus 12.5% of P20 000, that is P4 300 a year, or P165.38 each fortnight.",
  ],
  faq: [
    {
      pregunta: "How much can I earn before I pay tax in Botswana?",
      respuesta: "A resident pays no income tax on the first {{bw.paye-resident[1].desde}} of taxable income a year. Non-residents pay from the first pula.",
    },
    {
      pregunta: "What is the highest tax rate?",
      respuesta: "From 1 July 2026 it is {{bw.paye-resident[-1].tasa}} on taxable income above {{bw.paye-resident[-1].desde}} a year, for residents and non-residents alike.",
    },
    {
      pregunta: "Who counts as a resident for tax?",
      respuesta: "Under the Income Tax Act, 2026 you are a resident if your permanent home is in Botswana or if you are in the country for 183 days or more in any 12 months that start or end in the tax year. Any part of a day counts as a full day.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your employment income, including cash allowances and the value of benefits, less approved pension contributions." },
    { termino: "Tax year", definicion: "1 July to 30 June." },
  ],
});
