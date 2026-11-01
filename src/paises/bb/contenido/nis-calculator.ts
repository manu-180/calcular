import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.nis-calculator",
  h1: "NIS contribution calculator {{anio}}",
  title: "NIS calculator {{anio}}: employee and employer contributions",
  description:
    "Find your NIS deduction at {{bb.nis-employee-rate}} and your employer's at {{bb.nis-employer-rate}}, capped at {{bb.nis-ceiling-monthly}} a month, plus the Resilience Fund.",
  intro: [
    "A private sector worker in Barbados pays {{bb.nis-employee-rate}} of insurable earnings to the National Insurance Scheme, and the employer adds {{bb.nis-employer-rate}}. Enter your pay for the month or the week to see both shares, line by line.",
    "Since April 2025 both sides also pay {{bb.rrf-employee-rate}} to the Resilience and Regeneration Fund. That one is charged on the whole of your pay, so it keeps growing after NIS has reached the ceiling.",
  ],
  comoSeCalcula: [
    "Insurable earnings: your pay up to the ceiling of {{bb.nis-ceiling-monthly}} a month or {{bb.nis-ceiling-weekly}} a week.",
    "Your NIS: {{bb.nis-employee-rate}} of insurable earnings. This bundles National Insurance, the non-contributory fund, unemployment, the training levy and the Health Service Contribution.",
    "Employer NIS: {{bb.nis-employer-rate}} of insurable earnings, which also covers employment injury and severance.",
    "Resilience and Regeneration Fund: {{bb.rrf-employee-rate}} from you and {{bb.rrf-employer-rate}} from your employer, on gross pay.",
  ],
  ejemplo: [
    "On Bds$4,000 a month you pay Bds$440 in NIS and Bds$10 to the Resilience Fund, so Bds$450 comes off your pay. Your employer pays Bds$510 plus Bds$10. NISSS receives Bds$970 for that month.",
  ],
  faq: [
    {
      pregunta: "What is the NIS ceiling for {{anio}}?",
      respuesta:
        "NISSS set the insurable earnings ceiling at {{bb.nis-ceiling-monthly}} a month for monthly paid workers. For weekly paid workers it is {{bb.nis-ceiling-weekly}} a week.",
    },
    {
      pregunta: "What makes up the 11% employee rate?",
      respuesta:
        "According to the NISSS table for private sector employees: National Insurance 6.75%, Non-Contributory 2%, Unemployment 0.75%, Training Levy 0.5% and the Health Service Contribution 1%.",
    },
    {
      pregunta: "Do these rates apply to government workers?",
      respuesta: "Not always. Permanent government employees have a lower rate because they do not pay the unemployment levy. This calculator uses the private sector rates (class R).",
    },
  ],
  glosario: [
    { termino: "NISSS", definicion: "National Insurance and Social Security Service, which collects contributions and pays benefits." },
    { termino: "Insurable earnings", definicion: "The part of your pay, up to the ceiling, on which NIS contributions and benefits are based." },
    { termino: "Class R", definicion: "The NISSS contribution class for private sector employees." },
  ],
});
