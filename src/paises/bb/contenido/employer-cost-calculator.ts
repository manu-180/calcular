import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.employer-cost-calculator",
  h1: "Employer cost calculator Barbados {{anio}}",
  title: "Employer cost calculator {{anio}}: salary plus employer NIS",
  description:
    "Hiring in Barbados? Add employer NIS at {{bb.nis-employer-rate}} up to {{bb.nis-ceiling-monthly}} and the {{bb.rrf-employer-rate}} Resilience Fund to see the real monthly cost.",
  intro: [
    "Each salary you pay in Barbados costs you {{bb.nis-employer-rate}} more in NIS on earnings up to the ceiling, plus {{bb.rrf-employer-rate}} for the Resilience and Regeneration Fund. Enter the gross salary to see what one worker, or a whole team on the same pay, costs per month and per year.",
    "Small business owners use this to price a new role before advertising it, and to check the payroll bill before the monthly NIS payment.",
  ],
  comoSeCalcula: [
    "Employer NIS: {{bb.nis-employer-rate}} of the salary, counted up to {{bb.nis-ceiling-monthly}} a month.",
    "Resilience and Regeneration Fund: {{bb.rrf-employer-rate}} of the full salary.",
    "Monthly cost: salary plus both contributions. The yearly figure multiplies it by 12.",
  ],
  ejemplo: [
    "For a salary of Bds$4,500 a month you add Bds$573.75 in employer NIS and Bds$11.25 for the fund. The worker costs you Bds$5,085 a month, or Bds$61,020 over a year.",
  ],
  faq: [
    {
      pregunta: "What does the employer NIS rate cover?",
      respuesta:
        "The NISSS table for private sector employers lists National Insurance 6.75%, Non-Contributory 2%, Unemployment 0.75%, Employment Injury 0.75%, Severance 0.5%, Training Levy 0.5% and the Health Service Contribution 1.5%, which add up to {{bb.nis-employer-rate}}.",
    },
    {
      pregunta: "Does the employer stop paying NIS above the ceiling?",
      respuesta: "Yes for NIS, which is charged only up to {{bb.nis-ceiling-monthly}} a month. The Resilience and Regeneration Fund has no ceiling.",
    },
    {
      pregunta: "Does this include holiday pay or bonuses?",
      respuesta:
        "No. It covers the salary and the statutory contributions only. Holiday pay, overtime and any bonus add to the cost on top of this.",
    },
  ],
  glosario: [
    { termino: "Employer contribution", definicion: "The share of NIS the business pays on top of the salary." },
    { termino: "Severance levy", definicion: "The 0.5% of insurable earnings that only the employer pays, listed in the NISSS table as Severance." },
    { termino: "Payroll", definicion: "The total wages and contributions a business pays in a period." },
  ],
});
