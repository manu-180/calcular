import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.minimum-wage",
  h1: "Minimum wage calculator Hong Kong",
  title: "Minimum wage Hong Kong {{anio}}: {{hk.minimum-wage}} an hour",
  description:
    "The statutory minimum wage in Hong Kong is {{hk.minimum-wage}} an hour from {{hk.minimum-wage#desde}}. Check whether your wages for the hours you worked meet it.",
  intro: [
    "Hong Kong's statutory minimum wage is {{hk.minimum-wage}} an hour from {{hk.minimum-wage#desde}}.",
    "It is checked over each wage period: your wages for the period have to be at least the hours you worked times the minimum rate.",
  ],
  comoSeCalcula: [
    "Minimum wages for the period = hours worked in the period × {{hk.minimum-wage}}.",
    "If your wages for the period are lower, the employer has to make up the difference.",
    "If the monthly wages are below {{hk.smw-record-cap}}, the employer must keep a record of the hours you work.",
  ],
  ejemplo: ["Working 208 hours in a month, your wages for that month have to be at least 208 times {{hk.minimum-wage}}."],
  faq: [
    {
      pregunta: "What is the minimum wage in Hong Kong in 2026?",
      respuesta: "{{hk.minimum-wage}} an hour, in force from {{hk.minimum-wage#desde}}.",
    },
    {
      pregunta: "Is {{hk.smw-record-cap}} the monthly minimum wage?",
      respuesta:
        "No. It's the monthly amount below which the employer must record your hours. The Labour Department stresses it is not a monthly minimum wage: what counts is the hours you worked.",
    },
    {
      pregunta: "Does the minimum wage apply to everyone?",
      respuesta:
        "To most employees. Student interns and work experience students in exempt student employment are left out, and employees with disabilities can ask for a productivity assessment.",
    },
  ],
  glosario: [
    { termino: "SMW", definicion: "Statutory minimum wage, the lowest hourly rate an employer may pay." },
    { termino: "Wage period", definicion: "The period your wages are paid for, such as a month or a week." },
  ],
});
