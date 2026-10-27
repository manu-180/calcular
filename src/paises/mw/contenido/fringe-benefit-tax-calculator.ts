import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.fringe-benefit-tax-calculator",
  h1: "Fringe benefit tax calculator Malawi",
  title: "Fringe benefit tax calculator Malawi: car, house, fees",
  description:
    "Work out fringe benefit tax at {{mw.fbt-rate}} on a car, housing, school fees or other benefits you give staff, with the MRA rules for the taxable value.",
  intro: [
    "Choose the benefit, enter what it costs and see the fringe benefit tax you owe as the employer.",
    "Every employer except the government pays fringe benefit tax on benefits in kind given to employees, directors included.",
  ],
  comoSeCalcula: [
    "Motor vehicle: the taxable value is {{mw.fbt-vehicle}} of the original cost each year.",
    "School fees: {{mw.fbt-school-fees}} of the cost if you pay the school directly, the whole amount if you pay the employee.",
    "Housing you own: {{mw.fbt-housing-owned}} of the greater of the open market rent and {{mw.fbt-housing-unfurnished}} of salary ({{mw.fbt-housing-furnished}} if furnished).",
    "Housing you rent: the greater of the rent you pay and {{mw.fbt-housing-unfurnished}} of salary ({{mw.fbt-housing-furnished}} if furnished).",
    "Utilities, household items, travel and domestic services: the full cost.",
    "Fringe benefit tax is {{mw.fbt-rate}} of the taxable value.",
  ],
  ejemplo: ["A car that cost K30,000,000 has a taxable value of K4,500,000 a year. The fringe benefit tax is K1,350,000, or K337,500 a quarter."],
  faq: [
    {
      pregunta: "When is fringe benefit tax paid?",
      respuesta: "Quarterly, within 14 days from the end of each quarter, at any MRA Domestic Taxes office.",
    },
    {
      pregunta: "Is a cheap loan to an employee a fringe benefit?",
      respuesta: "Yes, if you charge less than the commercial lending rate. The difference in interest is the benefit. Education loans, house loans and emergency advances for medical or funeral costs are not taxed.",
    },
    {
      pregunta: "What is the penalty for paying late?",
      respuesta: "An employer who fails to register, pays late or does not pay owes a penalty of 20% of the tax due on top of the tax.",
    },
  ],
  glosario: [
    { termino: "Fringe benefit", definicion: "Any asset, service or benefit in kind an employer gives an employee that includes an element of personal benefit." },
    { termino: "Taxable value", definicion: "The part of the benefit's cost that fringe benefit tax is charged on." },
  ],
});
