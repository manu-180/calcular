import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.non-cash-benefits-tax",
  h1: "Non-cash benefits tax calculator Liberia",
  title: "Tax on non-cash benefits in Liberia: housing, car, fuel",
  description: "See how much extra income tax you pay in Liberia on housing, a company vehicle or gasoline coupons, after the {{lr.non-cash-exemption}} yearly exemption.",
  intro: [
    "Enter your cash salary and the market value of your benefits in kind to see the extra income tax they cost you.",
    "Section 202-C exempts the first {{lr.non-cash-exemption}} a year of the total market value of your non-cash benefits. The rest is added to your salary for PIT.",
  ],
  comoSeCalcula: [
    "Taxable benefits: total market value for the year minus {{lr.non-cash-exemption}}.",
    "Extra tax: PIT on salary plus taxable benefits, minus PIT on the salary alone.",
  ],
  ejemplo: ["Housing worth L$240,000 a year on a L$480,000 salary adds L$140,000 of taxable income and L$21,000 of tax, about L$1,750 a month."],
  faq: [
    {
      pregunta: "What counts as a non-cash benefit?",
      respuesta: "Benefits you get in kind instead of money, such as vehicles, housing and gasoline coupons.",
    },
    {
      pregunta: "Is the exemption per benefit?",
      respuesta: "No. The {{lr.non-cash-exemption}} applies to the total market value of all your non-cash benefits in the year.",
    },
    {
      pregunta: "Why can the extra tax be high?",
      respuesta: "Benefits are taxed at your top band rate, which goes up to {{lr.pit-bands[-1].tasa}}.",
    },
  ],
  glosario: [
    { termino: "Benefit in kind", definicion: "Something of value an employer gives instead of cash, such as housing or a car." },
  ],
});
