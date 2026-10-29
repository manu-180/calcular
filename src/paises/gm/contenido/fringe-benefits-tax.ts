import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.fringe-benefits-tax",
  h1: "Fringe benefits tax calculator for The Gambia",
  title: "Fringe benefits tax calculator Gambia for employers",
  description: "Work out the fringe benefits tax an employer pays in The Gambia on housing, cars, fuel and other benefits in kind, at {{gm.fringe-benefits-rate}} on the grossed-up value.",
  intro: [
    "When an employer gives staff benefits in kind, such as a house, a car or household staff, the employer pays fringe benefits tax. The employee pays nothing.",
    "The rate is {{gm.fringe-benefits-rate}}, applied to the value of the benefits grossed up as if the tax were included.",
  ],
  comoSeCalcula: [
    "Add up the fair value of the benefits for the year. For housing, subtract any rent the employee pays you. For a car, count only the share used privately.",
    "Taxable amount: value ÷ (1 − rate).",
    "Tax: taxable amount × {{gm.fringe-benefits-rate}}.",
  ],
  ejemplo: ["The GRA example adds housing worth D75,000, private car use of D62,500, fuel of D30,000 and household staff of D24,000. The D191,500 of benefits carries D70,829 of tax."],
  faq: [
    {
      pregunta: "How do I value a company car?",
      respuesta: "In the GRA example, the private share of the car's value is divided by four, and fuel is counted at its private share. Two cars worth D500,000 each used 25% privately give D62,500.",
    },
    {
      pregunta: "When is the tax paid?",
      respuesta: "In quarterly instalments by the 15th of the month after each quarter, with the annual return and balance due three months after the end of the tax year.",
    },
    {
      pregunta: "Which benefits are exempt?",
      respuesta: "Tax-exempt pension contributions, benefits provided by the Government of The Gambia and benefits to employees whose income is exempt from tax.",
    },
    {
      pregunta: "Can the employer deduct the tax?",
      respuesta: "Yes. The tax and the value of the benefits are allowable deductions when working out the employer's own income tax.",
    },
  ],
  glosario: [
    { termino: "Fringe benefit", definicion: "A payment in kind to an employee, such as housing, a vehicle, a loan, household staff or insurance." },
    { termino: "Grossing up", definicion: "Increasing the value so that the tax is calculated as if it were part of the benefit." },
  ],
});
