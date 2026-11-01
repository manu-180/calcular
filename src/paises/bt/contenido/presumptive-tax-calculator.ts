import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.presumptive-tax-calculator",
  h1: "Presumptive tax calculator Bhutan",
  title: "Presumptive tax Bhutan: {{bt.presumptive-ratio}} of income for small businesses",
  description: "Tax for a small resident business in Bhutan: {{bt.presumptive-ratio}} of business income, taxed on the personal bands, up to {{bt.presumptive-limit}} a year. Enter your income.",
  intro: [
    "A small resident business can skip profit accounts. Schedule 2 of the Income Tax Act of Bhutan 2025 treats {{bt.presumptive-ratio}} of total business income as the taxable amount, then applies the personal bands.",
    "The door closes at {{bt.presumptive-limit}} of business income a year. It has been open since {{bt.presumptive-ratio#desde}}.",
  ],
  comoSeCalcula: [
    "Multiply your business income for the year by {{bt.presumptive-ratio}}.",
    "Apply the personal bands to that amount: nil up to {{bt.pit-bands[1].desde}}, then {{bt.pit-bands[1].tasa}} up to {{bt.pit-bands[2].desde}}, {{bt.pit-bands[2].tasa}} up to {{bt.pit-bands[3].desde}}.",
    "No expenses come off. The {{bt.presumptive-ratio}} takes their place.",
  ],
  ejemplo: [
    "Tshering runs a shop in Paro with Nu. 3,000,000 of sales in the year. The taxable amount is 15 % of that, Nu. 450,000. The first Nu. 300,000 is free and the remaining Nu. 150,000 pays 5 %, so the tax is Nu. 7,500. That is 0.25 % of sales.",
  ],
  faq: [
    {
      pregunta: "Who can use presumptive taxation in Bhutan?",
      respuesta: "A resident individual whose taxable income comes only from a business, wholly inside Bhutan, not above {{bt.presumptive-limit}} a year, not registered for GST, and never before taxed under the Act on another basis (Schedule 2, paragraph 1).",
    },
    {
      pregunta: "Who is left out?",
      respuesta: "The notification of 16 December 2025 from the Department of Revenue and Customs adds two more conditions: the individual holds no professional qualification, and the business is not a partnership.",
    },
    {
      pregunta: "What if I have a salary too?",
      respuesta: "Then the first condition fails, because your income is not only from a business. You file on actual profit and add it to your salary.",
    },
  ],
  glosario: [
    { termino: "Presumptive taxation", definicion: "A simple method that assumes a fixed share of what a business takes in is its income." },
    { termino: "GST registered", definicion: "A business on the DRC's register that charges Goods and Services Tax. It cannot use this method." },
    { termino: "Turnover", definicion: "All that a business takes in from sales in a year, before costs." },
  ],
});
