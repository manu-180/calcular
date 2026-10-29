import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.income-tax-calculator",
  h1: "Income tax calculator Liberia",
  title: "Liberia income tax calculator: PIT on your salary",
  description: "Work out your personal income tax in Liberia from the LRA table, for a salary paid in Liberian or US dollars, by the year or by the month.",
  intro: [
    "Enter your gross taxable income to see the personal income tax (PIT) your employer should withhold.",
    "The first {{lr.pit-bands[0].hasta}} of income a year is tax-free. Above that the rate climbs to {{lr.pit-bands[-1].tasa}} on income over {{lr.pit-bands[-1].desde}}.",
  ],
  comoSeCalcula: [
    "Add up your gross income for the year, cash and non-cash benefits included. A monthly amount is multiplied by 12.",
    "If you are paid in US dollars, the amount is converted to Liberian dollars first, as the LRA PIT calculator does.",
    "Up to {{lr.pit-bands[0].hasta}}: no tax.",
    "From {{lr.pit-bands[1].desde}} to {{lr.pit-bands[1].hasta}}: {{lr.pit-bands[1].tasa}} of the amount over {{lr.pit-bands[1].desde}}.",
    "From {{lr.pit-bands[2].desde}} to {{lr.pit-bands[2].hasta}}: {{lr.pit-bands[2].cuotaFija}} plus {{lr.pit-bands[2].tasa}} of the amount over {{lr.pit-bands[2].desde}}.",
    "Above {{lr.pit-bands[3].desde}}: {{lr.pit-bands[3].cuotaFija}} plus {{lr.pit-bands[3].tasa}} of the amount over {{lr.pit-bands[3].desde}}.",
  ],
  ejemplo: ["On L$400,000 a year you pay L$6,500 plus 15% of L$200,000, which is L$36,500 a year or about L$3,041.67 a month."],
  faq: [
    {
      pregunta: "Who uses this table?",
      respuesta: "Employees in the public and private sectors. Contractors are not taxed on this table: the LRA says they keep paying a flat rate on their contracts. Our contractor tax calculator covers that case.",
    },
    {
      pregunta: "When does my employer pay the tax to the LRA?",
      respuesta: "Tax withheld from wages and salaries is due by the 10th day of the following month.",
    },
    {
      pregunta: "Are non-cash benefits taxed?",
      respuesta: "Yes. Housing, vehicles and gasoline coupons count as income. Section 202-C exempts part of their total market value each year. Our take-home pay calculator applies that exemption.",
    },
    {
      pregunta: "What is the difference between my top rate and my effective rate?",
      respuesta: "Your top rate applies only to the part of your income in your highest band. The effective rate is your total tax divided by your gross income, so it is always lower.",
    },
  ],
  glosario: [
    { termino: "PIT", definicion: "Personal income tax, withheld monthly from employees' pay." },
    { termino: "LRA", definicion: "Liberia Revenue Authority, which collects taxes and publishes the PIT table." },
  ],
});
