import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.employer-cost-calculator",
  h1: "Employer cost calculator Mauritius",
  title: "Employer cost Mauritius {{anio}}: CSG, NSF, levy and PRGF",
  description:
    "Find what an employee really costs in Mauritius: CSG at {{mu.csg-employer-low}} or {{mu.csg-employer-high}}, NSF at {{mu.nsf-employer}}, training levy at {{mu.training-levy}} and PRGF at {{mu.prgf-rate}}.",
  intro: [
    "On top of the salary, an employer pays contributions to MRA every month and has to fund the end of year bonus.",
    "Enter the basic wage to see each cost and the total for the month and the year.",
  ],
  comoSeCalcula: [
    "CSG: {{mu.csg-employer-low}} of the basic wage up to {{mu.csg-threshold}}, and {{mu.csg-employer-high}} of all of it above that.",
    "NSF: {{mu.nsf-employer}} of the basic wage, counted between {{mu.nsf-minimum-wage}} and {{mu.nsf-maximum-wage}}.",
    "Training levy: {{mu.training-levy}} of the full basic wage. PRGF: {{mu.prgf-rate}} of the basic wage for workers earning up to {{mu.prgf-wage-ceiling}}, unless the company has its own pension scheme.",
    "End of year bonus: one twelfth of the month's pay is set aside, with the employer CSG that will be due on it.",
  ],
  ejemplo: ["A basic wage of Rs 30,000 costs Rs 36,017.75 a month once contributions and the bonus are included."],
  faq: [
    {
      pregunta: "What is the PRGF?",
      respuesta: "The Portable Retirement Gratuity Fund. The employer pays {{mu.prgf-rate}} of monthly remuneration into an account in the worker's name, which funds the gratuity on retirement.",
    },
    {
      pregunta: "Who pays the training levy?",
      respuesta: "Only the employer. It is {{mu.training-levy}} of the basic wage of every employee other than a household worker, with no ceiling.",
    },
    {
      pregunta: "Why is the bonus part of the monthly cost?",
      respuesta: "The law gives workers with a basic wage up to {{mu.bonus-wage-ceiling}} a bonus of one twelfth of their earnings for the year. Setting it aside each month spreads that cost.",
    },
  ],
  glosario: [
    { termino: "Training levy", definicion: "A contribution to the Human Resource Development Council that funds training." },
    { termino: "PRGF", definicion: "Portable Retirement Gratuity Fund, set up under the Workers' Rights Act 2019." },
  ],
});
