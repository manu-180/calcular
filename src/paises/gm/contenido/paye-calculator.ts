import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.paye-calculator",
  h1: "PAYE calculator for The Gambia",
  title: "PAYE calculator Gambia: employment income tax",
  description: "Work out the PAYE your employer withholds in The Gambia with the GRA income tax bands. The first {{gm.paye-bands[0].hasta}} a year is tax-free.",
  intro: [
    "Enter what you earn from your job, a month or a year, to see the employment income tax your employer takes off under Pay As You Earn.",
    "The first {{gm.paye-bands[0].hasta}} a year is taxed at {{gm.paye-bands[0].tasa}}. Above that, each band of income is taxed at its own rate, up to {{gm.paye-bands[-1].tasa}} on income above {{gm.paye-bands[-1].desde}}.",
  ],
  comoSeCalcula: [
    "Annual income: a monthly amount is multiplied by 12.",
    "From {{gm.paye-bands[1].desde}} to {{gm.paye-bands[1].hasta}}: {{gm.paye-bands[1].tasa}}. Up to {{gm.paye-bands[2].hasta}}: {{gm.paye-bands[2].tasa}}. Up to {{gm.paye-bands[3].hasta}}: {{gm.paye-bands[3].tasa}}. Up to {{gm.paye-bands[4].hasta}}: {{gm.paye-bands[4].tasa}}.",
    "Everything above {{gm.paye-bands[-1].desde}} is taxed at {{gm.paye-bands[-1].tasa}}.",
    "The monthly PAYE is the yearly tax divided by 12, which is how the GRA tax table works.",
  ],
  ejemplo: ["On D50,000 a month (D600,000 a year), PAYE is D136,000 a year, or D11,333.33 a month. That is the example the GRA gives in its PAYE brochure."],
  faq: [
    {
      pregunta: "What counts as employment income?",
      respuesta: "Wages, salaries, bonuses, leave pay, overtime, fees, allowances, commissions, termination payments and any other cash pay from your job, according to the GRA.",
    },
    {
      pregunta: "Can I deduct anything before PAYE?",
      respuesta: "No. The GRA PAYE brochure says no deductions are allowed: the rates apply to your total employment income.",
    },
    {
      pregunta: "Do I have to file a tax return?",
      respuesta: "Not if your job is your only income. PAYE is then a final tax and your employer files the monthly return and pays the GRA by the 15th of the following month.",
    },
    {
      pregunta: "Who does not pay PAYE?",
      respuesta: "The GRA lists the President, non-commissioned officers of the Armed Forces, foreign diplomats, government pensioners and employees already taxed on income earned abroad, among others.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn: the employer withholds income tax from each salary and pays it to the GRA." },
    { termino: "GRA", definicion: "Gambia Revenue Authority, which collects income tax and VAT." },
  ],
});
