import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.employer-cost-calculator",
  h1: "Employer cost calculator Zambia",
  title: "Cost of an employee in Zambia: NAPSA, NHIMA and SDL",
  description: "Work out what an employee really costs: pay plus employer NAPSA, NHIMA and the Skills Development Levy of {{zm.sdl-rate}}.",
  intro: ["Enter the basic pay and allowances and see the full monthly cost of the job to the business."],
  comoSeCalcula: [
    "Employer NAPSA: {{zm.napsa-rate}} of gross pay, up to the earnings ceiling of {{zm.napsa-ceiling}}.",
    "Employer NHIMA: {{zm.nhima-rate}} of basic pay.",
    "Skills Development Levy: {{zm.sdl-rate}} of gross emoluments, unless the business is exempt.",
  ],
  ejemplo: ["Basic pay of K10,000 with K2,000 in allowances costs K12,760 a month: K600 NAPSA, K100 NHIMA and K60 levy on top of pay."],
  faq: [
    {
      pregunta: "Who is exempt from the Skills Development Levy?",
      respuesta: "Employers in the public service or a local authority, approved public benefit organisations, organisations exempt from income tax and businesses with annual turnover below K800,000.",
    },
    {
      pregunta: "Is the levy charged on gratuity?",
      respuesta: "No. Gratuities and redundancy packages are left out of the levy.",
    },
  ],
  glosario: [
    { termino: "SDL", definicion: "Skills Development Levy, paid by the employer together with PAYE." },
    { termino: "Gross emoluments", definicion: "Everything paid to an employee for the month: basic pay, allowances, overtime and leave pay." },
  ],
});
