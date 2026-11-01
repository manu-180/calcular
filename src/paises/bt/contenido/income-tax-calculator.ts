import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.income-tax-calculator",
  h1: "Income tax calculator Bhutan {{anio}}",
  title: "Income tax Bhutan {{anio}}: nil to {{bt.pit-bands[1].desde}}, then {{bt.pit-bands[1].tasa}} to {{bt.pit-bands[-1].tasa}}",
  description: "Work out personal income tax under the Income Tax Act of Bhutan 2025. No tax up to {{bt.pit-bands[1].desde}}, top rate {{bt.pit-bands[-1].tasa}}. Enter your taxable income.",
  intro: [
    "Under the Income Tax Act of Bhutan 2025, in force since {{bt.pit-bands#desde}}, an individual pays nothing on taxable income up to {{bt.pit-bands[1].desde}}. Above that the rate climbs from {{bt.pit-bands[1].tasa}} to {{bt.pit-bands[-1].tasa}}, and only the slice inside each band pays that band's rate.",
    "The same table covers salary, rent, interest and the profit of a sole proprietor or a partner. Companies pay a flat rate instead.",
  ],
  comoSeCalcula: [
    "Up to {{bt.pit-bands[1].desde}}: nil.",
    "From there to {{bt.pit-bands[2].desde}}: {{bt.pit-bands[1].tasa}}. To {{bt.pit-bands[3].desde}}: {{bt.pit-bands[2].tasa}}. To {{bt.pit-bands[4].desde}}: {{bt.pit-bands[3].tasa}}.",
    "To {{bt.pit-bands[5].desde}}: {{bt.pit-bands[4].tasa}}. To {{bt.pit-bands[6].desde}}: {{bt.pit-bands[5].tasa}}. Anything above: {{bt.pit-bands[6].tasa}}.",
    "Enter income after deductions. An employee first takes off the deduction in section 44 of the Act, which our take-home pay calculator does for you.",
  ],
  ejemplo: [
    "Pema has a taxable income of Nu. 800,000. The first Nu. 300,000 is free. The next Nu. 200,000 pays 5 %, which is Nu. 10,000. The next Nu. 250,000 pays 10 %, which is Nu. 25,000. The last Nu. 50,000 pays 15 %, which is Nu. 7,500. The tax for the year is Nu. 42,500, an average of 5.31 % of the income.",
  ],
  faq: [
    {
      pregunta: "How much income is tax free in Bhutan?",
      respuesta: "Taxable income up to {{bt.pit-bands[1].desde}} a year pays no tax (Income Tax Act of Bhutan 2025, Schedule 1, paragraph 1).",
    },
    {
      pregunta: "What changed from the old table?",
      respuesta: "The Department of Revenue and Customs notified the new rates on 16 December 2025, for Income Year 2026 onwards. The band above {{bt.pit-bands[1].desde}} now starts at {{bt.pit-bands[1].tasa}}, and the top rate of {{bt.pit-bands[-1].tasa}} now applies above {{bt.pit-bands[-1].desde}}.",
    },
    {
      pregunta: "Do I have to file a return?",
      respuesta: "Section 293 frees a resident individual from filing if the person owns no business and total income does not pass {{bt.no-return-limit}}. Above that, section 290 applies and a return is due, even when your employer withheld tax every month.",
    },
    {
      pregunta: "Are provident fund savings taxed?",
      respuesta: "Sums standing in your account at the National Pension and Provident Fund, or an approved fund, are exempt (Schedule 3, paragraph 13). So are cash crop earnings of a resident individual (paragraph 14).",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Income from employment, business, investments and other sources, after the deductions the Act allows." },
    { termino: "Income Year", definicion: "The calendar year on which the tax is worked out." },
    { termino: "DRC", definicion: "The Department of Revenue and Customs, under the Ministry of Finance." },
  ],
});
