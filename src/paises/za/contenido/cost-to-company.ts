import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.cost-to-company",
  h1: "Cost to company calculator",
  title: "Cost to company calculator: UIF, SDL and benefits",
  description: "See what an employee really costs: salary, benefits, employer UIF of {{za.uif-employer-rate}} and the Skills Development Levy of {{za.sdl-rate}}.",
  intro: [
    "Enter the gross salary and what the company pays on top, such as pension or medical aid contributions. You get the total monthly and yearly cost to company.",
    "The statutory costs are the employer's UIF and the Skills Development Levy (SDL), which SARS collects with PAYE.",
  ],
  comoSeCalcula: [
    "Employer UIF is {{za.uif-employer-rate}} of the salary, on a maximum of {{za.uif-ceiling-monthly}} a month.",
    "SDL is {{za.sdl-rate}} of the total paid to employees. Employers that pay less than {{za.sdl-threshold}} a year in salaries are exempt.",
    "The cost to company is the salary plus the benefits plus both levies.",
  ],
  ejemplo: ["A salary of R25 000 costs the company R177,12 in UIF and R250 in SDL, so R25 427,12 a month."],
  faq: [
    {
      pregunta: "What counts towards SDL?",
      respuesta: "The total paid to employees, including overtime, leave pay, bonuses, commission and lump sums.",
    },
    {
      pregunta: "Does the employer's UIF come out of my salary?",
      respuesta: "No. Your employer pays its own {{za.uif-employer-rate}} on top of your salary and also deducts your own share from your pay.",
    },
    {
      pregunta: "Why is my CTC package higher than my salary?",
      respuesta: "A cost to company package includes what the company pays for you besides your salary, such as retirement and medical aid contributions. Your payslip shows the cash part.",
    },
  ],
  glosario: [
    { termino: "CTC", definicion: "Cost to company. Everything an employee costs the business in a year or a month." },
    { termino: "SDL", definicion: "Skills Development Levy. An employer levy that funds skills training." },
  ],
});
