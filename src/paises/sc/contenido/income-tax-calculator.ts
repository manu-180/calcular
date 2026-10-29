import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.income-tax-calculator",
  h1: "Seychelles income tax calculator {{anio}}",
  title: "Seychelles income tax {{anio}}: monthly bands",
  description: "Work out the income tax withheld from your monthly pay. The first {{sc.income-tax-bands[0].hasta}} is tax free and the top rate is {{sc.income-tax-bands[-1].tasa}}.",
  intro: [
    "In Seychelles your employer withholds income tax from your pay every month. Enter your gross pay and see the tax, what is left, and the rate on your last rupee.",
    "The calculator follows the monthly bands for citizens published by the Seychelles Revenue Commission (SRC). They have applied since {{sc.income-tax-bands#desde}}.",
  ],
  comoSeCalcula: [
    "Pay up to {{sc.income-tax-bands[0].hasta}} a month is taxed at {{sc.income-tax-bands[0].tasa}} %.",
    "The slice from {{sc.income-tax-bands[1].desde}} to {{sc.income-tax-bands[1].hasta}} is taxed at {{sc.income-tax-bands[1].tasa}} %.",
    "The slice from {{sc.income-tax-bands[2].desde}} to {{sc.income-tax-bands[2].hasta}} is taxed at {{sc.income-tax-bands[2].tasa}} %.",
    "Anything above {{sc.income-tax-bands[3].desde}} is taxed at {{sc.income-tax-bands[3].tasa}} %. Each rate applies only to its own slice, never to the whole pay.",
  ],
  ejemplo: [
    "Take gross pay of SCR 25,000. The slice between SCR 8,555.50 and SCR 10,000 gives SCR 216.68 at 15 %. The slice from SCR 10,000 to SCR 25,000 gives SCR 3,000 at 20 %. The income tax is SCR 3,216.68 and SCR 21,783.32 is left before pension contributions.",
  ],
  faq: [
    {
      pregunta: "Does the SRC tax the pay of each job separately?",
      respuesta: "Yes. The SRC table applies to the emoluments received from each source of employment in a month, so the bands restart for every employer.",
    },
    {
      pregunta: "Which bands apply to non-citizens?",
      respuesta: "This calculator covers citizens only. The SRC income tax page and the SRC FAQ print different non-citizen columns, so we leave that table out until the SRC clarifies it.",
    },
    {
      pregunta: "When must the employer pay the tax withheld?",
      respuesta: "The SRC asks employers to pay the tax withheld within 21 days of the following month, using the Business Activity Statement.",
    },
  ],
  glosario: [
    { termino: "Emoluments", definicion: "Everything you receive from a job that counts for tax, such as salary, allowances and taxable benefits." },
    { termino: "SRC", definicion: "The Seychelles Revenue Commission, the body that collects income tax, business tax and VAT." },
    { termino: "Tax free band", definicion: "The first slice of monthly pay that is taxed at 0 %." },
  ],
});
