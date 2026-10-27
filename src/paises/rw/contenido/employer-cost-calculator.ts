import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.employer-cost-calculator",
  h1: "Employer cost calculator Rwanda",
  title: "Employer cost calculator Rwanda: salary plus RSSB",
  description: "What an employee really costs: gross salary plus the employer share of RSSB pension, maternity, RAMA and occupational hazards.",
  intro: ["Enter a gross monthly salary and see what the employer pays on top of it to RSSB."],
  comoSeCalcula: [
    "Pension: {{rw.pension-employer}} of gross salary. Maternity leave scheme: {{rw.maternity-employer}}.",
    "RAMA, if the employee is a member: {{rw.medical-employer}} of basic salary.",
    "Occupational hazards: {{rw.occupational-hazards}} of gross salary.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
