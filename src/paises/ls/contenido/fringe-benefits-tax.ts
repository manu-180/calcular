import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.fringe-benefits-tax",
  h1: "Fringe benefits tax calculator",
  title: "Fringe benefits tax (FBT) calculator for Lesotho",
  description:
    "Work out the fringe benefits tax an employer in Lesotho pays on company cars, housing and other benefits, at {{ls.fbt-rate}} on the grossed-up value.",
  intro: [
    "In Lesotho the employer, not the employee, pays fringe benefits tax. Enter the benefits you give one employee during the tax year and see the tax due.",
    "The values follow the Income Tax Act, 1993 (sections 116 to 127) and the FBT rate on the RSL tax rates page.",
  ],
  comoSeCalcula: [
    "Company car: {{ls.car-benefit-rate}} of the car's market value when it was first provided, times the days it was available for private use over the days in the tax year, less what the employee paid.",
    "Housing: the open market rent less what the employee paid, but never more than {{ls.housing-benefit-cap}} of the employee's remuneration for the year.",
    "Other benefits such as utilities, domestic help or a waived debt count at the amount paid or waived.",
    "The total is grossed up by dividing it by one minus the FBT rate. FBT is {{ls.fbt-rate}} of that grossed-up amount.",
  ],
  ejemplo: [
    "A car worth M520 000 available all year gives M78 000. Housing with a market rent of M60 000 for an employee on M240 000 is capped at M48 000. The total of M126 000 grosses up to M210 000, and FBT at 40% is M84 000.",
  ],
  faq: [
    {
      pregunta: "Who pays fringe benefits tax?",
      respuesta: "The employer. Section 116 of the Income Tax Act imposes FBT on every employer with a fringe benefits taxable amount.",
    },
    {
      pregunta: "Are staff meals and medical aid taxed?",
      respuesta: "Not when they are offered to all non-casual employees on equal terms. Meals in a staff canteen or dining room and medical benefits on that basis are exempt fringe benefits.",
    },
    {
      pregunta: "Is a security guard at the employee's home a fringe benefit?",
      respuesta: "No. The Act lists housekeepers, chauffeurs and gardeners as domestic assistance, but excludes security guards.",
    },
    {
      pregunta: "When is a cheap loan a fringe benefit?",
      respuesta: "When the interest rate is below two-thirds of the Central Bank of Lesotho discount rate. The taxable value is the interest saved compared with that rate. Add it under other benefits.",
    },
  ],
  glosario: [
    { termino: "Taxable value", definicion: "The value the Act gives each benefit before grossing up." },
    { termino: "Grossing up", definicion: "Dividing the total taxable value by one minus the FBT rate, so the tax works like tax on cash pay." },
  ],
});
