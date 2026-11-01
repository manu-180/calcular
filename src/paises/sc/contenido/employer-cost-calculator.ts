import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.employer-cost-calculator",
  h1: "Seychelles employer cost calculator {{anio}}",
  title: "Cost of an employee in Seychelles {{anio}}",
  description: "See what a salary really costs an employer: the {{sc.spf-employer-rate}} SPF share and the thirteenth month pay for eligible Seychellois workers.",
  intro: [
    "A salary is not the whole cost of an employee. In Seychelles the employer also pays {{sc.spf-employer-rate}} of salary to the pension fund and, for most Seychellois workers, a thirteenth month.",
    "Enter the gross monthly salary to see the yearly cost and the average monthly cost.",
  ],
  comoSeCalcula: [
    "Salary over the year is twelve times the monthly figure.",
    "The employer pays {{sc.spf-employer-rate}} of salary to the Seychelles Pension Fund (rate in force since {{sc.spf-employer-rate#desde}}).",
    "A Seychellois worker whose basic salary is at most {{sc.thirteenth-limit}} a month also gets one extra month of basic salary as thirteenth month pay.",
  ],
  ejemplo: [
    "For a Seychellois worker on SCR 25,000 a month the salary over the year is SCR 300,000. The SPF share adds SCR 15,000 and the thirteenth month adds SCR 25,000. The employer spends SCR 340,000, or SCR 28,333.33 a month on average.",
  ],
  faq: [
    {
      pregunta: "Who gets the thirteenth month pay?",
      respuesta: "Section 46C of the Employment Act gives it to workers, but non-Seychellois workers and those whose basic salary is above {{sc.thirteenth-limit}} are excluded (S.I. 3 of 2017).",
    },
    {
      pregunta: "Does the employer pay SPF on the thirteenth month?",
      respuesta: "We could not confirm the SPF base for the thirteenth month in an official text, so the calculator leaves it out. Ask the SPF if you need an exact figure.",
    },
    {
      pregunta: "Are other costs missing?",
      respuesta: "Yes. Insurance, training and benefits in kind depend on the contract. The result shows the statutory minimum.",
    },
  ],
  glosario: [
    { termino: "Employer cost", definicion: "Everything the business pays because it employs a person, salary included." },
    { termino: "Thirteenth month pay", definicion: "An extra month of basic salary due at the end of the year to eligible workers." },
    { termino: "SPF", definicion: "The Seychelles Pension Fund." },
  ],
});
