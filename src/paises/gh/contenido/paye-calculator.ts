import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.paye-calculator",
  h1: "PAYE calculator Ghana",
  title: "PAYE calculator Ghana {{anio}}: income tax bands",
  description: "Work out your income tax in Ghana with the GRA bands in force since 1 September {{anio}}, monthly or yearly, for residents and non-residents.",
  intro: [
    "Enter your chargeable income for a month or a year and see the income tax due under the graduated rates for resident individuals.",
    "The bands come from the Income Tax (Amendment) Act, 2026 (Act 1178), applied by the Ghana Revenue Authority from 1 September 2026.",
  ],
  comoSeCalcula: [
    "A monthly amount is turned into a yearly one, the same way the GRA monthly bands are the yearly bands divided by 12.",
    "The first {{gh.paye-annual-bands[0].hasta}} a year is taxed at {{gh.paye-annual-bands[0].tasa}}. Each next slice pays its own rate, up to {{gh.paye-annual-bands[-1].tasa}} above {{gh.paye-annual-bands[-1].desde}}.",
    "Non-resident individuals pay a flat {{gh.non-resident-rate}} of chargeable income.",
  ],
  ejemplo: ["On GH₵5,000 a month of chargeable income, the tax is GH₵854.50 a month."],
  faq: [
    {
      pregunta: "What are the PAYE rates in Ghana?",
      respuesta:
        "From 1 September 2026 the yearly bands for residents start at {{gh.paye-annual-bands[0].tasa}} on the first {{gh.paye-annual-bands[0].hasta}} and rise through 5%, 10%, 17.5%, 25% and 30% to {{gh.paye-annual-bands[-1].tasa}} on income above {{gh.paye-annual-bands[-1].desde}}.",
    },
    {
      pregunta: "What is chargeable income?",
      respuesta: "Your salary plus taxable allowances and benefits, minus reliefs such as your SSNIT contribution of 5.5% of basic salary and provident fund contributions up to 16.5% of basic salary.",
    },
    {
      pregunta: "How are non-residents taxed?",
      respuesta: "The chargeable income of non-resident individuals is generally taxed at a flat {{gh.non-resident-rate}}.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: the tax your employer deducts from your income and pays to the GRA on your behalf." },
    { termino: "GRA", definicion: "Ghana Revenue Authority." },
  ],
});
